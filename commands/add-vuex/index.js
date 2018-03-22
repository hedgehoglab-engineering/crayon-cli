const crayon = require('caporal');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const exec = require('../../utils/execute.js');

crayon.command('add:vuex', 'Adds Vuex to your project')
    .action((args, options, logger) => {
    
        // Install Vuex

        exec('yarn add vuex')
            .catch(({ stderr }) => {
                logger.error(chalk.red(`ERROR: ${stderr}`));
            });

         // Create store
         const storeLocation = `${process.cwd()}/js/store`;
         fs.ensureDirSync(storeLocation);

         // Create store/index.js
         const defaultStore = fs.readFileSync(path.resolve(`${__dirname}/stubs/index.js`), 'utf8');
         fs.writeFileSync(`${storeLocation}/index.js`, defaultStore);

        // Read app.js
        const appJs = fs.readFileSync(`${process.cwd()}/js/app.js`, 'utf8');
        const appJsArray = appJs.split('\n');

        // Insert store import
        appJsArray.splice(0, 0, `import store from './store';`);

        // Insert store into vue initialise
        const newVueIndex = appJsArray.indexOf('new Vue({');
        appJsArray.splice(newVueIndex + 1, 0, '    store,');

        // Write app.js with new lines
        fs.writeFileSync(`${process.cwd()}/js/app.js`, appJsArray.join('\n'));

        logger.info(chalk.green(`Vuex installed successfully.`));
    });