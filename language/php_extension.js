const config = require('../config');

class PhpExtension {

    /**
     * Generates a PHP class documentation snippet.
     * @param {string} indentation - The indentation for formatting.
     * @param {string} className - Class name.
     * @returns {string} The class documentation snippet.
     */
    static #getClassDocPhpSnippet(indentation, className = 'NA') {
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
     * Inserts a PHP class documentation comment with proper indentation.
     * @param {object} editor
     * @param {object} vscode
     */
    static insertClassDocPhp(editor, vscode) {
        const document = editor.document;
        const position = editor.selection.active;
        const lineText = document.lineAt(position.line).text;
        const indentation = lineText.match(/^\s*/)[0];
        const wordRange = document.getWordRangeAtPosition(position);

        if (!wordRange) {
            vscode.window.showErrorMessage(`Invalid Selection: Please right-click on PHP Class name to add the snippet.`);
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
        const snippet = PhpExtension.#getClassDocPhpSnippet(indentation, word);
        // Insert the comment above the class definition
        editor.edit((editBuilder) => {
            const insertPosition = new vscode.Position(position.line, 0);
            editBuilder.insert(insertPosition, snippet);
        });
    }

    /**
     * Generates a PHP method documentation snippet.
     * @param {string} indentation - The indentation for formatting.
     * @param {string} methodName - Method name.
     * @param {string[]} params - The method parameters.
     * @param {string} returnType - The return type of the method.
     * @returns {string} The method documentation snippet.
     */
    static #getMethodDocPhpSnippet(indentation, methodName = 'NA', params, returnType) {
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

        let snippetSince = '';
        if (config.enableSince) {
            snippetSince = `${indentation} * @since ${config.year}\n`;
        }

        let snippetVersion = '';
        if (config.enableVersion) {
            snippetVersion = `${indentation} * @version ${config.version}\n`;
        }

        return `${indentation}/**\n${indentation} * ${methodName}\n${paramTags}${indentation} * @return ${returnType}\n${snippetSince}${snippetVersion}${indentation} */\n`;
    }

    /**
     * Inserts a PHP method documentation comment with proper indentation.
     * @param {object} editor
     * @param {object} vscode
     */
    static insertMethodDocPhp(editor, vscode) {
        const document = editor.document;
        const position = editor.selection.active;
        const lineText = document.lineAt(position.line).text;
        const indentation = lineText.match(/^\s*/)[0];
        const wordRange = document.getWordRangeAtPosition(position);

        if (!wordRange) {
            vscode.window.showErrorMessage(`Invalid Selection: Please right-click on PHP Method name to add the snippet.`);
            return;
        }

        const word = document.getText(wordRange);

        // Regex to check for a method declaration in PHP
        const methodRegex = /\bfunction\s+(\w+)/;
        const match = methodRegex.exec(lineText);

        if (!match || match[1] !== word) {
            vscode.window.showErrorMessage(`Invalid Selection: Please right-click on PHP Method name to add the snippet.`);
            return;
        }

        const paramsMatch = lineText.match(/\(([^)]*)\)/s);
        const params = paramsMatch ? paramsMatch[1].split(/,\s*/).map(param => param.trim()).filter(param => param) : [];

        const returnTypeMatch = lineText.match(/:\s*([\w|\\]+)/);
        const returnType = returnTypeMatch ? returnTypeMatch[1] : 'mixed';

        const snippet = PhpExtension.#getMethodDocPhpSnippet(indentation, word, params, returnType);
        // Insert the comment above the class definition
        editor.edit((editBuilder) => {
            const insertPosition = new vscode.Position(position.line, 0);
            editBuilder.insert(insertPosition, snippet);
        });
    }

}

module.exports = PhpExtension;
