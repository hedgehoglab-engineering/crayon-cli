# 🖍 Crayon CLI

Crayon is a frontend CLI tool for bootstrapping and scaffolding frontend applications. Much like laravels `artisan` CLI tool, it aims to reduce time in writing a lot of repetitive patterns.

## Installation

```bash
npm i -g netsells/crayon-cli
```

## Commands

```bash
  crayon 

  USAGE 
  
    ▸ crayon <command> [ARGUMENTS...] [OPTIONS...]


  COMMANDS — Type 'crayon help <command>' to get some help about a command

    make:component                       Generate boilerplate for a new component               

  GLOBAL OPTIONS

    -h, --help                           Display global help or command-related help.           
    -V, --version                        Display version.                                       
    --no-color                           Disable use of colors in output.                       
    -v, --verbose                        Verbose mode: will also output debug messages.         
    --quiet                              Quiet mode - only displays warn and error messages.    
    --silent                             Silent mode: does not output anything, giving no       
                                         indication of success or failure other than the exit   
                                         code.                                                  

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
