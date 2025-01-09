const core = require('@actions/core');
const github = require('@actions/github');
const { parser, toConventionalChangelogFormat } = require('@conventional-commits/parser');

console.log("Starting actions: @hwakabh/semantic-issue-action");

try {
  // Fetch input values from action-metadata using `use.with` statement
  const targetRepo = core.getInput('repo');
  const ghToken = core.getInput('token');

  // TODO: validate string of repo (owner/reponame)
  // TODO: validate existence of repo in github.com

  const octokit = github.getOctokit(ghToken);
  console.log(`Fetching issues in repository ${targetRepo}`);

  // Get the JSON webhook payload of issue for the event to validate title
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

  // TODO: Fetch target issue object from action contexts (workflow triggers)
  octokit.rest.issues.get({
    owner: "hwakabh",
    repo: "semantic-issue-action",
    issue_number: payload.issue.number
  })
  .then(issue => {
    console.log(issue.data);
    issue.data.forEach(i => {
      console.log(i.title);
      if (isSemantic(i.title)) {
        console.log('>>> Issue title is semantic');
        core.setOutput("check-result", true);
      } else {
        console.log('>>> Not semantic!');
        core.setOutput("check-result", false);

        // TODO: post comments to the issue
      }
    });
  })

} catch (error) {
  core.setFailed(error.message);
}


function isSemantic(issueTitle) {
  try {
    const ast = parser(issueTitle);
    const commits = toConventionalChangelogFormat(ast);
    console.log(commits);
    return true
  } catch {
    return false
  }
}
