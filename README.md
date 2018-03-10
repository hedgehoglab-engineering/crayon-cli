# 🖍 Crayon CLI

Crayon is a frontend CLI tool for bootstrapping and scaffolding frontend applications. Much like laravels `artisan` CLI tool, it aims to reduce time in writing a lot of repetitive patterns.

## Installation

```bash
npm i -g netsells/crayon-cli
```

## Commands

```
   crayon 1.0.0 

   USAGE

     crayon make:repository <name>

   ARGUMENTS

     <name>      Repository name      required      

   GLOBAL OPTIONS

     -h, --help         Display help                                      
     -V, --version      Display version                                   
     --no-color         Disable colors                                    
     --quiet            Quiet mode - only displays warn and error messages
     -v, --verbose      Verbose mode - will also output debug messages    

```

## Contributing

```bash
cd crayon-cli
npm link
mkdir ../crayon-dev
cd ../crayon-dev
npm link crayon
```
