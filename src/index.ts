import { defineCommand, runMain } from 'citty'
import { version } from '../package.json'
import { readFileSync } from 'fs'
import { resolve } from 'pathe'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const main = defineCommand({
  meta: {
    name: '@hedgehoglab/crayon',
    version,
    description: 'Crayon CLI',
  },

  setup({ rawArgs }) {
    if (rawArgs.length) {
      return
    }

    const logo = readFileSync(resolve(__dirname, './logo.txt'), 'utf-8')

    console.log(logo)
  },

  subCommands: {
    init: () => import('./commands/init').then(r => r.default),
    'make:component': () =>
      import('./commands/make-component').then(r => r.default),
  },
})

runMain(main)
