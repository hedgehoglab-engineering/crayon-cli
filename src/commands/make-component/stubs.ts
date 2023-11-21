import { fileURLToPath } from 'url'
import { resolve } from 'pathe'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import config from '../../config'
import template from 'lodash.template'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const defaultStubPath = (path: string) =>
  resolve(__dirname, 'frameworks', config.framework, 'stubs', path)
const ejectedStubPath = (path: string) =>
  resolve(
    process.cwd(),
    '.crayon/commands/make-component',
    config.framework,
    'stubs',
    path,
  )

export function getStubPath(path: string) {
  const defaultPath = defaultStubPath(path)
  const ejectedPath = ejectedStubPath(path)

  if (existsSync(ejectedPath)) {
    return ejectedPath
  }

  return defaultPath
}

export function generateStub({
  fileName,
  path,
  stubFile,
  templateData,
}: {
  fileName: string
  path: string
  stubFile: string
  templateData: {
    [key: string]: any
  }
}) {
  const componentTemplate = readFileSync(getStubPath(stubFile), 'utf-8')
  const compile = template(componentTemplate)

  const compiled = compile(templateData)

  if (!existsSync(path)) {
    mkdirSync(path, {
      recursive: true,
    })
  }

  writeFileSync(resolve(path, fileName), compiled, 'utf-8')
}

export function ejectStub(path: string) {
  if (!existsSync(ejectedStubPath(''))) {
    mkdirSync(ejectedStubPath(''), {
      recursive: true,
    })
  }

  const stubContent = readFileSync(defaultStubPath(path), 'utf-8')

  writeFileSync(ejectedStubPath(path), stubContent, 'utf-8')
}
