export type FrameworkOption = 'react' | 'vue';

export type TestRunner = 'vitest' | 'jest';

export type CrayonConfigTests = {
    runner: TestRunner;
};

export type CrayonConfigFeatures = {
    tests?: false | CrayonConfigTests;
    storybook?: boolean;
};

export type CrayonConfig = {
    framework: FrameworkOption;
    features?: CrayonConfigFeatures;
};
