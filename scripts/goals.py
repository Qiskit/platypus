
NB_ROOT = './notebooks'
NB_PATHS = './scripts/notebook_paths.txt'


def check_file(filename, goal_names):
    with open(filename) as f:
        f = f.read()
    for line in f.split('\n'):
        if '(goal=\\"' in line:
            name = line.split('"')[2].strip('\\')
            if name in goal_names:
                raise ValueError(f'Found multiple quizzes with goal name "{name}"')
            else:
                goal_names.append(name)


if __name__ == '__main__':
    goal_names = []
    with open(NB_PATHS) as f:
        f = f.readlines()
    for filename in f:
        if not filename.strip():
            # blank line
            continue
        if filename.startswith('#'):
            print(f'Skipping: {filename}')
        else:
            print(f'Goals check: {filename}')
            check_file(f'{NB_ROOT}/{filename.strip()}.ipynb', goal_names)
