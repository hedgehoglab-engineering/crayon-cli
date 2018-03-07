const crayon = require('caporal');
const fs = require('fs');
const path = require('path');
const mkdir = require('../../utils/mkdir.js');

crayon.command('make:repository', 'Make a repository')
    .argument('<name>', 'Repository name')
    // .argument('[env]', 'Environment to deploy on', /^dev|staging|production$/, 'local')
    // you specify options using .option()
    // if --tail is passed, its value is required
    // .option('--tail <lines>', 'Tail <lines> lines of logs after deploy', prog.INT)
    .action((args, options, logger) => {
        const stub = fs.readFileSync(path.resolve(`${__dirname}/stubs/StubRepository.js`), 'utf8');
        const entityName = args.name[0].toUpperCase() + args.name.slice(1);
        const repositoryName = `${entityName}Repository`;
        const repositoryContent = stub.replace(new RegExp('Stub', 'g'), entityName);
        let repositoryLocation = `${process.cwd()}/js/repositories`;

        mkdir(repositoryLocation);

        fs.writeFileSync(`${repositoryLocation}/${repositoryName}.js`, repositoryContent);
        // args and options are objects
        // args = {"app": "myapp", "env": "production"}
        // options = {"tail" : 100}
    });
