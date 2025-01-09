# semantic-issue-action
[JavaScript GitHub custom Actions](https://docs.github.com/en/actions/sharing-automations/creating-actions/creating-a-javascript-action) for Semantic Issue using [`actions/toolkit`](https://github.com/actions/toolkit). \
This GitHub Actions check that the titles of issue in your repository will follow [the Conventional Commit specs](https://www.conventionalcommits.org/en/v1.0.0/#specification).

Generally this actions will do nothing to interact in your issue/repos, whereas will post comments in the issue if the title format will breach conventional commits specs. \
For checking if issue title will be aligned to conventional commits specs, as the core of this JavaScript actions, [`@conventional-commits/parser`](https://github.com/conventional-commits/parser) will be used.

## Usage

## Inputs

## Outputs

## Locals
For local development of this custom actions, generally we will expect to use [`nektos/act`](https://github.com/nektos/act) to run GitHub Actions jobs on your local environment. \
Please refer [the docs](https://nektosact.com/introduction.html) for more details.
