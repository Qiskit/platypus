"""This script runs 'prose linting' checks on the notebooks.
This includes spell checking, and writing best practices.
Requires Vale: https://vale.sh/docs/vale-cli/installation/
"""
import sys
import os
import shutil
import nbformat
import subprocess
import json
from pathlib import Path


NB_ROOT = './notebooks'
NB_PATHS = './scripts/content_checks/notebook_paths.txt'
TEMP_DIR = './scripts/temp/md'
STYLE_DIR = './scripts/content_checks/style'


TSTYLE = {  # Terminal styling codes
    'bold': '\033[1m',
    'faint': '\033[30m',
    'suggestion': '\033[94m',
    'warning': '\033[93m',
    'error': '\033[91m',
    'end': '\033[0m'
}


def style(style, text):
    """Style string using terminal escape codes"""
    return  f"{TSTYLE[style]}{text}{TSTYLE['end']}"


def indent(s):
    """Indent text block with vertical line margins"""
    s = s.replace('\n', '\n' + style('faint', '│ '))
    s = s[::-1].replace('│', '╵', 1)[::-1]
    return style('faint', '╷ ') + s


def lint_notebook(filepath, CI=False):
    """Perform Vale prose linting checks on
    notebook at `filepath`. If `CI` then exit
    early with code 1 on lint error."""
    print(style('bold', filepath))
    outdir = (
        Path(TEMP_DIR)
        / Path(filepath).parent.stem
        / Path(filepath).stem
    )
    extract_markdown(filepath, outdir)
    lint_markdown(outdir, CI)


def extract_markdown(filepath, outdir):
    """Extracts the markdown from the notebook
    at `filepath` and saves each cell as a separate
    file in the temp folder for Vale to lint."""
    nb = nbformat.read(filepath, as_version=4)
    if os.path.exists(outdir):
        shutil.rmtree(outdir)
    Path(outdir).mkdir(parents=True)
    for idx, cell in enumerate(nb.cells):
        if cell.cell_type == 'markdown':
            # outpath e.g.: ./scripts/temp/intro/grover-intro/0002.md
            outpath = Path(outdir) / (str(idx).rjust(4, '0') + '.md')
            with open(outpath, 'w+') as f:
                f.write(cell.source)


def lint_markdown(md_dir, CI=False):
    """Lints the markdown files in `md_dir`
    using Vale linter. If `CI`, then will exit with
    code 1 on any Vale error."""

    # Run Vale on folder
    files = os.listdir(md_dir)
    path = Path(md_dir)
    vale_result = subprocess.run(
        ['vale', path, '--output', 'JSON'],
        capture_output=True)
    vale_output = json.loads(vale_result.stdout)

    # Parse output and print nicely
    fail = False
    notebook_msg = ''
    for file, suggestions in vale_output.items():
        notebook_msg += f"cell {int(Path(file).stem)}\n"
        cell_msg = ''
        for s in suggestions:
            severity = s['Severity']
            if severity == 'error':
                fail = True
            cell_msg += style(severity, severity.capitalize())
            cell_msg += f": {s['Message']}\n"
            if s['Match'] != '':
                cell_msg += style('faint', f'"…{s["Match"]}…" ')
            cell_msg += style('faint', 
                f"@l{s['Line']};c{s['Span'][0]} ({s['Check']})")
            cell_msg += '\n'
        notebook_msg += indent(cell_msg) + '\n'
    print(indent(notebook_msg))
    if fail and CI:
        print(style('error', 'Prose linting error encountered; test failed.'))
        sys.exit(1)


if __name__ == '__main__':
    # usage: python3 nb_vale.py --CI notebook1.ipynb path/to/notebook2.ipynb
    file_names = sys.argv[1:] if len(sys.argv) > 1 else []

    CI = False
    if '--CI' in file_names:
        CI = True
        file_names.remove('--CI')

    if len(file_names) == 0:
        # no files were passed- read from text file
        with open(NB_PATHS, encoding='utf-8') as f:
            file_names = f.readlines()

    for filename in file_names:
        if not filename.strip():
            # blank line
            continue
        if filename.startswith('#'):
            print(f'Skipping: {filename}')
            continue
        elif not Path(filename).is_absolute():
            filename = f'{NB_ROOT}/{filename.strip()}.ipynb'

        lint_notebook(filename, CI)
