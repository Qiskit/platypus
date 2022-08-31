import re
import sys
import time
import nbformat
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


def format_message(msg):
    """Formats error messages nicely for the terminal"""
    outstr = style(msg['severity'], msg['name'])
    outstr += f": {msg['description']}"
    if 'code' in msg:
        outstr += "\nError occurred as result of the following code:\n"
        outstr += indent(msg['code'])
    return outstr


def run_notebook(filepath, write=True):
    execution_success = True
    messages = []  # To collect error / warning messages

    with open(filepath) as f:
        notebook = nbformat.read(f, as_version=4)

    if not contains_code_cells(notebook):
        # Avoid creating new kernel for no reason
        return True, messages

    # Execute notebook
    processor = ExecutePreprocessor(timeout=None, kernel_name='python3')
    try:
        processor.preprocess(notebook,
                             {'metadata': {'path': filepath.parents[0]}})
    except Exception as err:
        err_msg = {'name': err.ename,
                   'severity': 'error',
                   'description': err.evalue,
                   'code': err.traceback.split('------------------')[1]
                   }
        messages.append(err_msg)
        execution_success = False

    # Search output for warning messages (can't work out how to get the kernel
    # to report these)
    for cell in notebook.cells:
        if hasattr(cell.metadata, 'tags'):
            if 'ignore-warning' in cell.metadata.tags:
                continue
        if cell.cell_type == 'code':
            for output in cell.outputs:
                if hasattr(output, 'name') and output.name == 'stderr':
                    warning_name = re.search(r'(?<=\s)([A-Z][a-z0-9]+)+(?=:)',
                                             output.text)[0]
                    messages.append(
                        {'name': warning_name,
                         'severity': 'warning',
                         'description': re.split(warning_name,
                                                output.text,
                                                maxsplit=1)[1].strip(' :')})

    if execution_success and write:
        with open(filepath, 'w', encoding='utf-8') as f:
            nbformat.write(notebook, f)

    return execution_success, messages


if __name__ == '__main__':
    # usage: python nb_metadata.py --fix notebook1.ipynb path/to/notebook2.ipynb
    switches, filepaths = parse_args(sys.argv)

    write = '--write' in switches

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
            messages = [format_message(m) for m in messages]
            print(indent('\n'.join(messages)))
    print('\033[?25h', end='')  # un-hide cursor

    # Display output and exit
    log['total_time'] = time.time()-log['t0']
    print(f"Finished in {log['total_time']:.2f} seconds\n")
    if log['broken_files'] > 0:
        print(f"Found errors in {log['broken_files']}/{log['total_files']} "
               "notebooks, see output above for more info.\n")
