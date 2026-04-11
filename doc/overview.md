# DocuMate — documentation index

Internal documentation for **DocuMate**, a **VS Code–compatible** extension (runs in **VS Code** and **Cursor**) that inserts **PHPDoc** and **JSDoc** blocks for PHP and JavaScript (classes, methods, properties), file-level headers, and `@version` updates. Snippet content follows **`documate.*`** [configuration](reference.md#configuration-reference).

For **installation and daily usage**, see the [repository README](../README.md).

Official VS Code extension authoring reference: [Extension API](https://code.visualstudio.com/api) · [Publishing extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension).

## Documentation map

| Document | Audience | Description |
|----------|----------|-------------|
| [development.md](development.md) | Contributors | Prerequisites, run/debug, lint, tests |
| [architecture.md](architecture.md) | Contributors | Modules, command flow, diagrams |
| [reference.md](reference.md) | Contributors / advanced users | Command IDs, settings keys |
| [contributing.md](contributing.md) | Contributors | Issues, PRs, code expectations |
| [publishing.md](publishing.md) | Maintainers | Marketplace, Open VSX, release script |
| [security.md](security.md) | Everyone | Threat model, secrets, reporting |

Release history lives in the root [**CHANGELOG.md**](../CHANGELOG.md).

## Source layout

```text
extension.js          # Activation, command registration, dispatch
language/
  abstract.js           # Aggregates config + extension classes
  config.js             # workspace.getConfiguration('documate')
  CoreExtension.js      # File header, @version update, default snippet
  PhpExtension.js       # PHP snippets
  JsExtension.js        # JavaScript snippets
```
