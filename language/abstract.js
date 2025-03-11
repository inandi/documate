/**
 * Config data varaible
 * @type {object} config
 * @since 2025
 * @version 0.0.1
 */
const config = require('./config');

/**
 * Core class variable
 * @type {function} CoreExtension
 * @since 2025
 * @version 0.0.1
 */
const CoreExtension = require('./CoreExtension');

/**
 * PHP class variable
 * @type {function} PhpExtension
 * @since 2025
 * @version 0.0.1
 */
const PhpExtension = require('./PhpExtension');

/**
 * JS class varaible
 * @type {function} JsExtension
 * @since 2025
 * @version 0.0.1
 */
const JsExtension = require('./JsExtension');

module.exports = { config, CoreExtension, PhpExtension, JsExtension }