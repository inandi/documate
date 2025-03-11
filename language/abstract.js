const config = require('../config');
const PhpExtension = require('./PhpExtension');
const JsExtension = require('./JsExtension');

/**
 * Generates a default documentation snippet.
 * @returns {string} The default documentation snippet.
 */
function getDefaultDocSnippet() {
    return `/**\n * NA..\n */`;
}

const insertDefaultDocSnippet = function (editor, vscode) {
    let snippet = getDefaultDocSnippet();
    editor.insertSnippet(new vscode.SnippetString(snippet));
}

/**
 * Generates a file-level documentation snippet.
 * @returns {string} The file information snippet.
 */
function getFileInfoSnippet() {
    let snippetAuthor = '';
    if (config.enableAuthor) {
        let snippetEmail = '';
        if (config.enableEmail) {
            snippetEmail = ` <${config.email}>`;
        }
        snippetAuthor = ` * @author ${config.author}${snippetEmail}\n`;
    }

    let snippetSince = '';
    if (config.enableSince) {
        snippetSince = ` * @since ${config.year}\n`;
    }

    let snippetVersion = '';
    if (config.enableVersion) {
        snippetVersion = ` * @version ${config.version}\n`;
    }

    let snippetCopyright = '';
    if (config.enableCopyright) {
        snippetCopyright = ` * @copyright © ${config.year} ${config.author}. All rights reserved.\n`;
    }

    return `/**\n * Summary of File\n *\n${snippetAuthor}${snippetSince}${snippetVersion}${snippetCopyright} */`;
}

const insertFileInfoSnippet = function (editor, vscode) {
    let snippet = getFileInfoSnippet();
    editor.edit(editBuilder => {
        const firstLine = editor.document.lineAt(0);
        const firstText = firstLine.text.trim().toLowerCase();
        if (firstText === '<?php' || firstText === '<?') {
            editBuilder.insert(firstLine.range.end, '\n' + snippet);
        } else {
            editBuilder.insert(firstLine.range.start, snippet + '\n');
        }
    });
}

const updateVersionTag = function (editor, vscode, position) {
    let wordRange = editor.document.getWordRangeAtPosition(position, /@version/);
    if (!wordRange) {
        vscode.window.showWarningMessage('Please right-click on the @version tag to update.');
        return;
    }

    let line = wordRange.start.line;
    let text = editor.document.lineAt(line).text;
    let indentation = text.match(/^\s*/)[0];
    const newVersion = `${indentation}* @version ${config.version}`;

    editor.edit(editBuilder => {
        editBuilder.replace(new vscode.Range(line, 0, line, text.length), newVersion);
    });
}

module.exports = { config, PhpExtension, JsExtension, insertDefaultDocSnippet, updateVersionTag, insertFileInfoSnippet }