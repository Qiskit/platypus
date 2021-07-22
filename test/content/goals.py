
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
    with open('test/content/notebook_paths.txt') as f:
        f = f.readlines()
    for filename in f:
        check_file(f'notebooks/{filename.strip()}.ipynb', goal_names)
