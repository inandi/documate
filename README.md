<div align="center">
  <h1>DocuMate</h1>
  <p><strong>Your Code Documentation Assistant</strong></p>
  <p>Tired of typing PHPDoc and JSDoc by hand? <strong>DocuMate</strong> makes it effortless to insert class, method, and property documentation for <strong>PHP</strong> and <strong>JavaScript</strong>—with author, version, email, and copyright pulled from your settings. Works in <strong>Visual Studio Code</strong> and <strong>Cursor</strong>.</p>
  <p>
    <img alt="Version" src="https://img.shields.io/badge/Version-3.2.2-green" />
    <img alt="Updated On" src="https://img.shields.io/badge/Updated%20On-April%202026-blue" />
    <img alt="Released On" src="https://img.shields.io/badge/Released%20On-March%202025-orange" />
  </p>
</div>

## What is DocuMate?

**DocuMate** (publisher **iNandi**, id **`documate`**) generates **PHPDoc** and **JSDoc** blocks. Use the editor context menu or the Command Palette to insert snippets that follow your **DocuMate** settings.

## Requirements

- **VS Code** or **Cursor** meeting **`engines.vscode`**: **^1.75.0** (January 2023 VS Code baseline or compatible editor).

## Installation

1. **Visual Studio Marketplace** (VS Code): Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`) → search **DocuMate** → **Install**.
2. **Open VSX** (e.g. Cursor, VSCodium, Eclipse Theia): open the registry’s extension UI → search **DocuMate** (publisher **iNandi**) → **Install**.
3. **VSIX file** (offline or CI artifact): Command Palette → **Extensions: Install from VSIX…** → pick the `.vsix`.

## Getting started

1. Open a **PHP** or **JavaScript** file (language mode must be **PHP** or **JavaScript**—not TypeScript for the built-in context menu).
2. **Right-click** on the class name, method name, or property (cursor on the identifier on the correct line).
3. Choose **DocuMate: Code Documentation**, then **Class Document**, **Method Document**, or **Property Document** as needed.
4. For a file header or to refresh **`@version`**, use **Update File Information** or **Update @version** in the same submenu (shown for PHP and JavaScript).

![Demo](https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTQxaTJqbmUyd25sdWxkaDJ1bTJibTY5ZTZveTd0Z2hibWx3dW50diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/j2j6yShnyCmOFRUlQ7/giphy.gif)

## Commands and context menu

Commands use the titles below (also discoverable in the **Command Palette**). In the editor, the **DocuMate: Code Documentation** submenu lists the same actions when the language matches.

| Title (Command Palette) | What it does |
|---------------------------|----------------|
| **Class Document** | PHPDoc / JSDoc block for the class under the cursor |
| **Method Document** | Method block; **`@param`** / return when the line can be parsed |
| **Property Document** | Property or variable summary block |
| **Update File Information** | File-level header; in PHP, keeps **`<?php`** first when it is line 1 |
| **Update @version** | Replaces the **`@version`** line using **`documate.version`** |

### Keybindings

**DocuMate** does not ship default keybindings. Assign any command under **File → Preferences → Keyboard Shortcuts** (search **DocuMate** or the command titles above).

## Configuration

Set options in **User** or **Workspace** JSON. Copy into **`settings.json`** (merge with your existing keys):

```json
{
  "documate.enableAuthor": true,
  "documate.author": "John Doe",
  "documate.enableEmail": true,
  "documate.email": "johndoe@example.com",
  "documate.enableVersion": true,
  "documate.version": "1.0.0",
  "documate.enableSince": true,
  "documate.enableCopyright": true
}
```

### Per-workspace vs user settings

**`documate.author`**, **`documate.version`**, and **`documate.email`** use **`"scope": "resource"`** in the extension manifest: set them in **User** settings for a default, or in **`.vscode/settings.json`** for one repo; workspace wins over user for that folder.

```json
{
  "documate.author": "Jane Smith",
  "documate.email": "jane@company.com",
  "documate.version": "2.0.0"
}
```

After changing settings, use **Developer: Reload Window** if snippets still show old values (settings are read when the extension module loads).

## Support the Project

If **DocuMate** has made your workflow easier, consider supporting (no pressure):

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/igobinda)

## Need help?

- **Contributor / maintainer docs**: [doc/overview.md](doc/overview.md)
- **Issues and feature requests**: [GitHub Issues](https://github.com/inandi/documate/issues)

## License

This project is licensed under the [**MIT License**](LICENSE).

---

**Made with ❤️ by [Gobinda Nandi](https://x.com/iamGobinda)**
