import type { FrameworkOption, TestRunner } from '../../types';

export type FrameworkSelectOption = {
    label: string;
    value: FrameworkOption;
    hint?: string;
};

export type TestRunnerSelectOption = {
    label: string;
    value: TestRunner;
    hint?: string;
};
