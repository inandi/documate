# Development

How to build, run, and test DocuMate locally. See also [architecture.md](architecture.md).

## Prerequisites

- **Node.js** (LTS recommended; align with `engines` if you add one in `package.json`)
- **npm**
- **VS Code** or **Cursor** with the [Extension Development Host](https://code.visualstudio.com/api/get-started/your-first-extension#debugging-the-extension) workflow

## Clone and install

```bash
git clone https://github.com/inandi/documate.git
cd documate
npm install
```

## Run the extension

1. Open this folder in the editor: **`code .`** (VS Code) or **`cursor .`** (Cursor).
2. Run **Run Extension** from the Run and Debug view (or **F5**).  
   Configuration: [`.vscode/launch.json`](../.vscode/launch.json).
3. In the **Extension Development Host** window, open [`sample/index.php`](../sample/index.php) or [`sample/main.js`](../sample/main.js).
4. Use the editor **context menu** → **DocuMate: Code Documentation** to exercise commands.

## Lint and test

| Script | Description |
|--------|-------------|
| `npm run lint` | ESLint (`eslint.config.mjs`) over `**/*.js` |
| `npm test` | Runs `pretest` (lint), then `@vscode/test-cli` — see [`.vscode-test.mjs`](../.vscode-test.mjs) |

> **Note:** After `npm test`, a `.vscode-test/` tree may appear; it is gitignored. **`eslint.config.mjs`** ignores `.vscode-test` and `node_modules` so `npm run lint` only targets project sources.

## Troubleshooting

| Issue | What to try |
|-------|----------------|
| Commands missing | Confirm language is **PHP** or **JavaScript** (`editorLangId` in `package.json` menus). |
| Wrong author/version in snippets | Reload Window after changing **User** or **Workspace** settings; `config.js` is read at module load. |
| Extension does not activate | Check **Output** → **Log (Extension Host)** for load errors. |

## Related

- [overview.md](overview.md) — documentation index  
- [contributing.md](contributing.md) — pull requests and style  
