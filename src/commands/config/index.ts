import { defineCommand } from 'citty';
import { promptScope } from '../../prompts.js';
import { log } from '@clack/prompts';
import config from '../../config';

export default defineCommand({
    meta: {
        name: 'config',
        description: 'Output the current crayon cli config',
    },

    async run() {
        const crayonConfig = await config();

        await promptScope(async ({ intro, outro }) => {
            intro('Current crayon config:');

            if (!crayonConfig) {
                log.error('No config file found');
            } else {
                log.info(JSON.stringify(crayonConfig, null, 4));
            }

            outro('');
        });
    },
});
