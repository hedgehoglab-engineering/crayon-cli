import type { CrayonConfig } from './types';
import { loadConfig } from 'c12';

const config = async () => {
    const { config, configFile } = await loadConfig<CrayonConfig>({
        name: 'crayon',
        configFile: '.crayon.config',
    });

    return config;
};

export const configExists = async () => {
    return (await config()) === null;
};

export const ensureConfigExists = async () => {
    if (!(await configExists())) {
        process.exit(1);
    }
};

export default config;
