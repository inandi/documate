# Contributing

Thank you for helping improve DocuMate.

## Issues

- Use [GitHub Issues](https://github.com/inandi/documate/issues) for bugs and feature requests.
- Include **VS Code version**, **extension version**, **language** (PHP / JavaScript), and **steps to reproduce** when reporting bugs.

## Pull requests

1. Fork the repository and create a branch from `main` (or the branch the maintainer specifies).
2. Run **`npm run lint`** and **`npm test`** before opening a PR; fix any new warnings.
3. Keep changes focused: one concern per PR when possible.
4. Update [**CHANGELOG.md**](../CHANGELOG.md) for user-visible behavior changes (maintainer may adjust wording).

## Code style

- **JavaScript** with CommonJS (`require` / `module.exports`) to match the current codebase.
- Follow existing patterns in `language/` for new snippet logic.
- **ESLint** is the source of truth for style and obvious footguns (`eslint.config.mjs`).

## Documentation

When behavior or contribution points change, update:

- Root [**README.md**](../README.md) if end users are affected.
- [**doc/reference.md**](reference.md) for new commands or `documate.*` keys.
- [**doc/architecture.md**](architecture.md) if structure or data flow changes materially.
