import caporal from '@caporal/core';
import MakeComponent from './MakeComponent.js';

const { program } = caporal;

program
    .command('make:component', 'Generate boilerplate for a new component')
    .argument('[component]', 'Path to the new component')
    .option('--eject', 'Eject the stub templates so they can be modified')
    .option('--framework', 'Manually specify framework')
    .option('--skip-props', 'Skip the props step')
    .action((context) => new MakeComponent(context));
