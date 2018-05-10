const crayon = require('caporal');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const exec = require('../../utils/execute.js');
const config = require('../../utils/config');
const storeStub = fs.readFileSync(path.resolve(`${__dirname}/stubs/index.js`), 'utf8');

const configJsDir = config.get('js_directory');
const configJsEntry = config.get('js_entry');

const jsDir = path.resolve(process.cwd(), configJsDir !== undefined ? configJsDir : 'resources/assets/js');
const appEntry = path.resolve(jsDir, configJsEntry !== undefined ? configJsEntry : 'app.js');
const storeLocation = `${jsDir}/store`;

crayon.command('add:vuex', 'Adds Vuex to your project')
    .action((args, options, logger) => {
        
        // Read app.js
        if (!fs.existsSync(appEntry)) {
            return logger.error(chalk.red('App entry point not found.'));
        }

        const appJs = fs.readFileSync(appEntry, 'utf8');
        const appJsArray = appJs.split('\n');

        if ((appJsArray.indexOf(`import store from './store';`) > -1) && (appJsArray.indexOf(`    store,`) > -1)){
            return logger.info(chalk.blue('Vuex already installed.'));
        }

        // Insert store import
        appJsArray.splice(0, 0, `import store from './store';`);

        // Insert store into vue initialise
        if (!appJsArray.includes('new Vue({')) {
            return logger.info(chalk.red('Please add Vue to your project first.'));
        }

        // Install Vuex
        exec('npm install vuex', false).catch((err) => {
            logger.error(chalk.red(`ERROR: ${JSON.stringify(err)}`));
        });

        // Create store
        fs.ensureDirSync(storeLocation);

        // Create store/index.js
        fs.writeFileSync(`${storeLocation}/index.js`, storeStub);

        const newVueIndex = appJsArray.indexOf('new Vue({');
        appJsArray.splice(newVueIndex + 1, 0, '    store,');

        // Write app.js with new lines
        fs.writeFileSync(appEntry, appJsArray.join('\n'));

        logger.info(chalk.green('Vuex installed successfully.'));
    });

crayon.command('remove:vuex', 'Removes Vuex from your project')
    .action((args, options, logger) => {
        // Read app.js
        if (!fs.existsSync(appEntry)) {
            return logger.error(chalk.red('App entry point not found.'));
        }

        const appJs = fs.readFileSync(appEntry, 'utf8');
        const appJsArray = appJs.split('\n');

        if ((appJsArray.indexOf(`import store from './store';`) == -1) && (appJsArray.indexOf(`    store,`) == -1)){
            return logger.info(chalk.blue('Vuex not installed.'));
        }

        // Remove store import
        const importIndex = appJsArray.indexOf(`import store from './store';`);
        appJsArray.splice(importIndex, 1);

        // Remove store from vue initialise
        const storeIndex = appJsArray.indexOf(`    store,`);
        appJsArray.splice(storeIndex, 1);

        // Uninstall Vuex
        exec('npm uninstall vuex', false).catch((err) => {
            logger.error(chalk.red(`ERROR: ${JSON.stringify(err)}`));
        });

        // Create store
        fs.removeSync(storeLocation);

        // Write app.js with new lines
        fs.writeFileSync(appEntry, appJsArray.join('\n'));

        logger.info(chalk.green('Vuex removed successfully.'));
    });