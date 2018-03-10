const slug = require('slug');
const fs = require('fs');
const mkdir = require('../../utils/mkdir');
const inquirer = require('inquirer');
const chalk = require('chalk');
const commandStub = fs.readFileSync(`${__dirname}/stubs/command.js`, 'utf8');

// Generate a the output path for the command
const commandDirectory = (command) => {
    const directory = command.replace(/:/g, '-');

    return `${process.cwd()}/commands/${slug(command)}`;
}

// Replace colons with hyphens
slug.charmap[':'] = '-';

inquirer.prompt([
    {
        type: 'input',
        name: 'command',
        message: 'What is the command?',
        validate(value) {
            if (!Boolean(value.length)) {
                return 'Please enter a command.';
            }
            if (value.includes(' ')) {
                return 'The command should not contain any spaces.';
            }
            if (fs.existsSync(commandDirectory(value))) {
                return 'Rule already exists';
            }

            return true;
        },
    },
    {
        type: 'input',
        name: 'description',
        message: 'Describe what the command does:',
        validate(value) {
            if (!Boolean(value.length)) {
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

    // Make the command directory
    mkdir(outputDirectory);

    // Write the command file with basic command boilerplate
    fs.writeFileSync(`${outputDirectory}/index.js`, output);
    
    console.log('\n' + chalk.green(`Command [${command}] created successfully.`));
});
