const vscode = require('vscode');

const mConfig = vscode.workspace.getConfiguration('documate');

const config = {
    enableAuthor: mConfig.get("enableAuthor", true),
    author: mConfig.get("author", 'Unknown Author'),
    enableVersion: mConfig.get("enableVersion", true),
    version: mConfig.get("version", '1.0.0'),
    enableEmail: mConfig.get("enableEmail", true),
    email: mConfig.get("email", 'email@example.com'),
    enableSince: mConfig.get("enableSince", true),
    enableCopyright: mConfig.get("enableCopyright", true),
    year: new Date().getFullYear()
};

module.exports = config;
