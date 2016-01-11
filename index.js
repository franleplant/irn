#!/usr/bin/env node
'use strict'
const readline = require('readline')
const fs = require('fs')
const meow = require('meow')


const cli = meow(`
    Description
      Simple CLI tools to interactively rename files
      very similar to what GUI interfaces offer.

    Usage
      $ irn file_name
`)


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const oldPath = cli.input[0]
if (!oldPath) {
  cli.showHelp()
}

// Test if the file exists, can be read and writen
try {
  fs.accessSync(oldPath, fs.F_OK & fs.R_OK & fs.W_OK);
  // Do something
} catch (e) {
  console.log( `/
    Error: File does not exist or you dont have the right permissions
    ${e.message}
  `)
  rl.close()
  process.exit(1)
}

rl.setPrompt('> ');
rl.prompt();
rl.write(oldPath);

rl.on('line', (newPath) => {
  newPath = newPath.trim()
  console.log(`Successfully renamed ${oldPath} -> ${newPath}`)
  fs.renameSync(oldPath, newPath)
  rl.close();
})
