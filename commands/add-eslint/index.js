const crayon = require('caporal');
const chalk = require('chalk');
const ora = require('ora');
const exec = require('../../utils/execute');
const { outputFileSync } = require('fs-extra');

crayon
    .command('add:eslint', 'Add eslint to the project.')
    .argument('[config]', 'Optional eslint config package.', /(.)/, 'netsells/eslint-config-netsells')
    .action((args, options, logger) => {
        const spinner = ora('Adding dependencies...').start();

        const config = args.config.match(/eslint-config-(.*)/)[1];

        // Add the dependencies
        exec(`yarn add eslint ${args.config} -D`).then(() => {
            spinner.succeed('Dependencies added.');

            // Create the .eslintrc file
            outputFileSync('./.eslintrc', JSON.stringify({ extends: config }, null, 4));

            logger.info(chalk.green('Eslint was added to the project successfully.'));
        });
    });
