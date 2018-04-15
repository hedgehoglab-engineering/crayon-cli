const crayon = require('caporal');
const chalk = require('chalk');
const ora = require('ora');
const exec = require('../../utils/execute');
/** @type {Object} **/
const fs = require('fs-extra');
const { isWebpack } = require('../../utils');

crayon
    .command('add:eslint', 'Add eslint to the project')
    .argument('[config]', 'Optional eslint config package', /(.)/, 'netsells/eslint-config-netsells')
    .action((args, options, logger) => {
        const spinner = ora('Adding dependencies...').start();

        const config = args.config.match(/eslint-config-(.*)/)[1];

        const dependencies = [
            'eslint',
            args.config,
        ];

        if (isWebpack) {
            dependencies.push('eslint-loader');
        }

        // Add the dependencies
        exec(`yarn add ${dependencies.join(' ')} -D`).then(() => {
            // Create the .eslintrc file
            fs.outputFileSync('./.eslintrc', JSON.stringify({ extends: config }, null, 4));
            spinner.succeed('Dependencies added.');

            if (isWebpack) {
                console.log(chalk.yellow('Add the following to your webpack config:'), `
{
    module: {
        rules: [
            {
                test:    /.(vue|js)$/,
                loader:  'eslint-loader',
                enforce: 'pre',
                exclude: /node_modules/,
            },
        ],
    },
},
                `);
            }

            logger.info(chalk.green('Eslint was added to the project successfully.'));
        });
    });
