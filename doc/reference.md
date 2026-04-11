# Reference

Contribution points defined in [`package.json`](../package.json). Command **IDs** are what you pass to `vscode.commands.executeCommand(...)` and what appears in `keybindings.json`.

## Commands

| Command ID | Title (UI) | When shown (context) |
|------------|------------|----------------------|
| `extension.insertClassDocPhp` | Class Document | `editorLangId == php` |
| `extension.insertClassDocJS` | Class Document | `editorLangId == javascript` |
| `extension.insertMethodDocPhp` | Method Document | `editorLangId == php` |
| `extension.insertMethodDocJS` | Method Document | `editorLangId == javascript` |
| `extension.insertPropertyDocPhp` | Property Document | `editorLangId == php` |
| `extension.insertPropertyDocJS` | Property Document | `editorLangId == javascript` |
| `extension.updateVersionTag` | Update @version | PHP or JavaScript |
| `extension.updateFileInfo` | Update File Information | PHP or JavaScript |

Commands are grouped under the submenu **`documate.context`** (“DocuMate: Code Documentation”) on **`editor/context`**.

## Configuration reference

All keys are under the **`documate`** section (e.g. `documate.author` in **Settings JSON**).

| Key | Type | Scope | Purpose |
|-----|------|-------|---------|
| `documate.enableAuthor` | boolean | default | Toggle `@author` in generated blocks |
| `documate.author` | string | **resource** | Author name |
| `documate.enableVersion` | boolean | default | Toggle `@version` |
| `documate.version` | string | **resource** | Version string for snippets / update command |
| `documate.enableEmail` | boolean | default | Toggle email next to author |
| `documate.email` | string | **resource** | Email for snippets |
| `documate.enableSince` | boolean | default | Toggle `@since` (calendar year) |
| `documate.enableCopyright` | boolean | default | Toggle `@copyright` |

**Resource**-scoped settings can be overridden per workspace in **`.vscode/settings.json`**.

## Extension entry

| Field | Value |
|-------|--------|
| `main` | `./extension.js` |

There is no explicit `activationEvents` block: VS Code activates the extension when the user runs a **contributed command** (see [Activation events](https://code.visualstudio.com/api/references/activation-events)).
