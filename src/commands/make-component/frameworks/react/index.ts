import { fileURLToPath } from 'url'
import { resolve } from 'pathe'
import template from 'lodash.template'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { camelCase, kebabCase, pascalCase } from 'scule'
import { type Prop } from '../props'
import { log } from '@clack/prompts'
import config from '../../../../config'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const componentStubPath = resolve(__dirname, './stubs/Component.tsx.stub')
const storiesStubPath = resolve(__dirname, './stubs/Component.stories.tsx.stub')

const defaultStubPath = (path: string) => resolve(__dirname, './stubs/', path)
const ejectedStubPath = (path: string) =>
  resolve(process.cwd(), '.crayon/commands/make-component/react/stubs/', path)

function getStubPath(path: string) {
  const defaultPath = defaultStubPath(path)
  const ejectedPath = ejectedStubPath(path)

  if (existsSync(ejectedPath)) {
    return ejectedPath
  }

  return defaultPath
}

function generateComponentStub({
  componentName,
  path,
  props,
}: {
  componentName: string
  path: string
  props: Prop[]
}) {
  const componentTemplate = readFileSync(
    getStubPath('Component.tsx.stub'),
    'utf-8',
  )
  const compile = template(componentTemplate)

  const compiled = compile({
    component: {
      name: {
        pascal: pascalCase(componentName),
        kebab: kebabCase(componentName),
        camel: camelCase(componentName),
      },

      props,
    },
  })

  if (!existsSync(path)) {
    mkdirSync(path, {
      recursive: true,
    })
  }

  writeFileSync(resolve(path, `${componentName}.tsx`), compiled, 'utf-8')
}

function generateStoriesStub({
  componentName,
  path,
  props,
}: {
  componentName: string
  path: string
  props: Prop[]
}) {
  const componentTemplate = readFileSync(
    getStubPath('Component.stories.tsx.stub'),
    'utf-8',
  )
  const compile = template(componentTemplate)

  const compiled = compile({
    component: {
      name: {
        pascal: pascalCase(componentName),
        kebab: kebabCase(componentName),
        camel: camelCase(componentName),
      },

      props,
    },
  })

  if (!existsSync(path)) {
    mkdirSync(path, {
      recursive: true,
    })
  }

  writeFileSync(
    resolve(path, `${componentName}.stories.tsx`),
    compiled,
    'utf-8',
  )
}

export function run({
  componentName,
  path,
  props,
}: {
  componentName: string
  path: string
  props: Prop[]
}) {
  generateComponentStub({
    componentName,
    path,
    props,
  })

  generateStoriesStub({
    componentName,
    path,
    props,
  })
}

function ejectStub(path: string) {
  if (!existsSync(ejectedStubPath(''))) {
    mkdirSync(ejectedStubPath(''), {
      recursive: true,
    })
  }

  const stubContent = readFileSync(defaultStubPath(path), 'utf-8')

  writeFileSync(ejectedStubPath(path), stubContent, 'utf-8')
}

export function eject() {
  ejectStub('Component.tsx.stub')
  log.success('Ejected Component.tsx.stub')

  if (config?.features?.storybook) {
    ejectStub('Component.stories.tsx.stub')
    log.success('Ejected Component.stories.tsx.stub')
  }
}
