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

  octokit.rest.issues.get({
    // TODO: make dynamic (split from inputs)
    owner: "hwakabh",
    repo: "semantic-issue-action",
    issue_number: payload.issue.number
  })
  .then(issue => {
    console.log(issue.data);
    if (issue.data.state != 'open') {
      console.log(`Target issue #${issue.data.number} has been already closed, nothing to do.`);
    } else {
      console.log(issue.data.title);
      if (isSemantic(issue.data.title)) {
        core.setOutput("check-result", true);
        console.log('Issue title is semantic, nothing to do');
      } else {
        core.setOutput("check-result", false);
        console.log(`The title of issue #${issue.data.number} is not aligned conventional-commits, will post comment.`);

        // TODO: post comments to the issue
      }
    }
  });

} catch (error) {
  core.setFailed(error.message);
}


function isSemantic(issueTitle) {
  try {
    const ast = parser(issueTitle);
    const commits = toConventionalChangelogFormat(ast);
    core.debug(commits)
    return true
  } catch {
    return false
  }
}
