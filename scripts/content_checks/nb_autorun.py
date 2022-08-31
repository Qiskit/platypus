import re
import sys
import time
import nbformat
import requests
import json
from nbconvert.preprocessors import ExecutePreprocessor
from datetime import datetime
from tools import parse_args, style, indent


def timestr():
    """For reporting in terminal"""
    timestr = f"[{datetime.now().time().strftime('%H:%M')}]"
    return style('faint', timestr)


def contains_code_cells(notebook):
    for cell in notebook.cells:
        if cell.cell_type == 'code':
            return True
    return False


def format_message_terminal(msg):
    """Formats error messages nicely for the terminal"""
    outstr = style(msg['severity'], msg['name'])
    outstr += f": {msg['description']}"
    if 'code' in msg:
        outstr += "\nError occurred as result of the following code:\n"
        outstr += indent(msg['code'])
    return outstr


def make_gh_issue(filepath, messages, token, repo):
    is_err, is_warn = False, False
    body = (f"### Where does the issue happen?\n\n"
            f"https://github.com/{repo}/tree/main/{filepath}\n\n"
             "### What is the content issue?\n\n"
            f"Found {len(messages)} problem{'s'*(len(messages)>1)} while running"
             " the notebook. See full error output below.\n\n")
    for m in messages:
        if m['severity'] == 'error': is_err = True
        if m['severity'] == 'warning': is_warn = True
        body += f"---\n```\n{m['full_output']}```\n"

    body += ("### Additional information\n\n"
             "This issue was generated automatically by a script")

    title  = ("Found "
            + "error "*is_err
            + "and "*(is_err and is_warn)
            + "warning "*(is_warn)
            + f"in '{filepath.parts[-2]}/{filepath.stem}' notebook")

    issue_data = json.dumps({
                 'title': title,
                 'labels': ['bug', 'content'],
                 'assignees': ['frankharkins'],
                 'body': body
            })

    requests.post(
            url = f'https://api.github.com/repos/{repo}/issues',
            headers = {'Authorization': f'token {token}'},
            data = issue_data
            )



def run_notebook(filepath, write=True):
    execution_success = True
    messages = []  # To collect error / warning messages

    with open(filepath) as f:
        notebook = nbformat.read(f, as_version=4)

    if not contains_code_cells(notebook):
        # Avoid creating new kernel for no reason
        return True, messages

    # Execute notebook
    processor = ExecutePreprocessor(timeout=None)
    try:
        processor.preprocess(notebook,
                             {'metadata': {'path': filepath.parents[0]}})
    except Exception as err:
        err_msg = {'name': err.ename,
                   'severity': 'error',
                   'description': err.evalue,
                   'code': err.traceback.split('------------------')[1],
                   'full_output': err.traceback
                   }
        messages.append(err_msg)
        execution_success = False

    # Search output for warning messages (can't work out how to get the kernel
    # to report these)
    for cell in notebook.cells:
        if cell.cell_type != 'code':
            continue

        ignore_warning, contains_warning = False, False
        if hasattr(cell.metadata, 'tags'):
            ignore_warning = ('ignore-warning' in cell.metadata.tags)

        for output in cell.outputs:
            if hasattr(output, 'name') and output.name == 'stderr':
                contains_warning = True
                if ignore_warning:
                    continue

                warning_name = re.search(r'(?<=\s)([A-Z][a-z0-9]+)+(?=:)',
                                         output.text)[0]
                messages.append(
                    {'name': warning_name,
                     'severity': 'warning',
                     'description': re.split(warning_name,
                                            output.text,
                                            maxsplit=1)[1].strip(' :'),
                     'full_output': output.text})

        if ignore_warning and not contains_warning:
            # Clean up unused tags if warning disappears
            print(cell.metadata.tags)
            cell.metadata.tags.remove('ignore-warning')

    if execution_success and write:
        with open(filepath, 'w', encoding='utf-8') as f:
            nbformat.write(notebook, f)

    return execution_success, messages


if __name__ == '__main__':
    # usage: python nb_metadata.py --fix notebook1.ipynb path/to/notebook2.ipynb
    switches, filepaths = parse_args(sys.argv)

    write, token, repo = False, None, None
    for switch in switches:
        if switch.startswith('--token'):
            token = switch.split('=')[1]
        if switch.startswith('--repo'):
            repo = switch.split('=')[1]
        if switch == '--write':
            write = True
    if bool(token) != bool(repo):
        print("Must specify both repo and token, or neither.")
        sys.exit(1)

    log = {'t0': time.time(),
            'total_time': 0,
            'total_files': 0,
            'broken_files': 0
          }

    # Start executing notebooks
    print('\n\033[?25l', end="")  # hide cursor
    for path in filepaths:
        log['total_files'] += 1
        print('-', timestr(), path, end=' ', flush=True)

        success, messages = run_notebook(path, write)
        if success:
            print("\r" + style('success', '✔'))
        else:
            log['broken_files'] += 1
            print("\r" + style('error', '✖'))

        if messages:
            message_strings = [format_message_terminal(m) for m in messages]
            print(indent('\n'.join(message_strings)))

        if messages and token:
            # Make github issue
            make_gh_issue(path, messages, token, repo)
    print('\033[?25h', end='')  # un-hide cursor

    # Display output and exit
    log['total_time'] = time.time()-log['t0']
    print(f"Finished in {log['total_time']:.2f} seconds\n")
    if log['broken_files'] > 0:
        print(f"Found errors in {log['broken_files']}/{log['total_files']} "
               "notebooks, see output above for more info.\n")
