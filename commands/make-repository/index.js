const crayon = require('caporal');
const { outputFileSync, readFileSync, existsSync } = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const glob = require('glob');
const { toCamelCase } = require('../../utils');
const { generateOutputPath, generateRepositoryName } = require('./utils');
const { template } = require('lodash');
const baseRepositoryPath = path.resolve(`${__dirname}/stubs/BaseRepository.js`);

/**
 * Create the BaseRepository file
 *
 * @param {Object} data
 */
const makeBaseRepository = (data) => {
    const baseRepositoryTemplate = readFileSync(baseRepositoryPath, 'utf8');

    const baseRepositoryStub = template(baseRepositoryTemplate)({
        laroute_path: path.relative(generateOutputPath('Base'), data.laroutePath),
    });

    // Create the base repository
    outputFileSync(generateOutputPath('Base'), baseRepositoryStub);
};

crayon.command('make:repository', 'Make a repository')
    .argument('<name>', 'Repository name')
    .option('--with-base', 'Whether the BaseRepository should be recreated.')
    .option('--overwrite, -o', 'Whether the repository should be overwritten if it exists.')
    .action((args, options, logger) => {
        let baseCreated = false;
        const repositoryName = generateRepositoryName(args.name);

        // Find where the routes file is
        const laroutePath = glob.sync('./public/**/laroute.js')[0];
        if (!laroutePath) {
            return console.log(chalk.red('Laroute not found in the current project.'));
        }

        if (existsSync(generateOutputPath(args.name)) && !options.overwrite) {
            return console.log(chalk.red(`${repositoryName} exists. To overwrite, provide the [-o, --overwrite] flag.`));
        }
        /** @type {String} */
        const stub = readFileSync(path.resolve(`${__dirname}/stubs/StubRepository.js`), 'utf8');
        const entityName = toCamelCase(args.name);
        const repositoryContent = stub.replace(new RegExp('Stub', 'g'), entityName);

        if (options.withBase || !existsSync(generateOutputPath('Base'))) {
            makeBaseRepository({ laroutePath });
            baseCreated = true;
        }

        // Create the new repository
        outputFileSync(generateOutputPath(args.name), repositoryContent);

        logger.info(chalk.green(`${(baseCreated) ? 'BaseRepository and ' : ''}${repositoryName} created successfully.`));
    });
