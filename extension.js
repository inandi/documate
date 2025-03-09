const vscode = require('vscode');
const configExtension = require('./config.js');
const PhpExtension = require('./language/php_extension');
const JsExtension = require('./language/js_extension');

/**
 * Activates the extension and registers commands.
 * @param {vscode.ExtensionContext} context - The extension context.
 * @author Gobinda Nandi
 * @since 0.0.1 (Jan, 2025)
 * @version 0.0.1
 */
function activate(context) {

    const commands = [
        {
            name: 'extension.insertClassDocPhp',
        },
        {
            name: 'extension.insertClassDocJS',
        },
        {
            name: 'extension.insertMethodDocPhp',
        },
        {
            name: 'extension.insertMethodDocJS',
        },
        {
            name: 'extension.insertPropertyDocPhp',
        },
        {
            name: 'extension.insertPropertyDocJS',
        },
        {
            name: 'extension.updateVersionTag',
        },
        {
            name: 'extension.updateFileInfo',
        }
    ];

    const mConfig = vscode.workspace.getConfiguration('documate');
    const mEnableAuthor = mConfig.get("enableAuthor", true);
    const mAuthor = mConfig.get('author', 'Unknown Author');
    const mEnableVersion = mConfig.get("enableVersion", true);
    const mVersion = mConfig.get('version', '1.0.0');
    const mEnableEmail = mConfig.get("enableEmail", true);
    const mEmail = mConfig.get('email', 'email@example.com');
    const mEnableSince = mConfig.get("enableSince", true);
    const mEnableCopyright = mConfig.get("enableCopyright", true);
    const mYear = new Date().getFullYear();

    /**
     * Generates a PHP property documentation snippet.
     * @param {string} indentation - The indentation for formatting.
     * @param {string} variableName - The property name.
     * @returns {string} The property documentation snippet.
     */
    function getPropertyDocPhpSnippet(indentation, variableName) {
        return `${indentation}/**\n${indentation} * Summary of Property\n${indentation} * @var mixed ${variableName}\n${indentation} */`;
    }

    /**
     * Generates a JavaScript property documentation snippet.
     * @param {string} indentation - The indentation for formatting.
     * @param {string} variableName - The property name.
     * @returns {string} The property documentation snippet.
     */
    function getPropertyDocJsSnippet(indentation, variableName) {
        return `${indentation}/**\n${indentation} * Summary of Property\n${indentation} * @type {any} ${variableName}\n${indentation} */`;
    }

    /**
     * Generates a file-level documentation snippet.
     * @returns {string} The file information snippet.
     */
    function getFileInfoSnippet() {
        return `/**\n * Summary of File\n *\n * @author ${mAuthor} <${mEmail}>\n * @since ${mYear}\n * @version ${mVersion}\n * @copyright © ${mYear} ${mAuthor}. All rights reserved.\n */`;
    }

    /**
     * Generates a default documentation snippet.
     * @returns {string} The default documentation snippet.
     */
    function getDefaultDocSnippet() {
        return `/**\n * NA\n */`;
    }

    commands.forEach(cmd => {
        let disposable = vscode.commands.registerCommand(cmd.name, function () {

            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showErrorMessage("No active editor found.");
                return;
            }

            let snippet = '';
            const position = editor.selection.active;
            let wordRange;
            let line;
            let text;
            let indentation;

            switch (cmd.name) {
                case "extension.insertClassDocPhp":
                    PhpExtension.insertClassDocPhp(editor, vscode);
                    break;

                case "extension.insertClassDocJS":
                    JsExtension.insertClassDocJs(editor, vscode);
                    break;

                case "extension.insertMethodDocPhp":
                    PhpExtension.insertMethodDocPhp(editor, vscode);
                    break;

                case "extension.insertMethodDocJS":
                    JsExtension.insertMethodDocJs(editor, vscode);
                    break;

                case "extension.insertPropertyDocPhp":
                    wordRange = editor.document.getWordRangeAtPosition(position, /(public|protected|private)?\s*(static)?\s*\$\w+/);
                    if (wordRange) {
                        line = wordRange.start.line;
                        text = editor.document.getText(wordRange);
                        indentation = editor.document.lineAt(line).text.match(/^\s*/)[0];
                        const variableNameMatch = text.match(/\$(\w+)/);
                        const variableName = variableNameMatch ? variableNameMatch[1] : 'variable';
                        snippet = getPropertyDocPhpSnippet(indentation, variableName);
                        editor.edit(editBuilder => {
                            editBuilder.insert(new vscode.Position(line, 0), `${snippet}\n`);
                        });
                    } else {
                        vscode.window.showInformationMessage(`Invalid Selection: Not a Property Declaration`);
                    }
                    break;

                case "extension.insertPropertyDocJS":
                    wordRange = editor.document.getWordRangeAtPosition(position, /(const|let|var)\s+(\$?\w+)\s*=\s*/);
                    if (wordRange) {
                        line = wordRange.start.line;
                        text = editor.document.getText(wordRange);
                        indentation = editor.document.lineAt(line).text.match(/^\s*/)[0];
                        const variableNameMatch = text.match(/(const|let|var)\s+(\$?\w+)/);
                        const variableName = variableNameMatch ? variableNameMatch[2] : 'variable';
                        snippet = getPropertyDocJsSnippet(indentation, variableName);
                        editor.edit(editBuilder => {
                            editBuilder.insert(new vscode.Position(line, 0), `${snippet}\n`);
                        });
                    } else {
                        vscode.window.showInformationMessage(`Invalid Selection: Not a Property Declaration`);
                    }
                    break;

                case "extension.updateVersionTag":
                    wordRange = editor.document.getWordRangeAtPosition(position, /@version/);
                    if (!wordRange) {
                        vscode.window.showWarningMessage('Please right-click on the @version tag to update.');
                        return;
                    }

                    line = wordRange.start.line;
                    text = editor.document.lineAt(line).text;
                    indentation = text.match(/^\s*/)[0];
                    const newVersion = `${indentation}* @version ${mVersion}`;

                    editor.edit(editBuilder => {
                        editBuilder.replace(new vscode.Range(line, 0, line, text.length), newVersion);
                    });
                    break;

                case "extension.updateFileInfo":
                    snippet = getFileInfoSnippet();
                    editor.edit(editBuilder => {
                        const firstLine = editor.document.lineAt(0);
                        const firstText = firstLine.text.trim().toLowerCase();
                        if (firstText === '<?php' || firstText === '<?') {
                            editBuilder.insert(firstLine.range.end, '\n' + snippet + '\n');
                        } else {
                            editBuilder.insert(firstLine.range.start, snippet + '\n\n');
                        }
                    });
                    break;

                default:
                    snippet = getDefaultDocSnippet();
                    break;
            }

        });

        context.subscriptions.push(disposable);
    });
}

/**
 * Deactivates the extension.
 */
function deactivate() { }

module.exports = {
    activate,
    deactivate
};
