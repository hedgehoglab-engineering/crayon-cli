import { resolve } from 'pathe'
import { existsSync, readFileSync } from 'fs'
import { CrayonConfig } from './types'

const rootDir = process.cwd()
const configPath = resolve(rootDir, './.crayonrc')

export function configExists() {
  return existsSync(configPath)
}

let config: CrayonConfig | null = null

if (existsSync(configPath)) {
  config = JSON.parse(readFileSync(configPath, 'utf-8'))
}

export function ensureConfigExists() {
  if (!configExists()) {
    process.exit(1)
  }

  if (config === null) {
    process.exit(1)
  }

  // process.exit(1)
}

export default config
