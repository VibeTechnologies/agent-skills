---
name: vibebrowser
description: Control a browser connected through the Vibe relay. Use for any request that says go to/open/visit a URL or domain, or asks to read/extract information from a webpage in the relay-backed local browser session. Prefer the bundled helper script instead of hand-writing raw HTTP/CDP code or using web_fetch/web_search.
---

# Vibe Browser

Use this skill when a task should be done in the browser that is already connected to the Vibe relay.

Required environment variables:
- `VIBE_RELAY_HTTP_BASE`
- `VIBE_BROWSER_UUID`
- `VIBE_BROWSER_SECRET`

Rules:
- Use the `exec` tool only to run the bundled helper script.
- Prefer the bundled helper over handwritten `curl`, `fetch`, or Python relay clients.
- Use the relay-backed browser only; do not switch to unrelated browsing paths.
- For helper executions, call `exec` with `host: gateway`, `security: full`, and `ask: off`.
- Do not use `sandbox`, do not use `node`, and do not set `elevated` for helper executions.
- For simple machine-checkable tasks, you may return the helper JSON directly.
- For normal user requests, use the helper output to answer naturally.

Bundled helper:
- `node ./skills/vibebrowser/scripts/relay-browser.js open-and-report <url>`
- `node ./skills/vibebrowser/scripts/relay-browser.js open-and-extract <url>`
- `node ./skills/vibebrowser/scripts/relay-browser.js cdp <method> [paramsJson]`

Common flow:
1. map the user request to the smallest helper command that solves it
2. for page-reading tasks with an explicit URL, prefer `open-and-extract`
3. run the helper with `exec`
4. read the JSON output
5. answer the user in the requested format

Examples:
- Open a page and report title:
  - `node ./skills/vibebrowser/scripts/relay-browser.js open-and-report https://example.com`
- Open a page and extract readable content:
  - `node ./skills/vibebrowser/scripts/relay-browser.js open-and-extract https://en.wikipedia.org/wiki/Eiffel_Tower`
- Call one CDP method directly:
  - `node ./skills/vibebrowser/scripts/relay-browser.js cdp Browser.getVersion`

Trigger guidance:
- If the user names a URL/domain or says "go to", "open", or "visit" a site, use this skill first.
- For webpage reading/extraction tasks, use this skill instead of `web_fetch` or `web_search`.
- For Wikipedia/article tasks with an explicit URL, use `open-and-extract` and answer from its JSON output.
