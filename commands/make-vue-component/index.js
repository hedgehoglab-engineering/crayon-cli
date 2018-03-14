const crayon = require('caporal');
const fs = require('fs');
const path = require('path');
const mkdir = require('../../utils/mkdir');

crayon.command('make:vue-component', 'Make a Vue Component')
    .argument('<name>', 'Component Name')
    .action((args, options, logger) => {
        const stub = fs.readFileSync(path.resolve(`${__dirname}/stubs/StubComponent.vue`), 'utf8')
        const entityName = args.name[0].toUpperCase() + args.name.slice(1);
        const componentName = entityName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        const componentContent = stub.replace(new RegExp('stub', 'g'), componentName);

        let componentLocation = `${process.cwd()}/js/components`;

        mkdir(componentLocation);

        fs.writeFileSync(`${componentLocation}/${entityName}.vue`, componentContent);
    });