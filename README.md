# DocuMate

**DocuMate** is a powerful VS Code extension designed to automate and streamline code documentation for PHP and JavaScript. It generates class, method, and property documentation comments with customizable author details, versioning, and copyright information.

## Features

- **Automatic Documentation Generation**
  - Insert class, method, and property documentation for PHP and JavaScript.
  - Supports JSDoc and PHPDoc formats.
- **File-Level Documentation**
  - Generate a summary block with author, version, and copyright details.
- **Version Tag Update**
  - Quickly update the `@version` tag across files.
- **Customizable Settings**
  - Enable/disable author, email, version, and copyright details.
- **Intuitive Commands**
  - Right-click or use keybindings to insert documentation snippets.

![Demo](https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTQxaTJqbmUyd25sdWxkaDJ1bTJibTY5ZTZveTd0Z2hibWx3dW50diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/j2j6yShnyCmOFRUlQ7/giphy.gif)


## Installation

1. Open **VS Code**.
2. Go to **Extensions** (`Ctrl+Shift+X` / `Cmd+Shift+X`).
3. Search for **"DocuMate"**.
4. Click **Install** and restart VS Code if needed.

## Usage

### **Commands**
| Command | Description |
|---------|-------------|
| `DocuMate: Insert Class Doc (PHP)` | Generates a PHP class documentation block. |
| `DocuMate: Insert Method Doc (PHP)` | Generates a PHP method documentation block. |
| `DocuMate: Insert Property Doc (PHP)` | Generates a PHP property documentation block. |
| `DocuMate: Insert Class Doc (JS)` | Generates a JavaScript class documentation block. |
| `DocuMate: Insert Method Doc (JS)` | Generates a JavaScript method documentation block. |
| `DocuMate: Insert Property Doc (JS)` | Generates a JavaScript property/varaible documentation block. |
| `DocuMate: Insert File Info` | Inserts a file-level documentation block. |
| `DocuMate: Update Version Tag` | Updates the `@version` tag. |

### **Right-Click Context Menu**
- Right-click on a **class**, **method**, or **property**, and select **"DocuMate: Code Documentation"**, Select your choice.

### **Keybindings**
- Default keybindings (if configured) can be customized in VS Code settings.

## Configuration

Modify settings in **`settings.json`** to customize documentation output:

```json
"documate.enableAuthor": true,
"documate.author": "John Doe",
"documate.enableEmail": true,
"documate.email": "johndoe@example.com",
"documate.enableVersion": true,
"documate.version": "1.0.0",
"documate.enableSince": true,
"documate.enableCopyright": true
```

### Per-project vs global settings

Author, version, and email can be set **globally** (one value for all projects) or **per project**:

- **Global (all projects):** Open **User Settings** (`File` → `Preferences` → `Settings`), search for "DocuMate", and set the values. Or edit your user `settings.json` (e.g. `~/.config/Code/User/settings.json` on Linux).
- **Per project:** In your project root, create or edit **`.vscode/settings.json`** and add the same keys. Workspace settings override user settings when that folder is open.

Example for a single project — in your repo’s **`.vscode/settings.json`**:

```json
{
  "documate.author": "Gobinda Nandi",
  "documate.email": "gobinda.nandi.public@gmail.com",
  "documate.version": "2.0.0"
}
```

DocuMate uses the effective value for the current workspace (workspace overrides user).

## File Structure

```
📂 documate
 ├── 📝 package.json         # Extension metadata & commands
 ├── 📝 extension.js         # Registers commands & handles execution
 ├── 📂 language/
 │   ├── 📝 abstract.js      # Hnadler to connect all files to extension.js
 ├── |── 📝 config.js        # Configuration settings
 │   ├── 📝 CoreExtension.js # Base/Common extension logic
 │   ├── 📝 PhpExtension.js  # PHP-specific documentation logic
 │   └── 📝 JsExtension.js   # JavaScript-specific documentation logic
 └── 📝 README.md            # Documentation
```

## License
This extension is **open-source** and licensed under the **MIT License**.

## Contributing
Feel free to open **issues** and **pull requests** (Fork) to improve DocuMate!

## Support the Project

If DocuMate has made your workflow easier, consider supporting:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/igobinda)

Your support helps keep this extension free and continuously improved!

---

**Made with ❤️ by Gobinda Nandi**