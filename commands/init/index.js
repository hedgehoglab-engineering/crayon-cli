const crayon = require('caporal');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const rcPath = `${process.cwd()}/.crayonrc`;

crayon
    .command('init', 'Creates a Crayon config file')
    .action((args, options, logger) => {
        const stub = fs.copySync(path.resolve(`${__dirname}/stubs/.crayonrc`), rcPath);

        logger.info(chalk.green(`Success.`));
    });
