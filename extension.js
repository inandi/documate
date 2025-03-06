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

    function getMethodDocPhpSnippet(indentation, params) {
        let paramTags = params.map(param => {
            const typeMatch = param.match(/([\w|\\]+)\s*\$([A-Za-z_][A-Za-z0-9_]*)/);
            if (typeMatch) {
                return `${indentation} * @param ${typeMatch[1]} $${typeMatch[2]}`;
            }
            return `${indentation} * @param mixed ${param}`;
        }).join('\n');

        if (paramTags) {
            paramTags += '\n';
        }

        return `${indentation}/**\n${indentation} * Summary of Method/Function\n${paramTags}${indentation} * @return mixed\n${indentation} *\n${indentation} * @since ${year}\n${indentation} * @version ${version}\n${indentation} */`;
    }

    function getMethodDocJsSnippet() {
        return `/**\n * Summary of Method/Function\n * @return {any}\n *\n * @since ${year}\n * @version ${version}\n */`;
    }

    function getPropertyDocPhpSnippet() {
        return `/**\n * Summary of Property\n * @var mixed arg\n */`;
    }

    function getPropertyDocJsSnippet() {
        return `/**\n * @type {any} arg\n * Summary of Property\n */`;
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
                    wordRange = editor.document.getWordRangeAtPosition(position, /function\s+[A-Za-z_][A-Za-z0-9_]*\s*\(([^)]*)\)/);
                    if (wordRange) {
                        line = wordRange.start.line;
                        text = editor.document.lineAt(line).text;
                        indentation = text.match(/^\s*/)[0];
                        const paramsMatch = text.match(/\(([^)]*)\)/);
                        const params = paramsMatch ? paramsMatch[1].split(',').map(param => param.trim()).filter(param => param) : [];
                        snippet = getMethodDocPhpSnippet(indentation, params);
                        editor.edit(editBuilder => {
                            editBuilder.insert(new vscode.Position(line, 0), `${snippet}\n`);
                        });
                    } else {
                        vscode.window.showInformationMessage(`Invalid Selection: Not a Method Declaration`);
                    }
                    break;

                case "extension.insertMethodDocJS":
                    snippet = getMethodDocJsSnippet();
                    break;

                case "extension.insertPropertyDocPhp":
                    snippet = getPropertyDocPhpSnippet();
                    break;

                case "extension.insertPropertyDocJS":
                    snippet = getPropertyDocJsSnippet();
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

            // editor.insertSnippet(new vscode.SnippetString(snippet));
            // vscode.window.showInformationMessage(`${cmd.name} Documentation Added`);
        });

        context.subscriptions.push(disposable);
    });
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
};
