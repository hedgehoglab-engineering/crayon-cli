const { program } = require('@caporal/core');
const MakeComponent = require('./MakeComponent');

program
    .command('make:component', 'Generate boilerplate for a new component')
    .argument('[component]', 'Path to the new component')
    .option('--eject', 'Eject the stub templates so they can be modified')
    .option('--skip-props', 'Skip the props step')
    .action((context) => new MakeComponent(context));
