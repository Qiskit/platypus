import os, sys, re

HOOK_PATH = './.git/hooks/pre-commit'

SCRIPT = """

npm run --silent test:nb:meta || {
  echo
  echo "Notebook metadata / images are not optimized."
  echo "Run 'npm run test:nb:fix' to fix, or use"
  echo "'--no-verify' to ignore pre-commit hooks."
  exit 1
}

"""

if __name__ == '__main__':
    if not os.path.isfile(HOOK_PATH):
            pre_comments = '#!/bin/sh'
            old_hook = ''
    else:
        with open(HOOK_PATH, 'r') as file:
            contents = file.read()
            if 'test:nb:meta' in contents:
                print('pre-commit hook already set up.')
                sys.exit(0)
            pre_comments, old_hook = re.split(r'\n *[^#]', contents, 1)

    new_hook = pre_comments + SCRIPT + old_hook
    with open(HOOK_PATH, 'w+') as file:
        file.write(new_hook)
