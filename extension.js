const vscode = require('vscode');

function activate(context) {
    const commands = [
        {
            name: 'extension.insertClassDocPhp',
            lang: 'php'
        },
        {
            name: 'extension.insertClassDocJS',
            lang: 'javascript'
        },
        {
            name: 'extension.insertMethodDocPhp',
            lang: 'php'
        },
        {
            name: 'extension.insertMethodDocJS',
            lang: 'javascript'
        },
        {
            name: 'extension.insertPropertyDocPhp',
            lang: 'php'
        },
        {
            name: 'extension.insertPropertyDocJS',
            lang: 'javascript'
        }
    ];

    const config = vscode.workspace.getConfiguration('documate');
    const author = config.get('author', 'Unknown Author');
    const version = config.get('version', '1.0.0');
    const email = config.get('email', 'email@example.com');
    const year = new Date().getFullYear();

    function getClassDocPhpSnippet() {
        return `/**\n * Summary of class\n * @author ${author} <${email}>\n * @since ${year}\n * @version ${version}\n * @copyright © ${year} ${author}. All rights reserved.\n */`;
    }

    function getClassDocJsSnippet() {
        return `/**\n * Summary of class\n * @author ${author} <${email}>\n * @since ${year}\n * @version ${version}\n * @copyright © ${year} ${author}. All rights reserved.\n */`;
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

            switch (cmd.name) {
                case "extension.insertClassDocPhp":
                    snippet = getClassDocPhpSnippet();
                    break;

                case "extension.insertClassDocJS":
                    snippet = getClassDocJsSnippet();
                    break;

                default:
                    snippet = getDefaultDocSnippet();
                    break;
            }

            editor.insertSnippet(new vscode.SnippetString(snippet));
            vscode.window.showInformationMessage(`${cmd.lang} - ${cmd.name} Documentation Added`);
        });

        context.subscriptions.push(disposable);
    });
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
};
