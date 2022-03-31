import sys
import nbformat
from joblib import Parallel, delayed

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


def replace_metadata(string):
    notebook = nbformat.reads(string, 4)
    if notebook.metadata != CLEAN_METADATA:
        notebook.metadata = CLEAN_METADATA
        string = nbformat.writes(notebook)
    return string

if __name__ == "__main__":
    notebook_string = sys.stdin.read()
    print(
            replace_metadata(notebook_string)
    )
