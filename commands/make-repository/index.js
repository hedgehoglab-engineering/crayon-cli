const crayon = require('caporal');
const fs = require('fs');
const path = require('path');
const mkdir = require('../../utils/mkdir.js');

crayon.command('make:repository', 'Make a repository')
    .argument('<name>', 'Repository name')
    .action((args) => {
        const stub = fs.readFileSync(path.resolve(`${__dirname}/stubs/StubRepository.js`), 'utf8');
        const entityName = args.name[0].toUpperCase() + args.name.slice(1);
        const repositoryName = `${entityName}Repository`;
        const repositoryContent = stub.replace(new RegExp('Stub', 'g'), entityName);
        const repositoryLocation = `${process.cwd()}/js/repositories`;

        // Make sure the directory exists
        mkdir(repositoryLocation);

        // Create the file
        fs.writeFileSync(`${repositoryLocation}/${repositoryName}.js`, repositoryContent);
    });
