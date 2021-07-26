# Deploying Textbook Beta

Core contributors from qiskit.org, along with other core developers, are responsible for the codebases's health. Here you will find the specifics our continuous integration process.

### Deployment

The Textbook beta application uses [GitHub Actions](https://docs.github.com/en/actions) to automate releases. This enables us to establish a Workflow and specify various steps that we need to include in our build process.

In the current configuration, the `Build and Release` Workflow is initiated by the following events:

- a manual trigger of the build
- a push to the `release` branch (merge)
- triggered automatically, as a part of a scheduled cron job (runs daily at 08:00am UTC)


This `Build and Release` process includes the following steps:

- checks out project repo
- installs dependencies
- runs Notebook tests
- runs Cypress tests
- generates the build
- deploys to AppEngine

Details for the `Deploy to AppEngine` step can be found by visiting the GitHub Action page [here](https://github.com/google-github-actions/deploy-appengine). (This AppEngine instance belongs to Mathigon). Additionally, `secrets` used for deploying are maintained through a joint effort between the Qiskit Textbook Beta and Mathigon.


### Live branch previews
As part of our continuous integration infrastructure, every pull request that passes the build process, receives a dedicated URL from [Heroku review apps](https://devcenter.heroku.com/articles/github-integration-review-apps). This allows the team to have live, branch previews, making it easier for the team to share links and review changes as necessary. You can preview your working branch at `https://platypus-preview-pr-<pull-request-number>.herokuapp.com/`.
