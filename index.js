const core = require('@actions/core');
const github = require('@actions/github');

console.log("Starting actions: @hwakabh/semantic-issue-action")

try {
  // Fetch input values from action-metadata using `use.with` statement
  const targetRepo = core.getInput('repo');
  // TODO: validate string of repo (owner/reponame)

  const ghToken = core.getInput('token');
  const octokit = github.getOctokit(ghToken);

  console.log(`Fetching issues in repository ${targetRepo}`);
  octokit.rest.issues.listForRepo({
    owner: "hwakabh",
    repo: "semantic-issue-action"
  })
  .then(issues => {
    // console.log(issues.data);
    issues.data.forEach(i => {
      console.log(i.title);
    });
  })


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
