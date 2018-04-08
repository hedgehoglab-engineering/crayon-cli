const crayon = require('caporal');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const exec = require('../../utils/execute.js');
const jsDir = `${process.cwd()}/resources/assets/js`;
const appEntry = `${jsDir}/app.js`;
const routerLocation = `${jsDir}/router`;
const routerStub = fs.readFileSync(path.resolve(`${__dirname}/stubs/index.js`), 'utf8');

crayon.command('add:vue-router', 'Adds Vue router to your project')
    .action((args, options, logger) => {
        // Read app.js
        if (!fs.existsSync(appEntry)) {
            return logger.error(chalk.red('App entry point not found.'));
        }

        const appJs = fs.readFileSync(appEntry, 'utf8');
        const appJsArray = appJs.split('\n');

        // Insert router import
        appJsArray.splice(0, 0, 'import router from \'./router\';\n');

        //Insert router into vue initialise
        if (!appJsArray.includes('new Vue({')) {
            return logger.info(chalk.red('Please add Vue to your project first.'));
        }

        // Install vue-router
        exec('yarn add vue-router').catch(({ stderr }) => {
            logger.error(chalk.red(`ERROR: ${stderr}`));
        });

        // Create router
        fs.ensureDirSync(routerLocation);

        //Create router/index.js
        fs.writeFileSync(`${routerLocation}/index.js`, routerStub);

        const newVueIndex = appJsArray.indexOf('new Vue({');
        appJsArray.splice(newVueIndex + 1, 0, '    router,');

        // Write app.js with new lines
        fs.writeFileSync(appEntry, appJsArray.join('\n'));

        logger.info(chalk.green('Vue router installed successfully.'));
    });