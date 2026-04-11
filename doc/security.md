# Security

## Extension behavior

DocuMate runs **only in the editor**: it reads the active document and **inserts or replaces text** via the **VS Code extension API** (same host surface in **VS Code** and **Cursor**). It does **not** open network connections, collect telemetry, or read files outside the workspace unless you use normal editor features elsewhere.

## Publishing credentials

Marketplace tokens (**`VSCE_PAT`**, **`OVSX_PAT`**) belong in **`.publish-secrets`** on the maintainer’s machine only. That file is **gitignored** and listed in **`.vscodeignore`** so it is not packaged into the `.vsix`.

## Reporting vulnerabilities

If you believe you have found a **security vulnerability**, please open a **private** report if GitHub Security Advisories are enabled for the repository, or contact the maintainers with details and reproduction steps. Do not post secrets or tokens in public issues.

## Supply chain

Install dependencies from **npm** using the lockfile in a trusted environment. Run **`npm audit`** periodically for dev tooling; the shipped extension bundles **no** `node_modules` from this repo.
