import hedgehogLabConfig from '@hedgehoglab/eslint-config';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
    ...hedgehogLabConfig,
    {
        ignores: ['dist/'],
    },
    // Disable rules handled by prettier
    {
        name: 'eslint-config-prettier',
        ...eslintConfigPrettier,
    },
];
