# 🖍 Crayon CLI

Crayon is a frontend CLI tool for bootstrapping and scaffolding frontend applications. Much like laravels `artisan` CLI tool, it aims to reduce time in writing a lot of repetitive patterns.

## Installation

```bash
npm i -g netsells/crayon-cli
```

## Commands

`make:repository <name>` - create a JavaScript repository in your project
`add:vuex` - adds Vuex to your project and sets up a boilerplate store

## Contributing

```bash
cd crayon-cli
npm link
mkdir ../crayon-dev
cd ../crayon-dev
npm link crayon
```
