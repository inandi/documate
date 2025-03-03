const vscode = require('vscode');

function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.insertAuthorInfo', function () {
        const config = vscode.workspace.getConfiguration('autofillAuthor');
        const author = config.get('author', 'Unknown Author');
        const version = config.get('version', '1.0.0');
        const year = new Date().getFullYear();
        const snippet = `/**\n * @author ${author}\n * @version ${version}\n * @since ${year}\n * @copyright © ${year} ${author}. All rights reserved.\n */`;

        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        // const snippet = `/**\n * @author ${author}\n * @version ${version}\n */`;
        editor.insertSnippet(new vscode.SnippetString(snippet));
        vscode.window.showInformationMessage(snippet);

    });

    context.subscriptions.push(disposable);
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
};