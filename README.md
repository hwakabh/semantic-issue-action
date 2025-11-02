# semantic-issue-action
[JavaScript GitHub custom Actions](https://docs.github.com/en/actions/sharing-automations/creating-actions/creating-a-javascript-action) for Semantic Issue using [`actions/toolkit`](https://github.com/actions/toolkit). \
This GitHub Actions check that the titles of issue in your repository will follow [the Conventional Commit specs](https://www.conventionalcommits.org/en/v1.0.0/#specification).

Generally this actions will do nothing to interact in your issue/repos, whereas will post comments in the issue if the title format will breach conventional commits specs. \
For checking if issue title will be aligned to conventional commits specs, as the core of this JavaScript actions, [`@conventional-commits/parser`](https://github.com/conventional-commits/parser) will be used.

## Usage
Create workflows (ex. `.github/workflows/semantic-issue.yaml`) for using semantic-issue-action with contexts:

```yaml
name: Semantic Issue Title
on:
  issues:
    types:
      - opened
      - edited
      - reopened
jobs:
  semantic-issue:
    steps:
      - name: Check Issue Title
        uses: hwakabh/semantic-issue-action@main
```

The validations for issue title will be called, depending on the workflow event configurations in `on.issues` field, where the issue status will be not closed. \
(Technically, the jobs will be kicked even if the closed issue in repository will be updated, but nothing will be done by this action.)

Regarding workflow event configurations, especially for issue's event, please see [GitHub docs](https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows#issues) for more references.

## Inputs
Inputs have been defined in [`action.yml`](./action.yml):

| Name | Required | Description |
| --- | --- | --- |
| `token` | true | Token to use to authorize. Typically the GITHUB_TOKEN secrets. |
| `repo` | true | Target repository to check issue title. |
| `body` | false | Message body to comment if title is not semantic. |

Example contexts for enabling title validations of this repository (`hwakabh/semantic-issue-action`):

```yaml
    steps:
      - name: Check Issue Title
        uses: hwakabh/semantic-issue-action@main
        with:
          repo: "hwakabh/semantic-issue-action"
          token: "${{ secrets.GITHUB_TOKEN }}"
          body: "The issue title is not aligned to conventional-commits specs, please consider to resolve."
```

The validations will be invoked in the issue's event trigger you configured, and if the issue title would not meet the spec of conventional-commits, the above configurations will trigger to comments like:

![posting-comments](https://github.com/user-attachments/assets/e5a186e1-c4df-45c9-8412-2e7a3c80a9ef)

## Outputs
This action will return the following outputs, so that you can extend your workflow with using them:

| Name | Description |
| --- | --- |
| `check-result` | Boolean value of validation that issue title is semantic or not |

Example usage of `check-result` output are below, but note that GitHub Actions outputs will be evalutated as string value even if the actions returns boolean value. \
See more about [the related comments](https://github.com/actions/runner/issues/1483#issuecomment-994986996).

```yaml
    steps:
    - id: check-issue-title
      uses: hwakabh/semantic-issue-action@main

    - if: steps.check-issue-title.outputs.check-result == 'true'
      run: |
        echo "Issue title is semantic ..."
        # Put your logics here

    - if: steps.check-issue-title.outputs.check-result == 'false'
      run: |
        echo "Title of issue is not aligned conventional-commits spec ..."
        # Put your logics here
```

## Locals
For local development of this custom actions, generally we will expect to use [`nektos/act`](https://github.com/nektos/act) to run GitHub Actions jobs on your local environment. \
Please refer [the docs](https://nektosact.com/introduction.html) for more details.

## Credits
Implemenation references on:
- [`semantic-pull-requests`](https://github.com/zeke/semantic-pull-requests) (GitHub Apps) created by [@zeke](https://github.com/zeke)
- [`semantic-prs`](https://github.com/Ezard/semantic-prs/tree/master) created by [@Ezard](https://github.com/Ezard)
