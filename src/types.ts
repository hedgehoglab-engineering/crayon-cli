export type FrameworkOption = 'react' | 'vue';

export type TestRunner = 'vitest' | 'other';

export interface CrayonConfigFeatures {
    tests?: boolean;
    storybook?: boolean;
}

export interface CrayonConfigTests {
    runner?: TestRunner;
}

export interface CrayonConfig {
    framework: FrameworkOption;
    features?: CrayonConfigFeatures;
    tests?: CrayonConfigTests;
}
