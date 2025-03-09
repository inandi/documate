const config = require('../config');

class JsExtension {

    /**
     * Generates a JavaScript class documentation snippet.
     * @param {string} indentation - The indentation for formatting.
     * @param {string} className - Class name.
     * @returns {string} The class documentation snippet.
     */
    static #getClassDocJsSnippet(indentation, className = 'NA') {

        let snippetAuthor = '';
        if (config.enableAuthor) {
            let snippetEmail = '';
            if (config.enableEmail) {
                snippetEmail = ` <${config.email}>`;
            }
            snippetAuthor = `${indentation} * @author ${config.author}${snippetEmail}\n`;
        }

        let snippetSince = '';
        if (config.enableSince) {
            snippetSince = `${indentation} * @since ${config.year}\n`;
        }

        let snippetVersion = '';
        if (config.enableVersion) {
            snippetVersion = `${indentation} * @version ${config.version}\n`;
        }

        let snippetCopyright = '';
        if (config.enableCopyright) {
            snippetCopyright = `${indentation} * @copyright © ${config.year} ${config.author}. All rights reserved.\n`;
        }
        return `${indentation}/**\n${indentation} * Class ${className}\n${snippetAuthor}${snippetSince}${snippetVersion}${snippetCopyright}${indentation} */\n`;
    }

    /**
     * Inserts a JavaScript class documentation comment with proper indentation.
     * @param {object} editor
     * @param {object} vscode
     */
    static insertClassDocJs(editor, vscode) {
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
        const snippet = JsExtension.#getClassDocJsSnippet(indentation, word);
        // Insert the comment above the class definition
        editor.edit((editBuilder) => {
            const insertPosition = new vscode.Position(position.line, 0);
            editBuilder.insert(insertPosition, snippet);
        });
    }
}

module.exports = JsExtension;
