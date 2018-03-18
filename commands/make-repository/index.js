const { toCamelCase } = require('../../utils');

const { generateOutputPath, generateRepositoryName } = require('./utils');

const crayon = require('caporal');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

crayon.command('make:repository', 'Make a repository')
    .argument('<name>', 'Repository name')
    .action((args, options, logger) => {
        const stub = fs.readFileSync(path.resolve(`${__dirname}/stubs/StubRepository.js`), 'utf8');
        const entityName = toCamelCase(args.name);
        const repositoryName = generateRepositoryName(args.name);
        const repositoryContent = stub.replace(new RegExp('Stub', 'g'), entityName);

        // Create the file
        fs.outputFileSync(generateOutputPath(args.name), repositoryContent);
        
        logger.info(chalk.green(`${repositoryName} created successfully.`));
    });
