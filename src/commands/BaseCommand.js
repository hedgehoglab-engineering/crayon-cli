const inquirer = require('inquirer');
const { resolve } = require('path');
const { existsSync, mkdirSync } = require('fs');

class BaseCommand {
    constructor({ args, options, logger }) {
        this.args = args;
        this.options = options;
        this.logger = logger;

        this._handle();
    }

    /**
     * Trigger the command handler.
     *
     * @private
     */
    _handle() {
        this.handle();
    }

    /**
     * Handle the command.
     * This should be overwritten by the class extending this one.
     */
    handle() {
        // Overwrite
    }

    /**
     * Return the command signature.
     *
     * @returns {string}
     */
    get commandName() {
        return '';
    }

    /**
     * Return the path to the ejected files for this command.
     *
     * @returns {string}
     */
    get ejectPath() {
        return resolve(
            process.cwd(),
            '.crayon/commands',
            this.commandName.replace(/:/g, '-'),
        );
    }

    /**
     * Check if the command has been ejected.
     *
     * @returns {boolean}
     */
    get isEjected() {
        return existsSync(this.ejectPath);
    }

    /**
     * Log a success message.
     *
     * @param {string} message
     */
    success(message) {
        this.logger.info(message);
    }

    /**
     * Log an error message.
     *
     * @param {string} message
     */
    error(message) {
        this.logger.error(message);
    }

    /**
     * Log an info message.
     *
     * @param {string} message
     */
    info(message) {
        this.logger.info(message);
    }

    /**
     * Log a debug message.
     *
     * @param {string} message
     */
    debug(message) {
        this.logger.debug(message);
    }

    /**
     * Log a simple question.
     *
     * @param {string} message
     *
     * @returns {Promise<string>}
     */
    async ask(message) {
        const { answer } = await inquirer.prompt([{
            message,
            name: 'answer',
            type: 'input',
        }]);

        return answer;
    }

    /**
     * Ask a multiple choice question.
     *
     * @param {string} message
     * @param {Array} choices
     *
     * @returns {Promise<Array>}
     */
    async multiple(message, choices) {
        const { answer } = await inquirer.prompt([{
            message,
            name: 'answer',
            type: 'checkbox',
            choices,
        }]);

        return answer;
    }

    /**
     * Ask a confirmation question.
     *
     * @param {string} message
     *
     * @returns {Promise<boolean>}
     */
    async confirm(message) {
        const { confirm } = await inquirer.prompt([{
            message,
            name: 'confirm',
            type: 'confirm',
        }]);

        return confirm;
    }

    /**
     * Ensure a particular directory exists.
     *
     * @param {string} directory
     */
    ensureDirectoryExists(directory) {
        if (existsSync(directory)) {
            return;
        }

        mkdirSync(directory, {
            recursive: true,
        });
    }
}

module.exports = BaseCommand;
