const core = require('@actions/core');
const github = require('@actions/github');

console.log("Starting actions: @hwakabh/semantic-issue-action")

try {
  // Fetch input values from action-metadata using `use.with` statement
  const targetRepo = core.getInput('repo');
  console.log(`Checking issue title(s) in repository ${targetRepo}`);

  // TODO: validate string of repo (owner/reponame)

  // define returns of actions
  const result = "https://github.com/" + targetRepo;
  console.log("Set output values as check-result");
  core.setOutput("check-result", result);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

} catch (error) {
  core.setFailed(error.message);
}
