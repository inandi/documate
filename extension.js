const vscode = require('vscode');

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

    const config = vscode.workspace.getConfiguration('documate');
    const author = config.get('author', 'Unknown Author');
    const version = config.get('version', '1.0.0');
    const email = config.get('email', 'email@example.com');
    const year = new Date().getFullYear();

    function getClassDocPhpSnippet(indentation) {
        return `${indentation}/**\n${indentation} * Summary of Class\n${indentation} * @author ${author} <${email}>\n${indentation} * @since ${year}\n${indentation} * @version ${version}\n${indentation} * @copyright © ${year} ${author}. All rights reserved.\n${indentation} */`;
    }

    function getClassDocJsSnippet(indentation) {
        return `${indentation}/**\n${indentation} * Summary of Class\n${indentation} * @author ${author} <${email}>\n${indentation} * @since ${year}\n${indentation} * @version ${version}\n${indentation} * @copyright © ${year} ${author}. All rights reserved.\n${indentation} */`;
    }

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

        return `${indentation}/**\n${indentation} * Summary of Method/Function\n${paramTags}${indentation} * @return ${returnType}\n${indentation} *\n${indentation} * @since ${year}\n${indentation} * @version ${version}\n${indentation} */`;
    }

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

        return `${indentation}/**\n${indentation} * Summary of Method/Function\n${paramTags}${indentation} * @return {${returnType}}\n${indentation} *\n${indentation} * @since ${year}\n${indentation} * @version ${version}\n${indentation} */`;
    }

    function getPropertyDocPhpSnippet(indentation, variableName) {
        return `${indentation}/**\n${indentation} * Summary of Property\n${indentation} * @var mixed ${variableName}\n${indentation} */`;
    }

    function getPropertyDocJsSnippet(indentation, variableName) {
        return `${indentation}/**\n${indentation} * Summary of Property\n${indentation} * @type {any} ${variableName}\n${indentation} */`;
    }

    function getFileInfoSnippet() {
        return `/**\n * Summary of File\n *\n * @author ${author} <${email}>\n * @since ${year}\n * @version ${version}\n * @copyright © ${year} ${author}. All rights reserved.\n */`;
    }

    function getDefaultDocSnippet() {
        return `/**\n * NA\n */`;
    }

    commands.forEach(cmd => {
        let disposable = vscode.commands.registerCommand(cmd.name, function () {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
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
                    wordRange = editor.document.getWordRangeAtPosition(position, /class\s+[A-Za-z_][A-Za-z0-9_]*/);
                    if (wordRange) {
                        line = wordRange.start.line;
                        text = editor.document.lineAt(line).text;
                        indentation = text.match(/^\s*/)[0];
                        snippet = getClassDocPhpSnippet(indentation);
                        editor.edit(editBuilder => {
                            editBuilder.insert(new vscode.Position(line, 0), `${snippet}\n`);
                        });
                    } else {
                        vscode.window.showInformationMessage(`Invalid Selection: Not a Class Declaration. Right click on Class name to add the snippet.`);
                    }
                    break;

                case "extension.insertClassDocJS":
                    wordRange = editor.document.getWordRangeAtPosition(position, /class\s+[A-Za-z_][A-Za-z0-9_]*/);
                    if (wordRange) {
                        line = wordRange.start.line;
                        text = editor.document.lineAt(line).text;
                        indentation = text.match(/^\s*/)[0];
                        snippet = getClassDocJsSnippet(indentation);
                        editor.edit(editBuilder => {
                            editBuilder.insert(new vscode.Position(line, 0), `${snippet}\n`);
                        });
                    } else {
                        vscode.window.showInformationMessage(`Invalid Selection: Not a Class Declaration. Right click on Class name to add the snippet.`);
                    }
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
                    const newVersion = `${indentation}* @version ${version}`;

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

function deactivate() { }

module.exports = {
    activate,
    deactivate
};
