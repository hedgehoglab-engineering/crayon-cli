const crayon = require('caporal');
const chalk = require('chalk');
const ora = require('ora');
const exec = require('../../utils/execute');
/** @type {Object} **/
const fs = require('fs-extra');
const { isWebpack } = require('../../utils');

crayon
    .command('add:stylelint', 'Add stylelint to the project')
    .argument('[config]', 'Optional stylelint config package', /(.)/, 'netsells/stylelint-config-netsells')
    .action((args, options, logger) => {
        const spinner = ora('Adding dependencies...').start();

        const config = args.config.match(/stylelint-config-(.*)/)[1];

        const dependencies = [
            'stylelint',
            args.config,
        ];

        if (isWebpack) {
            dependencies.push('stylelint-webpack-plugin');
        }

        // Add the dependencies
        return exec(`yarn add ${dependencies.join(' ')} -D`).then(() => {
            // Create the .stylelintrc file
            fs.outputFileSync('./.stylelintrc', JSON.stringify({ extends: `stylelint-config-${config}` }, null, 4));
            spinner.succeed('Dependencies added.');

            if (isWebpack) {
                console.log(chalk.yellow('Add the following to your webpack config:'), `
const StyleLintPlugin = require('stylelint-webpack-plugin');

...

{
    plugins: [
        new StyleLintPlugin({
            configFile: './.stylelintrc',
            files: './resources/assets/**/*',
        }),
    ],
},
                `);
            }

            logger.info(chalk.green('Stylelint was added to the project successfully.'));
        });
    });
