# This script checks that each quiz in NB_PATHS has a unique goal name
from typing import List


NB_ROOT = './notebooks'
NB_PATHS = './scripts/content_checks/notebook_paths.txt'


def check_file(filename: str, goal_names: List[str]) -> None:
    with open(filename, encoding='utf-8') as f:
        content: str = f.read()
    for line in content.split('\n'):
        if '(goal=\\"' in line:
            name = line.split('"')[2].strip('\\')
            if name in goal_names:
                raise ValueError(
                    f'Found multiple quizzes with goal name "{name}"'
                )
            else:
                goal_names.append(name)


if __name__ == '__main__':
    goal_names: List[str] = []
    with open(NB_PATHS, encoding='utf-8') as f:
        file_names: List[str] = f.readlines()
    for filename in file_names:
        if not filename.strip():
            # blank line
            continue
        if filename.startswith('#'):
            print(f'Skipping: {filename}')
            pass
        else:
            #print(f'Goals check: {filename}')
            check_file(f'{NB_ROOT}/{filename.strip()}.ipynb', goal_names)
