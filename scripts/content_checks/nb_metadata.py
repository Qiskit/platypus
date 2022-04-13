import sys
import nbformat


NB_ROOT = './notebooks'
NB_PATHS = './scripts/content_checks/notebook_paths.txt'
CLEAN_METADATA = {'kernelspec': {'display_name': 'Python 3',
  'language': 'python',
  'name': 'python3'},
  'language_info': {'codemirror_mode': {'name': 'ipython', 'version': 3},
  'file_extension': '.py',
  'mimetype': 'text/x-python',
  'name': 'python',
  'nbconvert_exporter': 'python',
  'pygments_lexer': 'ipython3',
  'version': '3.9'}}


def check_metadata(filepath, fix=False):
    notebook = nbformat.read(filepath, 4)
    if notebook.metadata == CLEAN_METADATA:
        return True
    elif fix:
        notebook.metadata = CLEAN_METADATA
        nbformat.write(notebook, filepath)
        return True
    else:
        raise ValueError(
            f'Bad metadata in {filepath}.\nRun `npm run test:nb:fix` to reset.'
        )

if __name__ == '__main__':
    fix = '--fix' in sys.argv
    with open(NB_PATHS, encoding='utf-8') as f:
        file_names = f.readlines()
    for filename in file_names:
        if not filename.strip():
            # blank line
            continue
        if filename.startswith('#'):
            print(f'Skipping: {filename}')
        else:
            #print(f'Goals check: {filename}')
            check_metadata(f'{NB_ROOT}/{filename.strip()}.ipynb', fix)
