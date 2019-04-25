const _ = require('lodash');
const fs = require('fs');
const git = require('simple-git')();
const CLI = require('clui');
const Spinner = CLI.Spinner;

const inquirer = require('./inquirer');
const githubFactory = require('./github');

async function createRemoteRepo() {
  const github = githubFactory.getInstance();
  const answers = await inquirer.askRepoDetails();

  const data = {
    name: answers.name,
    description: answers.description,
    private: (answers.visibility === inquirer.privateType)
  }

  const spinner = new Spinner('Creating remote repository...');
  spinner.start();
  try {
    const reponse = await github.repos.create(data);
    return response.data.ssh_url;
  }
  catch(err) {
    throw err;
  }
  finally {
    spinner.stop();
  }
}

module.exports = {
  createRemoteRepo: createRemoteRepo
}
