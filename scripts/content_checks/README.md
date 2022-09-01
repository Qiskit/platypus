# Automatic content checks

These scripts automatically check (and sometimes fix) common problems in
the notebooks that hold the textbook content.

## Commands

- `npm run test:nb`
  Runs all tests, returning pass/fail. This is what GitHub CI runs.

- `npm run test:nb:meta`
  This runs all checks _except_ pylint. Since the pylint checks can be
  slow, this is useful if you haven't modified any code examples.

- `npm run test:nb:fix`
  This will attempt to fix any accidental changes to notebook metadata.

- `npm run test:nb:pylint`
  This runs _only_ pylint checks.

- `npm run test:nb:vale`
  Runs _only_ Vale 'prose linter' checks (including spellcheck).

## Files in this folder

- `notebook_paths.txt`: Notebooks to run tests on.
  At the time of writing, not all notebooks pass the tests, and some will
  need a lot of work to get them to pass. For this reason, we only run
  checks on certain notebooks. If a notebook's path is not in this file,
  it will be ignored by `nb_lint` and `nb_vale`.

- `nb_lint.sh`: Runs pylint on notebook code cells.
  The code examples in the textbook should meet the same standards as
  code in the Qiskit codebase. This script runs a pass/fail pylint check
  on each notebook.

  Since the code examples are not a code base, some rules don't apply,
  and we've tried to remove those where possible. You can also add a `
  pylint: disable=...` comment to avoid specific warnings (will be hidden
  on the site), but you should use this sparingly.

- `blips.py`: Check for important but easily fixable problems.
  Each exercise should have a unique name, and we sometimes forget to update
  names when copying and pasting quizzes. This check fails if any quizzes
  share names.

  Sometimes maintainers use the internal provider (`ibm-q-internal`) when
  updating cell outputs. This should be reset to the `ibm-q` provider before
  pushing. This check fails if it finds `ibm-q-internal` anywhere in the
  notebooks.

- `nb_metadata.py`: Checks (and resets) notebook metadata.
  The notebook metadata is largely useless and just tells you the
  environment of the last person to open the notebook. This makes commits
  messy, so all notebooks in the repo should have the same bland metadata.
  This script checks all metadata is the same, and you can pass `--fix`
  to overwrite the metadata. It's a good idea to add this as a commit
  hook.

- `nb_svg.py`: Clean SVGs in notebooks.
  We prefer notebook output images to be SVG as they produce clearer
  diagrams with smaller file sizes. The downside is that they produce
  large git diffs (lots of line changes), so we require that each SVG is
  optimized to a single line. This script checks the inline SVGs have been
  optimized, and can optimize any multi-line SVGs when run with the `--fix`
  argument.

- `nb_vale.py`: Run Vale linter checks on notebooks.
  [Vale](https://vale.sh/) is a 'prose linter', i.e. a program that checks
  for common problems in writing, including spelling errors, wordiness, and
  other writing malpractices. Since Vale (or any other prose linter) can't read
  notebooks, we use this script to pull the markdown from the notebooks to a
  temp folder, then run Vale on those files.

- `missing_nb_check.sh`: Compares files in old textbook repo to this repo.
  This script checks for notebooks added to `qiskit-community/qiskit
  textbook` that are not in `Qiskit/platypus` and makes a GitHub issue
  for it.

- `nb_autorun.py`: Script to run all the notebooks. Will report any errors, and
  will replace outputs if you pass `--write` option. This script can also
  automatically create GitHub issues for any errors it finds if you pass
  `--repo=Qiskit/platypus`, and `--token=<your GitHub access token>`.

- `tools.py`: Shared logic (e.g. argument parsing) used by scripts in this
  folder.
