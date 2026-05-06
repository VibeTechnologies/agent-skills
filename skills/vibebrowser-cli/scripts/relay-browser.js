#!/usr/bin/env node

const DEFAULT_TIMEOUT_MS = 30000;

function fail(message, code = 1) {
  process.stderr.write(`${message}\n`);
  process.exit(code);
}

function getRequiredEnv(name) {
  const value = process.env[name];
  if (!value) fail(`Missing required environment variable: ${name}`);
  return value;
}

function getRelayHttpBase() {
  return getRequiredEnv('VIBE_RELAY_HTTP_BASE').replace(/\/$/, '');
}

function getRelayExtensionBase() {
  const base = getRelayHttpBase();
  const uuid = getRequiredEnv('VIBE_BROWSER_UUID');
  return `${base}/api/v1/extensions/${uuid}`;
}

function getRelayHeaders() {
  const secret = getRequiredEnv('VIBE_BROWSER_SECRET');
  return {
    Authorization: `Bearer ${secret}`,
    'Content-Type': 'application/json',
  };
}

async function relayRequest(url, payload) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: getRelayHeaders(),
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const text = await response.text();
    const json = text ? JSON.parse(text) : {};
    if (!response.ok) {
      fail(`Relay HTTP ${response.status}: ${json?.error || json?.details || text || 'Unknown error'}`);
    }

    return json;
  } catch (error) {
    fail(error?.name === 'AbortError' ? 'Relay request timed out' : (error?.message || String(error)));
  } finally {
    clearTimeout(timeout);
  }
}

async function relayCall(payload) {
  return relayRequest(`${getRelayExtensionBase()}/cdp/execute`, payload);
}

async function relayTool(name, args = {}) {
  return relayRequest(`${getRelayExtensionBase()}/call-tool`, {
    name,
    arguments: args,
  });
}

function extractToolText(toolEnvelope) {
  const toolResult = toolEnvelope?.result || toolEnvelope;
  const items = Array.isArray(toolResult?.content) ? toolResult.content : [];
  return items
    .filter((item) => item && item.type === 'text' && typeof item.text === 'string')
    .map((item) => item.text)
    .join('\n\n')
    .trim();
}

function extractMarkdownLinks(text) {
  const links = [];
  const regex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    links.push({ text: match[1].trim(), href: match[2].trim() });
  }
  return links;
}

function parseMarkdownPage(text, fallbackUrl) {
  const titleMatch = text.match(/^# (?:Page|Markdown Snapshot):\s*(.+)$/m);
  const urlMatch = text.match(/^URL:\s*(.+)$/m);
  const markdownMatch = text.match(/```markdown\n([\s\S]*?)\n```/i);
  const markdown = (markdownMatch?.[1] || text).trim();
  const normalizedText = markdown.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '$1 ($2)');

  return {
    title: titleMatch?.[1]?.trim() || '',
    url: urlMatch?.[1]?.trim() || fallbackUrl,
    text: normalizedText,
    links: extractMarkdownLinks(markdown),
  };
}

async function openAndReport(url) {
  if (!url) fail('Usage: relay-browser.js open-and-report <url>');

  const version = await relayCall({ id: 1, method: 'Browser.getVersion' });
  const created = await relayCall({
    id: 2,
    method: 'Target.createTarget',
    params: { url, focus: true },
  });

  const pageId = Number(created?.result?.pageId);
  if (!Number.isFinite(pageId)) fail(`Target.createTarget did not return a pageId: ${JSON.stringify(created)}`);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const targets = await relayCall({ id: 3, method: 'Target.getTargets' });
  const targetInfos = Array.isArray(targets?.result?.targetInfos) ? targets.result.targetInfos : [];
  const matchingTarget = targetInfos.find((target) =>
    Number(target?.pageId || target?.targetId) === pageId || String(target?.url || '').includes(url)
  );

  const title = matchingTarget?.title || '';
  process.stdout.write(JSON.stringify({
    protocolVersion: version?.result?.protocolVersion || null,
    createdPageId: pageId,
    title,
  }));
}

async function openAndExtract(url) {
  if (!url) fail('Usage: relay-browser.js open-and-extract <url>');

  const version = await relayCall({ id: 1, method: 'Browser.getVersion' });
  const created = await relayCall({
    id: 2,
    method: 'Target.createTarget',
    params: { url, focus: true },
  });

  const pageId = Number(created?.result?.pageId);
  if (!Number.isFinite(pageId)) fail(`Target.createTarget did not return a pageId: ${JSON.stringify(created)}`);

  await new Promise((resolve) => setTimeout(resolve, 2500));

  const markdownToolResult = await relayTool('take_snapshot', { pageId, format: 'markdown' });
  const pageText = extractToolText(markdownToolResult);
  if (!pageText) fail(`take_snapshot returned no text for page ${pageId}`);

  const parsedPage = parseMarkdownPage(pageText, url);
  process.stdout.write(JSON.stringify({
    protocolVersion: version?.result?.protocolVersion || null,
    createdPageId: pageId,
    title: parsedPage.title,
    url: parsedPage.url,
    text: parsedPage.text,
    links: parsedPage.links,
  }));
}

async function callCdp(method, paramsJson) {
  if (!method) fail('Usage: relay-browser.js cdp <method> [paramsJson]');
  let params;
  if (paramsJson) {
    try {
      params = JSON.parse(paramsJson);
    } catch (error) {
      fail(`Invalid paramsJson: ${error?.message || error}`);
    }
  }

  const result = await relayCall({ id: 1, method, ...(params ? { params } : {}) });
  process.stdout.write(JSON.stringify(result));
}

async function main() {
  const [command, arg1, arg2] = process.argv.slice(2);

  switch (command) {
    case 'open-and-report':
      await openAndReport(arg1);
      return;
    case 'open-and-extract':
      await openAndExtract(arg1);
      return;
    case 'cdp':
      await callCdp(arg1, arg2);
      return;
    default:
      fail('Usage: relay-browser.js <open-and-report|open-and-extract|cdp> ...');
  }
}

main();
