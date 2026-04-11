<div align="center">
  <h1>DocuMate</h1>
  <p><strong>Your Code Documentation Assistant</strong></p>
</div>

Tired of typing PHPDoc and JSDoc by hand? **DocuMate** makes it effortless to insert class, method, and property documentation for **PHP** and **JavaScript**—with author, version, email, and copyright pulled from your settings.

## What is DocuMate?

**DocuMate** is a VS Code / Cursor extension that generates documentation blocks in PHPDoc and JSDoc style. Use the editor context menu or commands to drop in snippets that match your project’s conventions.

## Why Use DocuMate?

- **Save Time**: Stop rewriting the same `@param`, `@return`, and class headers
- **Stay Consistent**: Same structure across PHP and JavaScript files
- **Project or Global**: Configure author, email, and version per workspace or for all projects
- **File-Level Docs**: Insert a file summary block with optional author, version, and copyright
- **Quick Updates**: Update the `@version` line from your configured version when you right-click it

## Getting Started

### Installation

1. Open VS Code / Cursor
2. Go to the Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Search for **DocuMate** (publisher: **iNandi**)
4. Click **Install**

### First Steps

1. Open a **PHP** or **JavaScript** file
2. **Right-click** on a class name, method name, or property declaration (or place the cursor on the identifier)
3. Choose **DocuMate: Code Documentation** from the context menu, then pick **Class**, **Method**, or **Property** document
4. For file-level docs or version updates, use **Update File Information** or **Update @version** from the same submenu (when available for your language)

![Demo](https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTQxaTJqbmUyd25sdWxkaDJ1bTJibTY5ZTZveTd0Z2hibWx3dW50diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/j2j6yShnyCmOFRUlQ7/giphy.gif)

## How It Works

### Inserting documentation

1. Put the cursor on (or select) the **class**, **function/method**, or **property** you want to document
2. Open the context menu → **DocuMate: Code Documentation**
3. Choose the snippet type. DocuMate validates that the line matches a class, method, or property before inserting

### Commands (reference)

| Command | Description |
|---------|-------------|
| Class Document (PHP / JS) | Class-level PHPDoc / JSDoc block |
| Method Document (PHP / JS) | Method block with params and return type where detected |
| Property Document (PHP / JS) | Property / variable summary block |
| Update File Information | File-level header (respects `<?php` at top of PHP files) |
| Update @version | Replaces the `@version` line using your configured version |

### Configuration

Set options in **User** or **Workspace** `settings.json` under the `documate.*` keys:

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

Author, version, and email can be set **globally** or **per project**:

- **Global:** User Settings → search **DocuMate**, or edit your user `settings.json`
- **Per project:** Add the same keys in **`.vscode/settings.json`** at the project root; workspace values override user values when that folder is open

Example **`.vscode/settings.json`**:

```json
{
  "documate.author": "Jane Smith",
  "documate.email": "jane@company.com",
  "documate.version": "2.0.0"
}
```

## Tips & Tricks

- **Right-click the identifier** on the same line as `class Foo`, `function bar`, or the property declaration for best results
- **Use workspace settings** when client projects need different author or package version in the doc block
- **Update @version** by right-clicking directly on an existing `@version` tag in a comment
- **PHP files:** File info is inserted after `<?php` when that is the first line

## Support the Project

If **DocuMate** has made your workflow easier, consider supporting (no pressure):

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/igobinda)

## Need Help?

- **Technical notes**: See [doc/technical.md](doc/technical.md)
- **Issues & features**: Open an issue on [GitHub](https://github.com/inandi/documate/issues)

## License

This project is licensed under the **MIT License**—see [LICENSE](LICENSE).

---

**Made with ❤️ by [Gobinda Nandi](https://x.com/iamGobinda)**
