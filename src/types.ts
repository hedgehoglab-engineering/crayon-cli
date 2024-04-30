export type FrameworkOption = 'react' | 'vue';

export type TestRunner = 'vitest' | 'jest';

export type CrayonConfigFeatures = {
    tests?: boolean;
    storybook?: boolean;
};

export type CrayonConfigTests = {
    runner?: TestRunner;
};

export type CrayonConfig = {
    framework: FrameworkOption;
    features?: CrayonConfigFeatures;
    tests?: CrayonConfigTests;
};
