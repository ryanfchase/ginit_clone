// PROGRESS
// https://www.sitepoint.com/javascript-command-line-interface-cli-node-js/
// current-line: Creating a Repository
// note... Run program first and fix potential errors

const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')

const files = require('./lib/files');
const inquirer = require('./lib/inquirer');

const github = require('./lib/github');

clear();
const init_fig = figlet.textSync('Ginit', { horizontalLayout: 'full' })
const text = chalk.yellow(init_fig)
console.log(text);

if (files.directoryExists('.git')) {
  console.log(chalk.red('Already a git repo!'));
  process.exit();
}

// status: needs to be run...
const run = async () => {
  // const credentials = await inquirer.askGithubCredentials();
  // console.log(credentials);
  let token = github.getStoredGithubToken();
  if(!token) {
    await github.setGithubCredentials();
    token = await github.registerNewToken();
  }
  console.log(token)
}

run();

