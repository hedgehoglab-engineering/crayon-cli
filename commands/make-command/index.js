const crayon = require('caporal');
const chalk = require('chalk');
const slug = require('slug');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const commandStub = fs.readFileSync(`${__dirname}/stubs/command.js`, 'utf8');
const testStub = fs.readFileSync(`${__dirname}/stubs/test.js`, 'utf8');
const { env } = require('../../utils/config');

// Replace colons with hyphens
slug.charmap[':'] = '-';

if (env !== 'dev') {
    return;
}

crayon
    .command('make:command', 'Generate boilerplate for a new crayon command')
    .argument('<command>', 'New command signature')
    //.argument('[env]', 'Optional argument description')
    //.option('--tail <lines>', 'Tail <lines> lines of logs after deploy', prog.INT)
    .action((args, options, logger) => {
        // args and options are objects
        // args = {"app": "myapp", "env": "production"}
        // options = {"tail" : 100}

        // Generate a the output path for the command
        const commandDirectory = (command) => `${process.cwd()}/commands/${slug(command)}`;

        inquirer.prompt([
            {
                type: 'input',
                name: 'command',
                message: 'What is the command?',
                default: args.command,
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

            // Write the command file with basic command boilerplate
            fs.outputFileSync(`${outputDirectory}/index.js`, output);

            // Generate the test boilerplate
            const testOutput = testStub
                .replace(/{{COMMAND}}/g, command);

            // Write the test file with basic failing test boilerplate
            fs.outputFileSync(`./tests/${slug(command)}.test.js`, testOutput);
            
            console.log('\n' + chalk.green(`Command [${command}] created successfully.`));
        });
    });
