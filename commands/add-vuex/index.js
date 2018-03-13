const crayon = require('caporal');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const mkdir = require('../../utils/mkdir.js');
const exec = require('../../utils/execute.js');

crayon.command('add:vuex', 'Adds Vuex to your project')
    .action((args, options, logger) => {
        
        /*
         * Install Vuex
         */

        exec('yarn add vuex')
            .catch((err) => {
                logger.error(chalk.red(`ERROR: ${err.stderr}`));
            });

        /*
         * Create store
         */

         // Create store/
         const storeLocation = `${process.cwd()}/js/store`;
         mkdir(storeLocation);

         // Create store/index.js
         const defaultStore = fs.readFileSync(path.resolve(`${__dirname}/stubs/DefaultStore.js`), 'utf8');
         fs.writeFileSync(`${storeLocation}/index.js`, defaultStore);

        /*
         * Edit app.js
         */

        // Read app.js
        const app_js = fs.readFileSync(`${process.cwd()}/js/app.js`, 'utf8');
        const app_js_array = app_js.split('\n');

        // Insert store import
        app_js_array.splice(1, 0, 'import store from \'./store\';');
        app_js_array.splice(2, 0, 'import Vuex from \'vuex\';');
        app_js_array.splice(3, 0, 'Vue.use(Vuex)');

        // Insert store into vue initialise
        const new_vue_index = app_js_array.indexOf('new Vue({');
        app_js_array.splice(new_vue_index+1, 0, '    store,');

        // Write app.js with new lines
        fs.writeFileSync(`${process.cwd()}/js/app.js`, app_js_array.join('\n'));

        logger.info(chalk.green(`Vuex installed successfully.`));
    });