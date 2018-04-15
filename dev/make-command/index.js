const slug = require('slug');
const { readFileSync, existsSync, outputFileSync } = require('fs-extra');
const inquirer = require('inquirer');
const chalk = require('chalk');

/** @type {string} */
const commandStub = readFileSync(`${__dirname}/stubs/command.js`, 'utf8');
/** @type {string} */
const testStub = readFileSync(`${__dirname}/stubs/test.js`, 'utf8');

// Replace colons with hyphens
slug.charmap[':'] = '-';

/**
 * Generate a the output path for the command
 *
 * @param {String} command
 *
 * @returns {string}
 */
const commandDirectory = (command) => `${process.cwd()}/commands/${slug(command)}`;

inquirer.prompt([
    {
        type: 'input',
        name: 'command',
        message: 'What is the command?',
        validate(value) { // eslint-disable-line require-jsdoc-except/require-jsdoc
            if (!value.length) {
                return 'Please enter a command.';
            }
            if (value.includes(' ')) {
                return 'The command should not contain any spaces.';
            }
            if (existsSync(commandDirectory(value))) {
                return 'Rule already exists';
            }

            return true;
        },
    },
    {
        type: 'input',
        name: 'description',
        message: 'Describe what the command does:',
        validate(value) { // eslint-disable-line require-jsdoc-except/require-jsdoc
            if (!value.length) {
                return 'Please enter a description.';
            }

            return true;
        },
    },
]).then(({ command, description }) => {
    const outputDirectory = commandDirectory(command);

    // Generate the command boilerplate
    const output = commandStub
        .replace('{{COMMAND}}', command)
        .replace('{{DESCRIPTION}}', description);

    // Write the command file with basic command boilerplate
    outputFileSync(`${outputDirectory}/index.js`, output);

    // Generate the test boilerplate
    const testOutput = testStub
        .replace(/{{COMMAND}}/g, command);

    // Write the test file with basic failing test boilerplate
    outputFileSync(`./tests/${slug(command)}.test.js`, testOutput);
    
    console.log(`\n${  chalk.green(`Command [${command}] created successfully.`)}`);
});
