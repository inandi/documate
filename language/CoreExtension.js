const config = require('./config');

/**
 * Class CoreExtension
 * @author Gobinda Nandi <gobinda.nandi.public@gmail.com>
 * @since 2025
 * @version 0.0.1
 * @copyright © 2025 Gobinda Nandi. All rights reserved.
 */
class CoreExtension {

    /**
     * Generates a default documentation snippet.
     * @returns {string} The default documentation snippet.
     * @since 2025
     * @version 0.0.1
     */
    static #getDefaultDocSnippet() {
        return `/**\n * NA\n */`;
    }

    /**
     * Insert default doc snippet
     * @param {object} editor 
     * @param {object} vscode 
     * @since 2025
     * @version 0.0.1
     */
    static insertDefaultDocSnippet(editor, vscode) {
        let snippet = CoreExtension.#getDefaultDocSnippet();
        editor.insertSnippet(new vscode.SnippetString(snippet));
    }

    /**
     * Update version tag
     * 
     * @param {object} editor 
     * @param {object} vscode 
     * @param {object} position 
     * @returns 
     * @since 2025
     * @version 0.0.1
     */
    static updateVersionTag(editor, vscode, position) {
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

    /**
     * Generates a file-level documentation snippet.
     * @returns {string} The file information snippet.
     * @since 2025
     * @version 0.0.1
     */
    static #getFileInfoSnippet() {
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

    /**
     * Insert file info snippet
     * 
     * @param {object} editor 
     * @param {object} vscode 
     * @since 2025
     * @version 0.0.1
     */
    static insertFileInfoSnippet(editor, vscode) {
        let snippet = CoreExtension.#getFileInfoSnippet();
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
}

module.exports = CoreExtension;
