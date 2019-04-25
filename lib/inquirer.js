const inquirer = require('inquirer');
const files = require('./files');

const uname = 'username';
const pwd = 'password';
const input = 'input';
const name = 'name';
const description = 'description';

const welcomeMessage = 'Enter your Github username or e-mail address:';
const welcomePrompt = 'Please enter your username or e-email address.';
const passwordMessage = 'Enter your password';
const passwordPrompt = 'Please enter your password';

const newRepoMessage = 'Enter a name for your new repo';
const newRepoPrompt = 'Please enter a name for your new repo';
const descriptionMessage = 'Optionally enter a description of the repository:';

const list = 'list';
const visibility = 'visibility';
const repoTypeMessage = 'Public or private:';
const repoChoices = ['public', 'private'];

const minimist = require('minimist')

function askGithubCredentials() {
  const questions = [
    { // username
      name: uname,
      type: input,
      message: welcomeMessage,
      validate: value => value.length ? true : welcomePrompt
    },

    { // password 
      name: pwd,
      type: pwd,
      message: passwordMessage,
      validate: value => value.length ? true : passwordPrompt
    }
  ];
  return inquirer.prompt(questions);
}

function askRepoDetails() {
  const argv = minimist(process.argv.slice(2));

  const questions = [
    {
      type: input,
      name: name,
      message: newRepoMessage,
      default: argv._[0] || files.getCurrentDirectoryBase(),
      validate: value => value.length ? true : newRepoPrompt
    },
    {
      type: input,
      name: description,
      default: argv._[1] || null,
      message: descriptionMessage
    },
    {
      type: list,
      name: visibility,
      message: repoTypeMessage,
      choices: repoChoices,
      default: repoChoices[0]
    }
  ];
  return inquirer.prompt(questions);
}

module.exports = {
  privateType:          repoChoices[1],
  askGithubCredentials: askGithubCredentials,
  askRepoDetails:       askRepoDetails
}
