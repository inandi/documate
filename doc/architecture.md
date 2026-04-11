# Architecture

> Documentation index: [overview.md](overview.md)

## High-level

The extension is a thin **command layer** (`extension.js`) on top of a **language layer** (`language/*`). There is no database or network I/O: snippets are built as strings and applied via the **VS Code extension API** (same model in **VS Code** and **Cursor**).

## Module dependencies

```mermaid
flowchart TB
    subgraph vscode_api [VS Code API]
        WS[vscode.workspace]
        ED[TextEditor / Document]
    end

    E[extension.js]
    A[abstract.js]
    C[config.js]
    CE[CoreExtension.js]
    PE[PhpExtension.js]
    JE[JsExtension.js]

    E --> A
    A --> C
    A --> CE
    A --> PE
    A --> JE
    PE --> C
    PE --> CE
    JE --> C
    JE --> CE
    CE --> C
    C --> WS
    E --> ED
    CE --> ED
    PE --> ED
    JE --> ED
```

- **`config.js`** reads `documate` settings once when the module is first loaded (same process as extension activation). After changing settings, users may need **Reload Window** for new values to apply everywhere.
- **`PhpExtension` / `JsExtension`** extend **`CoreExtension`** but only share the base class file; snippet builders use **`config`** directly.

## Command routing

Commands are registered in **`extension.js`**; each command maps to one static method on **`PhpExtension`**, **`JsExtension`**, or **`CoreExtension`**.

```mermaid
flowchart LR
    subgraph triggers [User]
        CM[Context menu]
    end

    subgraph ext [extension.js]
        R[registerCommand]
    end

    subgraph handlers [language]
        PHP[PhpExtension]
        JS[JsExtension]
        CORE[CoreExtension]
    end

    CM --> R
    R -->|php class/method/property| PHP
    R -->|javascript class/method/property| JS
    R -->|update version / file info| CORE
```

Language visibility in the UI is controlled by **`package.json`** `menus` `when` clauses (`editorLangId == php` / `javascript`), not by runtime checks in `extension.js`.

## Data flow (one insert)

```mermaid
sequenceDiagram
    participant U as User
    participant VS as VS Code
    participant E as extension.js
    participant L as PhpExtension or JsExtension
    participant CFG as config module

    U->>VS: Context menu → command
    VS->>E: active editor + selection
    E->>L: insert*Doc*(editor, vscode)
    L->>CFG: read already-resolved settings object
    L->>L: parse line / validate identifier
    alt invalid selection
        L->>VS: showErrorMessage
    else valid
        L->>VS: editor.edit → insert snippet string
    end
```

**Validation:** class/method commands require the cursor’s word to match the regex on the **current line** (e.g. `class Foo` + word `Foo`). Property commands use a **word range** regex for PHP or `const|let|var` for JS.

## File-level snippet

**`CoreExtension.insertFileInfoSnippet`**: inserts a block at the start of the file, or **after** the first line if it is `<?php` / `<?`, so the PHP open tag stays first.

## Packaging note

**`.vscodeignore`** excludes `doc/**`, `sample/**`, tests, and dev-only files from the published `.vsix`. This documentation is for the **repository**, not shipped with the marketplace build unless you change ignore rules.

## Related

- [development.md](development.md) — local run and test  
- [reference.md](reference.md) — command IDs and configuration keys  
