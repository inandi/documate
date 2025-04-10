const config = require('./config');
const CoreExtension = require('./CoreExtension');

/**
 * Class JsExtension
 * @author Gobinda Nandi <email@example.com>
 * @since 2025
 * @version 0.0.1
 * @copyright © 2025 Gobinda Nandi. All rights reserved.
 */
class JsExtension extends CoreExtension {

    /**
     * Generates a JavaScript class documentation snippet.
     * @param {string} indentation - The indentation for formatting.
     * @param {string} className - Class name.
     * @returns {string} The class documentation snippet.
     * @since 2025
     * @version 0.0.1
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
     * @since 2025
     * @version 0.0.1
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

    /**
     * Generates a JavaScript method documentation snippet.
     * @param {string} indentation - The indentation for formatting.
     * @param {string} methodName - Method name.
     * @param {string[]} params - The method parameters.
     * @param {string} returnType - The return type of the method.
     * @returns {string} The method documentation snippet.
     * @since 2025
     * @version 0.0.1
     */
    static #getMethodDocJsSnippet(indentation, methodName = 'NA', params, returnType) {
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

        let snippetSince = '';
        if (config.enableSince) {
            snippetSince = `${indentation} * @since ${config.year}\n`;
        }

        let snippetVersion = '';
        if (config.enableVersion) {
            snippetVersion = `${indentation} * @version ${config.version}\n`;
        }

        return `${indentation}/**\n${indentation} * ${methodName}\n${paramTags}${indentation} * @returns {${returnType}}\n${snippetSince}${snippetVersion}${indentation} */\n`;
    }

    /**
     * Inserts a JavaScript method documentation comment with proper indentation.
     * @param {object} editor
     * @param {object} vscode
     * @since 2025
     * @version 0.0.1
     */
    static insertMethodDocJs(editor, vscode) {
        const document = editor.document;
        const position = editor.selection.active;
        const lineText = document.lineAt(position.line).text;
        const indentation = lineText.match(/^\s*/)[0];
        const wordRange = document.getWordRangeAtPosition(position);

        if (!wordRange) {
            vscode.window.showErrorMessage(`Invalid Selection: Please right-click on JS Method name to add the snippet.`);
            return;
        }

        const word = document.getText(wordRange);

        // Regex to check for a method declaration in JavaScript
        const methodRegex = /\b(?:async\s+)?(?:static\s+)?(\w+)\s*\(/;
        const match = methodRegex.exec(lineText);

        if (!match || match[1] !== word) {
            vscode.window.showErrorMessage(`Invalid Selection: Please right-click on JS Method name to add the snippet.`);
            return;
        }

        const paramsMatch = lineText.match(/\(([^)]*)\)/);
        const params = paramsMatch ? paramsMatch[1].split(/,\s*/).map(param => param.trim()).filter(param => param) : [];

        const returnTypeMatch = lineText.match(/:\s*(\w+)/);
        const returnType = returnTypeMatch ? returnTypeMatch[1] : 'any';

        const snippet = JsExtension.#getMethodDocJsSnippet(indentation, word, params, returnType);

        // Insert the comment above the method definition
        editor.edit((editBuilder) => {
            const insertPosition = new vscode.Position(position.line, 0);
            editBuilder.insert(insertPosition, snippet);
        });
    }

    /**
     * Generates a JavaScript property documentation snippet.
     * @param {string} indentation - The indentation for formatting.
     * @param {string} variableName - The property name.
     * @returns {string} The property documentation snippet.
     * @since 2025
     * @version 0.0.1
     */
    static #getPropertyDocJsSnippet(indentation, variableName) {
        return `${indentation}/**\n${indentation} * Summary of Property\n${indentation} * @type {any} ${variableName}\n${indentation} */`;
    }

    /**
     * Inserts a JavaScript property documentation comment with proper indentation.
     * @param {object} editor
     * @param {object} vscode
     * @since 2025
     * @version 0.0.1
     */
    static insertPropertyDocJs(editor, vscode) {
        const document = editor.document;
        const position = editor.selection.active;
        const wordRange = document.getWordRangeAtPosition(position, /(const|let|var)\s+(\$?\w+)\s*=\s*/);

        if (!wordRange) {
            vscode.window.showErrorMessage(`Invalid Selection: Not a Property Declaration`);
            return;
        }

        const line = wordRange.start.line;
        const text = document.getText(wordRange);
        const indentation = document.lineAt(line).text.match(/^\s*/)[0];
        const variableNameMatch = text.match(/(const|let|var)\s+(\$?\w+)/);
        const variableName = variableNameMatch ? variableNameMatch[2] : 'variable';

        const snippet = JsExtension.#getPropertyDocJsSnippet(indentation, variableName);

        editor.edit(editBuilder => {
            editBuilder.insert(new vscode.Position(line, 0), `${snippet}\n`);
        });
    }
}

module.exports = JsExtension;
