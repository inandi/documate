const vscode = require('vscode');
const abstractExtension = require('./language/abstract.js');

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

    commands.forEach(cmd => {
        let disposable = vscode.commands.registerCommand(cmd.name, function () {

            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showErrorMessage("No active editor found.");
                return;
            }
            const position = editor.selection.active;

            switch (cmd.name) {
                case "extension.insertClassDocPhp":
                    abstractExtension.PhpExtension.insertClassDocPhp(editor, vscode);
                    break;

                case "extension.insertClassDocJS":
                    abstractExtension.JsExtension.insertClassDocJs(editor, vscode);
                    break;

                case "extension.insertMethodDocPhp":
                    abstractExtension.PhpExtension.insertMethodDocPhp(editor, vscode);
                    break;

                case "extension.insertMethodDocJS":
                    abstractExtension.JsExtension.insertMethodDocJs(editor, vscode);
                    break;

                case "extension.insertPropertyDocPhp":
                    abstractExtension.PhpExtension.insertPropertyDocPhp(editor, vscode);
                    break;

                case "extension.insertPropertyDocJS":
                    abstractExtension.JsExtension.insertPropertyDocJs(editor, vscode);
                    break;

                case "extension.updateVersionTag":
                    abstractExtension.CoreExtension.updateVersionTag(editor, vscode, position);
                    break;

                case "extension.updateFileInfo":
                    abstractExtension.CoreExtension.insertFileInfoSnippet(editor, vscode);
                    break;

                default:
                    abstractExtension.CoreExtension.insertDefaultDocSnippet(editor, vscode);
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
