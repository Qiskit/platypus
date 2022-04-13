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

## Files in this folder

- `notebook_paths.txt`: Notebooks to run tests on.
  At the time of writing, not all notebooks pass the tests, and some will
  need a lot of work to get them to pass. For this reason, we only run
  checks on certain notebooks. If a notebook's path is not in this file,
  it will be ignored.

- `nb_lint.sh`: Runs pylint on notebook code cells.
  The code examples in the textbook should meet the same standards as
  code in the Qiskit codebase. This script runs a pass/fail pylint check
  on each notebook.

  Since the code examples are not a code base, some rules don't apply,
  and we've tried to remove those where possible. You can also add a `
  pylint: disable=...` comment to avoid specific warnings (will be hidden
  on the site), but you should use this sparingly.

- `goals.py`: Check each exercise has a unique goal.
  Each exercise should have a unique name, and we sometimes forget to update
  names when copying and pasting quizzes. This check fails if any quizzes
  share names.

- `nb_metadata.py`: Checks (and resets) notebook metadata.
  The notebook metadata is largely useless and just tells you the
  environment of the last person to open the notebook. This makes commits
  messy, so all notebooks in the repo should have the same bland metadata.
  This script checks all metadata is the same, and you can pass `--fix`
  to overwrite the metadata. It's a good idea to add this as a commit
  hook.

- `missing_nb_check.sh`: Compares files in old textbook repo to this repo.
  This script checks for notebooks added to `qiskit-community/qiskit
  textbook` that are not in `Qiskit/platypus` and makes a GitHub issue
  for it.
