const crayon = require('caporal');
const chalk = require('chalk');

crayon
    .command('{{COMMAND}}', '{{DESCRIPTION}}')
    //.argument('<app>', 'Required argument description')
    //.argument('[env]', 'Optional argument description')
    //.option('--tail <lines>', 'Tail <lines> lines of logs after deploy', prog.INT)
    .action((args, options, logger) => {
        // args and options are objects
        // args = {"app": "myapp", "env": "production"}
        // options = {"tail" : 100}
        
        logger.info(chalk.green(`Success.`));
    });
