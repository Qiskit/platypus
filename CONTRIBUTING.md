# CONTRIBUTING

Regardless if you are part of the core team or an external contributor, welcome and
thank you for contributing to https://learn.qiskit.org!

In learn.qiskit.org, we aim at creating an excellent work-space where all of us can feel
welcomed, useful, respected and valued. If you are thinking to contribute to
learn.qiskit.org, you agree to abide by our [code of conduct](CODE_OF_CONDUCT.md) which
we strongly recommend you read before continuing.

Following these guidelines shows you value the time and effort of the core
contributors and maintainers of this site and so, thank you!

## Table of contents

- [Start contributing](#start-contributing)
- [Before you start](#before-you-start)
- [Opening issues](#opening-issues)
- [Contributing code](#contributing-code)
  - [Deciding what to work on](#deciding-what-to-work-on)
  - [Setup](#setup)
  - [Assigning yourself](#assigning-yourself)
  - [Working on an issue](#working-on-an-issue)
  - [Pull requests](#pull-requests)
  - [Live previews](#live-previews)
  - [Code review](#code-review)
  - [Merging](#merging)
- [Code style](#code-style)
  - [Type annotations](#type-annotations)

## Start contributing

This repository is for developing and maintaining the Qiskit Textbook (beta) platform.
If you want to contribute to Qiskit, the open-source Python library, you should go
visit the [Qiskit repository](https://github.com/Qiskit/qiskit) instead.
Or if you want to contribute to the [qiskit.org website](https://qiskit.org), you should go
visit the [qiskit.org repository](https://github.com/Qiskit/qiskit.org) instead.

There are many ways of contributing: from catching a typo to coming up with a way
of improving performance or accessibility; you can open an issue, or you can prepare
a patch. In any case, read the contribution guidelines for opening new issues and
submitting pull requests.

Please, don't use this repository for asking questions about Qiskit: there are
better ways to do it. Refer to our public [Slack](https://ibm.co/joinqiskitslack)
or post a question in [stack overflow](https://stackoverflow.com/questions/tagged/qiskit).

## Before you start

Contributing to this repository, assumes you have some level
of [Git](https://git-scm.com) knowledge. For external contributors, a basic understanding
of repositories, remotes, branches and commits is needed. For core contributors, you
should know about resolving conflicts and rebasing too.

There are tons of useful resources about Git [out there](https://try.github.io/).

## Opening issues

You can issues at https://github.com/Qiskit/platypus/issues/new for reporting a misfunction. Please do provide steps to reproduce and expected behaviour.

In addition issues can be opened for content-related problems such as typos or rewordings.

Core contributors classify the tasks according to its nature and prioritize them
from sprint to sprint.

## Contributing content

This section is for anyone that wants to improve the content of the Qiskit Textbook.
If you want to work on the website software, please head to the next section.

If you only want to work on content, you don't need to install everything, you only need:
- [Git](https://git-scm.com/): Version control that you'll use to copy the textbook
  repository to your computer, and submit the changes you've made back to GitHub.
  There's a free book on Git [here](https://git-scm.com/book/en/v2), and a quickstart guide
  to GitHub [here](https://docs.github.com/en/get-started/quickstart/hello-world).
- [Python](https://www.python.org/): The program that runs Python code. If you've installed
  Qiskit you should have this installed already.
- [Jupyter notebook](https://jupyter-notebook-beginner-guide.readthedocs.io/en/latest/install.html):
  This program opens and edits the source files for the textbook.
- [Node.js](https://nodejs.org/en/): This program runs Javascript code. You'll need this
  to build the website locally and see how your changes render.

With these installed, please follow the ['Getting Started' section in the README](https://github.com/Qiskit/platypus#getting-started)
to automatically install everything else you'll need.

The source for each page of the Qiskit Textbook is a [Jupyter Notebook](https://jupyter-notebook-beginner-guide.readthedocs.io/en/latest/what_is_jupyter.html).
You'll find these files in the `notebooks` directory. To create the final website,
the building software parses each notebook in the table of contents (`notebooks/toc.yaml`)
and converts it into a web page. Notebooks not in the table of contents (TOC) are
ignored, so if you add new content you'll need to add it to the TOC.

### Editing notebooks

Open a terminal and run

```
jupyter notebook
```

This should open an application in your browser window. Navigate to the notebook
you want to change and start editing.

Jupyter notebooks use a combination of Markdown, Python code snippets, and rich
outputs (e.g. HTML and images). If you're unfamiliar with Jupyter notebooks, check
out [this page](https://www.earthdatascience.org/courses/intro-to-earth-data-science/file-formats/use-text-files/format-text-with-markdown-jupyter-notebook/)
for a quick overview. The markdown also supports math via LaTeX (see a guide
[here](https://jupyterbook.org/en/stable/content/math.html)).

The Qiskit Textbook also supports some extra custom syntax to represent interactive elements. For example, the markdown below will render as an interactive quiz:

```
    q-quiz(goal="quiz1")
        .option(x) This is the correct answer
        .option This is a wrong answer
        .option This is also a wrong answer
```

You can find examples of widgets and their syntax in `notebooks/examples`.

### Viewing your changes

To see how your changes render on the website, open a terminal and run:

```
npm run build && npm start
```

When you see `Running on port 8080 in development mode.`, you can open a browser
and navigate to `https://localhost:8080/course/introduction/`, then navigate to
the page you edited.

### Content checks

As with code, this repo contains a number of checks for the textbook's content.
You can run a full test using `npm run test:nb`. You can read more about each
check in `scripts/content_checks/README.md`.

## Contributing code

### Deciding what to work on

The core team's workload and backlog in managed via [projects in qiskit.org](https://github.com/Qiskit/qiskit.org/projects)

To give our collaborators an idea of where the team needs help, we use the [contributions welcome](https://github.com/Qiskit/qiskit.org/issues?q=is%3Aissue+is%3Aopen+label%3Aeducation+label%3A%22contributions+welcome%22) label – this is appropriate for all contributors. In addition, for those who are relatively new to the open-source workflow or our codebase, feel free to view issues tagged with the [good first issue](https://github.com/Qiskit/qiskit.org/issues?q=is%3Aissue+is%3Aopen+label%3Aeducation+label%3A%22good+first+issue%22) label.


### Setup

So you decided to get your hands dirty and start working on a patch? Then you
need to know that qiskit.org follows the
[Forking Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow)
with [Feature Branches](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow).

The above means we expect you to fork the project on your own GitHub account and make your `main` branch to 
track this repository. A typical Git setup after
[forking the project](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo) is:

```sh
# After forking the repository in GitHub
git clone https://github.com/<your_username>/platypus.git
cd platypus
git remote add upstream https://github.com/Qiskit/platypus.git
git remote update upstream
git checkout main
git branch -u upstream/main
git pull
```

As a core contributor due to some access limitations between forks and the head branch we encourage you to 
[clone](https://support.atlassian.com/bitbucket-cloud/docs/clone-a-repository/) the repository 
instead of forking it.

### Assigning yourself

The very first step to working on an issue is [assigning yourself](https://docs.github.com/en/issues/tracking-your-work-with-issues/assigning-issues-and-pull-requests-to-other-github-users#assigning-an-individual-issue-or-pull-request) the issue. This gives all contributors the visibility into who is working on what.


### Working on an issue

When you are going to start working on an issue, make sure you are in your `main`
branch and that it is entirely up to date and create a new branch with a
meaningful name. The typical terminal code for this is:

```sh
git checkout main
git pull upstream main
git checkout -b issue-1234-new-header
```

Now start adding your changes and remember to commit often:

```sh
git commit
```

And include a summary and some notes or clarifications if needed:

```
Create a new header layout.

Includes a new component factoring out the header of this new page and others.
```

From time to time, you want to check if your `main` branch is still up to
date. If not, you will need to merge
(or [rebase](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase)),
then continue working:

```sh
git checkout main
git pull
git checkout issue-1234-new-header
git merge main
```

### Pull requests

Pull requests serve a double purpose:
1. Share the code with the team. So almost everybody is aware of how the code base is evolving.
2. Provide an opportunity for improving code quality.

When you think your work is done, push the branch to your repository:

```sh
git push origin issue-1234-new-header
# Start a pull request in GitHub
```

And
[create a pull request](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)
against `main` (or a feature branch).
When creating the pull request, provide a description and
[link with the issue that is being solved](https://docs.github.com/en/free-pro-team@latest/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue).

Linking the issue has the advantage of automatically closing the related issue when the pull
request is merged. Unfortunately, this does not work when merging pull requests against a feature
branch. In these occasions, remember to manually close the related pull requests after
[merging the pull request](#merging).

### Live previews

As part of our continuous integration infrastructure, every pull request opened from the head repository that passes 
the build process, receives a dedicated deployment running on [IBM Code Engine](https://cloud.ibm.com/codeengine/overview).

This allows the team to have live branch previews, making it easier to share
links and review changes as necessary. You can preview your working branch at 
`https://qiskit-org-pr-<pull-request-number>.<unique_id>.us-south.codeengine.appdomain.cloud/`.

This means that for forked repositories the pull request will not generate a live preview and that step will be skipped.

### Code review

Once you have sent a PR, the code contributors get notified, and there may be a code
review. The code review helps solving implementation, semantic and maintainability issues.

The repository also contains some automated checks such as tests and
[linting](#solving-linting-issues). For a pull request to be ready for merging it needs to
**pass automatic checks and have, at least, one positive review**.

During code reviews, there are two prominent roles: the reviewer and the contributor.
The reviewer acts as the keeper of best-practices and code quality, asking
clarifying questions, highlighting implementation errors and recommending changes.
We expect the contributor to take recommendations seriously and be willing to
implement suggested changes or take some other action instead.

Notice we don't expect the contributors to address **all** the comments, nor
the reviewer highlight **all** the issues, we hope both take some compromises to provide
as much value and quality as it fits in the estimated effort.

We don't expect discussions to happen in the pull requests. If there is a disagreement,
our recommendation is for the contributor to yield to the reviewer and for the reviewer
to suggest other alternatives.

### Merging

Once all automated checks are passing and there is a positive review, the pull request
can be merged. If you are an external contributor, expect your PR to be merged by
a core contributor.

## Code style

**Readability** is what we value most. We expect reviewers to pay special attention on readability
so at least they can understand new contributions to the codebase.

### Type annotations

Regarding type checking, we aim at being compliant with
[TypeScript strict checks](https://www.typescriptlang.org/tsconfig#strict). That means, no implicit
`any` annotations, for instance although does not enforce any particular style in typing.

The golden rule is: **declare your intentions and let type inference do the rest**. Annotate function
and method signatures, also class/object properties and module declarations, and rely on type inference
for intermediate values.

Don't do:

```ts
function max(a, b) {
  return a > b ? a : b
}
```

But instead:

```ts
function max(a: number, b: number): number {
  return a > b ? a : b
}
```

When working with pure JavaScript objects, consider declaring an interface with the methods and
properties you want, then implement a factory function returning an implementation of the interface.

Don't do:

```ts
export default {
  scale: 2,
  magnify (v) {
    return v * this.scale
  }
}
```

But instead:

```ts
interface MyType {
  scale: number
  magnify (v: number): number
}

function _factory () : MyType {
  return {
    scale: 2,
    magnify (v) {
      return v * this.scale
    }
  }
}

export default _factory()
```

## Final words

Thank you for reading until the end of the document! Abiding by these guidelines you
express your willing in collaborating and contributing in a healthy way. Thanks for
that too!

Now if you are a core contributor, perhaps you're interested in knowing more about
[our procedures in the Wiki](https://github.com/Qiskit/qiskit.org/wiki).
