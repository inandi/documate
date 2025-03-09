const vscode = require('vscode');

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
     * Generates a PHP class documentation snippet.
     * @param {string} indentation - The indentation for formatting.
     * @param {string} className - Class name.
     * @returns {string} The class documentation snippet.
     */
    function getClassDocPhpSnippet(indentation, className = 'NA') {
        let snippetAuthor = '';
        if (mEnableAuthor) {
            let snippetEmail = '';
            if (mEnableEmail) {
                snippetEmail = ` <${mEmail}>`;
            }
            snippetAuthor = `${indentation} * @author ${mAuthor}${snippetEmail}\n`;
        }

        let snippetSince = '';
        if (mEnableSince) {
            snippetSince = `${indentation} * @since ${mYear}\n`;
        }

        let snippetVersion = '';
        if (mEnableVersion) {
            snippetVersion = `${indentation} * @version ${mVersion}\n`;
        }

        let snippetCopyright = '';
        if (mEnableCopyright) {
            snippetCopyright = `${indentation} * @copyright © ${mYear} ${mAuthor}. All rights reserved.\n`;
        }

        return `${indentation}/**\n${indentation} * Class ${className}\n${snippetAuthor}${snippetSince}${snippetVersion}${snippetCopyright}${indentation} */\n`;
    }

    /**
     * Inserts a PHP class documentation comment with proper indentation.
     */
    function insertClassDocPhp(editor) {
        const document = editor.document;
        const position = editor.selection.active;
        const lineText = document.lineAt(position.line).text;
        const indentation = lineText.match(/^\s*/)[0];
        const wordRange = document.getWordRangeAtPosition(position);

        if (!wordRange) {
            vscode.window.showErrorMessage(`Invalid Selection: Please right-click on JS Class name to add the snippet.`);
            return;
        }

        const word = document.getText(wordRange);

        // Regex to check for a class declaration in PHP
        const classRegex = /\bclass\s+(\w+)/;
        const match = classRegex.exec(lineText);

        if (!match || match[1] !== word) {
            vscode.window.showErrorMessage(`Invalid Selection: Please right-click on PHP Class name to add the snippet.`);
            return;
        }
        const snippet = getClassDocPhpSnippet(indentation, word);
        // Insert the comment above the class definition
        editor.edit((editBuilder) => {
            const insertPosition = new vscode.Position(position.line, 0);
            editBuilder.insert(insertPosition, snippet);
        });
    }

    /**
     * Generates a JavaScript class documentation snippet.
     * @param {string} indentation - The indentation for formatting.
     * @param {string} className - Class name.
     * @returns {string} The class documentation snippet.
     */
    function getClassDocJsSnippet(indentation, className = 'NA') {

        let snippetAuthor = '';
        if (mEnableAuthor) {
            let snippetEmail = '';
            if (mEnableEmail) {
                snippetEmail = ` <${mEmail}>`;
            }
            snippetAuthor = `${indentation} * @author ${mAuthor}${snippetEmail}\n`;
        }

        let snippetSince = '';
        if (mEnableSince) {
            snippetSince = `${indentation} * @since ${mYear}\n`;
        }

        let snippetVersion = '';
        if (mEnableVersion) {
            snippetVersion = `${indentation} * @version ${mVersion}\n`;
        }

        let snippetCopyright = '';
        if (mEnableCopyright) {
            snippetCopyright = `${indentation} * @copyright © ${mYear} ${mAuthor}. All rights reserved.\n`;
        }
        return `${indentation}/**\n${indentation} * Class ${className}\n${snippetAuthor}${snippetSince}${snippetVersion}${snippetCopyright}${indentation} */\n`;
    }

    /**
     * Inserts a JavaScript class documentation comment with proper indentation.
     */
    function insertClassDocJs(editor) {
        const document = editor.document;
        const position = editor.selection.active;
        const lineText = document.lineAt(position.line).text;
        const indentation = lineText.match(/^\s*/)[0];
        const wordRange = document.getWordRangeAtPosition(position);

        if (!wordRange) {
            vscode.window.showErrorMessage(`Invalid Selection: Please right-click on JS Class name to add the snippet.`);
            return;
        }

        const word = document.getText(wordRange);

        // Regex to check for a class declaration in PHP
        const classRegex = /^(\s*)\bclass\s+(\w+)/;
        const match = classRegex.exec(lineText);

        if (!match || match[2] !== word) {
            vscode.window.showErrorMessage(`Invalid Selection: Please right-click on JS Class name to add the snippet.`);
            return;
        }
        const snippet = getClassDocJsSnippet(indentation, word);
        // Insert the comment above the class definition
        editor.edit((editBuilder) => {
            const insertPosition = new vscode.Position(position.line, 0);
            editBuilder.insert(insertPosition, snippet);
        });
    }

    /**
     * Generates a PHP method documentation snippet.
     * @param {string} indentation - The indentation for formatting.
     * @param {string[]} params - The method parameters.
     * @param {string} returnType - The return type of the method.
     * @returns {string} The method documentation snippet.
     */
    function getMethodDocPhpSnippet(indentation, params, returnType) {
        let paramTags = params.map(param => {
            const typeMatch = param.match(/([\w|\\]+)?\s*\$([A-Za-z_][A-Za-z0-9_]*)/);
            if (typeMatch) {
                return `${indentation} * @param ${typeMatch[1] || 'mixed'} $${typeMatch[2]}`;
            }
            return `${indentation} * @param mixed ${param}`;
        }).join('\n');

        if (paramTags) {
            paramTags += '\n';
        }

        return `${indentation}/**\n${indentation} * Summary of Method/Function\n${paramTags}${indentation} * @return ${returnType}\n${indentation} *\n${indentation} * @since ${mYear}\n${indentation} * @version ${mVersion}\n${indentation} */`;
    }

    /**
     * Generates a JavaScript method documentation snippet.
     * @param {string} indentation - The indentation for formatting.
     * @param {string[]} params - The method parameters.
     * @param {string} returnType - The return type of the method.
     * @returns {string} The method documentation snippet.
     */
    function getMethodDocJsSnippet(indentation, params, returnType) {
        let paramTags = params.map(param => {
            const paramMatch = param.match(/(\w+)\s*=\s*[^,]*/);
            if (paramMatch) {
                return `${indentation} * @param {any} ${paramMatch[1]}`;
            }
            return `${indentation} * @param {any} ${param}`;
        }).join('\n');

        if (paramTags) {
            paramTags += '\n';
        }

        return `${indentation}/**\n${indentation} * Summary of Method/Function\n${paramTags}${indentation} * @returns {${returnType}}\n${indentation} *\n${indentation} * @since ${mYear}\n${indentation} * @version ${mVersion}\n${indentation} */`;
    }

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
                    insertClassDocPhp(editor);
                    break;

                case "extension.insertClassDocJS":
                    insertClassDocJs(editor);
                    break;

                case "extension.insertMethodDocPhp":
                    wordRange = editor.document.getWordRangeAtPosition(position, /function\s+[A-Za-z_][A-Za-z0-9_]*\s*\(([^)]*)\)[^\{]*\{?/s);
                    if (wordRange) {
                        line = wordRange.start.line;
                        text = editor.document.getText(wordRange);
                        indentation = editor.document.lineAt(line).text.match(/^\s*/)[0];

                        const paramsMatch = text.match(/\(([^)]*)\)/s);
                        const params = paramsMatch ? paramsMatch[1].split(/,\s*/).map(param => param.trim()).filter(param => param) : [];

                        const returnTypeMatch = text.match(/:\s*([\w|\\]+)/);
                        const returnType = returnTypeMatch ? returnTypeMatch[1] : 'mixed';

                        snippet = getMethodDocPhpSnippet(indentation, params, returnType);
                        editor.edit(editBuilder => {
                            editBuilder.insert(new vscode.Position(line, 0), `${snippet}\n`);
                        });
                    } else {
                        vscode.window.showInformationMessage(`Invalid Selection: Not a Method Declaration`);
                    }
                    break;

                case "extension.insertMethodDocJS":
                    wordRange = editor.document.getWordRangeAtPosition(position, /(?:function\s+\w*|const\s+\w+\s*=\s*function|\w+\s*=\s*\([^)]*\)\s*=>|function\*\s+\w*|class\s+\w+)\s*\(([^)]*)\)\s*(?::\s*(\w+))?/);
                    if (wordRange) {
                        line = wordRange.start.line;
                        text = editor.document.getText(wordRange);
                        indentation = editor.document.lineAt(line).text.match(/^\s*/)[0];

                        const paramsMatch = text.match(/\(([^)]*)\)/);
                        const params = paramsMatch ? paramsMatch[1].split(/,\s*/).map(param => param.trim()).filter(param => param) : [];

                        const returnTypeMatch = text.match(/:\s*(\w+)/);
                        const returnType = returnTypeMatch ? returnTypeMatch[1] : 'any';

                        snippet = getMethodDocJsSnippet(indentation, params, returnType);
                        editor.edit(editBuilder => {
                            editBuilder.insert(new vscode.Position(line, 0), `${snippet}\n`);
                        });
                    } else {
                        vscode.window.showInformationMessage(`Invalid Selection: Not a Method Declaration`);
                    }
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
