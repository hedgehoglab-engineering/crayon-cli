const winston = require('winston');
const { inspect } = require('util');
const chalk = require('chalk');
const replace = require('lodash.replace');
const { EOL } = require('os');

winston.config.npm.levels.success = 2;

const caporalFormat = winston.format.printf((data) => {
    const { level, ...meta } = data;
    let { message } = data;
    let prefix = '';

    const levelStr = getLevelString(level);
    const metaStr = formatMeta(meta);

    if (metaStr !== '') {
        message += `${ EOL }${ levelStr } ${ metaStr }`;
    }

    if (level === 'error') {
        const spaces = ' '.repeat(meta.paddingLeft || 7);
        prefix = EOL;
        message = `${ replace(message, new RegExp(EOL, 'g'), EOL + spaces) }${ EOL }`;
    }

    return `${ prefix }${ levelStr } ${ message }`;
});

function formatMeta(meta) {
    delete meta.message;
    delete meta[(Symbol.for('level'))];
    delete meta[(Symbol.for('message'))];
    delete meta[(Symbol.for('splat'))];

    if (Object.keys(meta).length) {
        return inspect(meta, {
            showHidden: false,
            colors: logger.colorsEnabled,
        });
    }

    return '';
}

function getLevelString(level) {
    const icons = {
        info: 'ℹ',
        warn: '!',
        error: '✗',
        success: '✔',
    };

    const text = icons[level] || level;

    if (!logger.colorsEnabled) {
        return text;
    }

    let levelStr = level;

    switch (level) {
        case 'error':
            return chalk.bold.redBright(text);
        case 'warn':
            return chalk.bold.hex('#FF9900')(text);
        case 'info':
            return chalk.bold.hex('#569cd6')(text);
        case 'success':
            return chalk.bold.green(text);
        case 'debug':
        case 'silly':
            return chalk.dim(text)
    }

    return levelStr;
}

function createDefaultLogger() {
    const logger = winston.createLogger({
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(winston.format.splat(), caporalFormat),
            }),
        ],
    });
    // disableColors() disable on the logger level,
    // while chalk supports the --color/--no-color flag
    // as well as the FORCE_COLOR env var
    logger.disableColors = () => {
        logger.transports[0].format = caporalFormat;
        logger.colorsEnabled = false;
    };
    logger.colorsEnabled = chalk.supportsColor !== false;
    return logger;
}

let logger = createDefaultLogger();

module.exports = logger;
