import json
import nbformat
import os
import yaml

from pathlib import Path
from nbconvert.writers import FilesWriter

from . import TextbookExporter


def get_notebook_node(nb_file_path):
    """Return a NotebookNode object from the given notebook file.
    """
    try:
        notebook_node = nbformat.read(nb_file_path, nbformat.NO_CONVERT)
        return notebook_node
    except Exception as err:
        print(f'Error reading notebook: {err}')

    return None


def convert_notebook_node(nb_node, file_name, output_dir):
    """Convert notebook node
    """
    try:
        exporter = TextbookExporter()

        (body, resources) = exporter.from_notebook_node(nb_node)

        writer = FilesWriter()
        writer.build_directory = output_dir
        writer.write(
            output=body, 
            resources=resources, 
            notebook_name=file_name
        )
    except Exception as err:
        print(f'Error exporting notebook: {err}')


def append_to_glossary_yaml(nb_node, yaml_output_path):
    """Append 'gloss' metadata into 'glossary.yaml'
    """
    glossary = {}

    for cell in nb_node.cells:
        if cell.cell_type == 'markdown' and 'gloss' in cell.metadata:
            gloss_data = cell.metadata['gloss']
            glossary.update(gloss_data)

    if glossary:
        glossary_file_path = os.path.join(yaml_output_path, 'glossary.yaml')
        with open(glossary_file_path, 'a') as glossary_file:
            content = yaml.load(json.dumps(glossary), Loader=yaml.BaseLoader)
            glossary_file.write(f'\n\n{yaml.dump(content)}')


def convert_notebook_file(nb_file_path, output_dir=None, yaml_output_dir=None):
    """Convert notebook file to Mathigon markdown format
    """
    nb_path = Path(nb_file_path)

    if not nb_path.exists():
        print(f'{nb_path} not found')
        return None
    
    if not nb_path.is_file():
        print(f'{nb_path} is not a file')
        return None

    nb_path = nb_path.resolve()
    nb_node = get_notebook_node(str(nb_path))

    if nb_node:
        file_name = nb_path.stem
        output_path = output_dir if output_dir else str(nb_path.parent)
        yaml_output_path = yaml_output_dir if yaml_output_dir else output_path

        print(f'converting: {file_name} -> {output_path}')
        convert_notebook_node(nb_node, file_name, output_path)

        print(f'updating glossary -> {yaml_output_path}')
        append_to_glossary_yaml(nb_node, yaml_output_path)


def convert_notebook_directory(
    nbs_dir_path,
    output_dir=None,
    yaml_output_dir=None
):
    """Convert & combine notebook file in directory to Mathigon markdown format
    """
    nbs_path = Path(nbs_dir_path)

    if not nbs_path.exists():
        print(f'{nbs_path} not found')
        return None
    
    if not nbs_path.is_dir():
        print(f'{nbs_path} is not a directory')
        return None

    nbs_path = nbs_path.resolve()

    print(f'converting notebooks in {nbs_path}')
    for nb_file_path in nbs_path.glob('*.ipynb'):
        convert_notebook_file(
            nb_file_path,
            output_dir=output_dir,
            yaml_output_dir=yaml_output_dir
        )


def merge(md_dir, toc_path=None, output_dir=None):
    """Merge markdown files in directory into single file
    """
    md_dir_path = Path(md_dir)

    if not md_dir_path.exists():
        print(f'{md_dir_path} not found')
        return None
    
    if not md_dir_path.is_dir():
        print(f'{md_dir_path} is not a directory')
        return None

    md_dir_path = md_dir_path.resolve()
    output_path = output_dir if output_dir else str(md_dir_path)
    md_files_path = list(md_dir_path.glob('*.md'))
    merged_md_path = os.path.join(output_path, 'content.md')

    with open(merged_md_path, 'a') as out_file:
        for md_path in md_files_path:
            with open(md_path) as in_file:
                for line in in_file:
                    out_file.write(line)


def convert(
    nb_file_or_dir_path,
    output_dir='',
    yaml_output_dir=None
):
    """Convert notebook file or files in directory to Mathigon markdown
    """
    nbs_path = Path(nb_file_or_dir_path)

    if not nbs_path.exists():
        print(f'{nbs_path} not found')
        return None

    if nbs_path.is_file():
        convert_notebook_file(
            nb_file_or_dir_path,
            output_dir=output_dir,
            yaml_output_dir=yaml_output_dir
        )
    else:
        convert_notebook_directory(
            nb_file_or_dir_path,
            output_dir=output_dir,
            yaml_output_dir=yaml_output_dir
        )
