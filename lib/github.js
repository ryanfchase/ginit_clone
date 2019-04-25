const octokit     = require('@octokit/rest')();
const Configstore = require('configstore');
const pkg         = require('../package.json');
const _           = require('lodash');
const CLI         = require('clui');
const Spinner     = CLI.Spinner;
const chalk       = require('chalk');

const inquirer    = require('./inquirer');

const conf = new Configstore(pkg.name);

function getInstance() {
  return octokit;
}

function getStoredGithubToken() {
  return conf.get('github.token');
}

async function setGithubCredentials() {
  const credentials = await inquirer.askGithubCredentials();
  const type = { type: 'basic' };
  octokit.authenticate(
    _.extend(type, credentials)
  );
}

async function registerNewToken() {
  const status = new Spinner('Authenticating you, please hold...');
  status.starts();

  try {
    const scopes = ['user', 'public_repo', 'repo', 'repo:status'];
    const note = 'ginits, the command-line tool for initalizing Git repos';

    const response = await octokit.authorization.create({
      scopes: scopes,
      note: note
    });

    const token = response.data.token;

    if(token) {
      conf.set('github.token', token);
      return token;
    }
    else {
      const missingTokenErr = "Missing Token";
      const missingTokenMsg = "GitHub token was not found in the response";
      throw new Error(missingTokenErr, missingTokenMsg);
    }
  }
  catch (err) {
    throw err;
  }
  finally {
    status.stop();
  }
}

module.exports = {
  getInstance:          getInstance,
  getStoredGithubToken: getStoredGithubToken,
  setGithubCredentials: setGithubCredentials,
  registerNewToken:     registerNewToken
}
