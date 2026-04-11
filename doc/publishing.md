# Publishing

For **maintainers** who ship DocuMate to the [Visual Studio Marketplace](https://marketplace.visualstudio.com/) and [Open VSX](https://open-vsx.org/).

## Tooling

- **Package & publish (VS Marketplace):** [`@vscode/vsce`](https://github.com/microsoft/vscode-vsce) — CLI command is `vsce` (e.g. `npx vsce publish`).
- **Open VSX:** [`ovsx`](https://github.com/eclipse/openvsx) — `ovsx publish`.

DevDependencies and scripts are defined in [`package.json`](../package.json).

## Personal access tokens

1. Copy [`.publish-secrets.sample`](../.publish-secrets.sample) to **`.publish-secrets`** (local only; **never commit** — see [`.gitignore`](../.gitignore)).
2. Set **`VSCE_PAT`** and **`OVSX_PAT`** as described in the sample file.

## Release script

[`release.sh`](../release.sh) (bash):

- Takes a **version** argument (e.g. `./release.sh 3.2.2`).
- Prepends **`release.md`** into **`CHANGELOG.md`**, resets **`release.md`** from **`release.md.sample`**, appends to **`version.md`**, commits, tags, pushes, then runs **`vsce publish`** / **`ovsx publish`** when tokens are present.

Prepare **`release.md`** with human-readable notes **before** running the script. Align **`package.json`** `version` with the release you intend to ship.

## Package contents

[`.vscodeignore`](../.vscodeignore) controls what is **excluded** from the `.vsix` (e.g. `doc/**`, tests, dev scripts). Edit it carefully so secrets and large dev assets are not packaged.

## Further reading

- [VS Code: Publishing extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
