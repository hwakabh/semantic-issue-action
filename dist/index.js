const core = require('@actions/core');
const github = require('@actions/github');
const { parser, toConventionalChangelogFormat } = require('@conventional-commits/parser');
async function run() {
    // Fetch input values from action-metadata using `use.with` statement
    const targetRepo = core.getInput('repo');
    const ghToken = core.getInput('token');
    const messageBody = core.getInput('body');
    const octokit = github.getOctokit(ghToken);
    // valiate input format
    if (targetRepo.split('/').length != 2) {
        core.setFailed("Invalid format in input with [repo], make sure the value of repo is [owner/reponame]");
    }
    // validate existence of repo in github.com
    const query = `
    query (
      $owner: String!
      $name: String!
    ) {
      repository(owner: $owner, name: $name) {
        url
      }
    }
  `;
    await octokit.graphql(query, {
        owner: targetRepo.split('/')[0],
        name: targetRepo.split('/')[1]
    })
        .then(r => {
        core.debug(r);
    })
        .catch(e => {
        core.debug(e);
        core.setFailed(`Repository [ ${targetRepo} ] not exists, check the value of repo.`);
    });
    // Get the JSON webhook payload of issue for the event to validate title
    console.log(`Fetching issues in repository ${targetRepo}`);
    const ctx = github.context.payload;
    core.debug("The event payload below:");
    core.debug(ctx);
    await octokit.rest.issues.get({
        owner: targetRepo.split('/')[0],
        repo: targetRepo.split('/')[1],
        issue_number: ctx.issue.number
    })
        .then(issue => {
        core.debug(issue.data);
        if (issue.data.state === 'open') {
            console.log(issue.data.title);
            if (isSemantic(issue.data.title) != true) {
                // Post comments to the issue if not semantic
                core.setOutput("check-result", false);
                console.log(`The title of issue #${issue.data.number} is not aligned conventional-commits, will post comment.`);
                octokit.rest.issues.createComment({
                    owner: targetRepo.split('/')[0],
                    repo: targetRepo.split('/')[1],
                    issue_number: ctx.issue.number,
                    body: messageBody
                })
                    .catch(e => {
                    core.debug(e);
                    core.setFailed(`Failed to posting comment in issue ${issue.data.number}.`);
                });
            }
            else {
                core.setOutput("check-result", true);
                console.log('Issue title is semantic, nothing to do');
            }
        }
        else {
            console.log(`Target issue #${issue.data.number} has been already closed, nothing to do.`);
        }
    })
        .catch(e => {
        core.debug(e);
        core.setFailed(`Failed to fetch issue number from JSON webhook context.`);
    });
}
function isSemantic(issueTitle) {
    try {
        const ast = parser(issueTitle);
        const commits = toConventionalChangelogFormat(ast);
        core.debug(commits);
        return true;
    }
    catch {
        return false;
    }
}
console.log("Starting actions: @hwakabh/semantic-issue-action");
run();
