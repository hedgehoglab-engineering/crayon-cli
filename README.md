# 🖍 Crayon CLI

Crayon is a frontend CLI tool for bootstrapping and scaffolding frontend applications. Much like laravels `artisan` CLI tool, it aims to reduce time in writing a lot of repetitive patterns.

## Installation

```bash
npm i -g netsells/crayon-cli
```

## Commands

```bash
   crayon 1.0.0 

   USAGE

     crayon make:repository <name>

   ARGUMENTS

     <name>      Repository name      required      

   OPTIONS

     --with-base          Whether the BaseRepository should be recreated.                 optional      
     --overwrite, -o      Whether the repository should be overwritten if it exists.      optional      

   GLOBAL OPTIONS

     -h, --help         Display help                                      
     -V, --version      Display version                                   
     --no-color         Disable colors                                    
     --quiet            Quiet mode - only displays warn and error messages
     -v, --verbose      Verbose mode - will also output debug messages    

```

## Contributing

### Installation

```bash
# clone the repo
git clone git@github.com:netsells/crayon-cli
# cd into the directory
cd crayon-cli
# link the module for use elsewhere
npm link
```

### Creating commands

Commands can be generated with some basic boiletplate using the following command:

```bash
npm run make:command
```

The command will run through a few questions to generate some boilerplate to get you going.

The CLI is powered by [Caporal](https://github.com/mattallty/Caporal.js) so visit the docs for details on how to put together new commands.
