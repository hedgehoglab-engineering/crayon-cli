import { FrameworkOption, TestRunner } from '../../types'

export interface FrameworkSelectOption {
  label: string
  value: FrameworkOption
  hint?: string
}

export interface TestRunnerSelectOption {
  label: string
  value: TestRunner
}
