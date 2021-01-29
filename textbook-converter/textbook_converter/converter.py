import json
import nbformat
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

    return None


def append_to_glossary_yaml(nb_node, yaml_output_path):
    """Append 'gloss' metadata into 'glossary.yaml'
    """
    glossary = {}

    for cell in nb_node.cells:
        if cell.cell_type == 'markdown' and 'gloss' in cell.metadata:
            gloss_data = cell.metadata['gloss']
            glossary.update(gloss_data)

    if glossary:
        with open(f'{yaml_output_path}/glossary.yaml', 'a') as f:
            f.write('\n' + yaml.dump(yaml.load(json.dumps(glossary), Loader=yaml.BaseLoader)))


def convert_notebook(nb_file_path, output_dir='', output_file_name=None, yaml_output_dir=None):
    """Convert notebook to Mathigon markdown format
    """
    nb_path = Path(nb_file_path)

    if not nb_path.exists():
        print(f'File note found: {nb_path}')
        return None

    nb_path = nb_path.resolve()
    nb_node = get_notebook_node(str(nb_path))

    if nb_node:
        file_name = output_file_name if output_file_name else nb_path.stem
        output_path = output_dir if output_dir else str(nb_path.parent)
        yaml_output_path = yaml_output_dir if yaml_output_dir else output_path

        print(f'converting {file_name} -> {output_path}')
        convert_notebook_node(nb_node, file_name, output_path)

        print(f'updating glossary -> {yaml_output_path}')
        append_to_glossary_yaml(nb_node, yaml_output_path)

    return None
