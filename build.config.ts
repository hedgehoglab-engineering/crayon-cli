import { defineBuildConfig } from 'unbuild'
import copy from 'rollup-plugin-copy'

export default defineBuildConfig({
  declaration: false,
  rollup: {
    inlineDependencies: true,
    emitCJS: true,
    output: {
      preserveModules: true,
    },
  },
  externals: ['citty'],
  entries: [
    {
      builder: 'rollup',
      input: './src/index.ts',
      outDir: './dist',
    },
  ],
  hooks: {
    'rollup:options'(_ctx, options) {
      options.plugins = options.plugins ?? []

      if (Array.isArray(options.plugins)) {
        options.plugins.push(
          copy({
            targets: [
              { src: './src/logo.txt', dest: 'dist/' },
              { src: './src/package.json', dest: 'dist/' },
              {
                src: './src/**/*.stub',
                dest: 'dist/',
                rename: (name, extension, fullPath) => {
                  return fullPath
                },
              },
            ],
          }),
        )
      }
    },
  },
})
