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
    nb_path = Path(nb_file_path).resolve()

    if not nb_path.exists():
        print(f'{nb_path} not found')
        return None
    
    if not nb_path.is_file():
        print(f'{nb_path} is not a file')
        return None

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
    nbs_path = Path(nbs_dir_path).resolve()

    if not nbs_path.exists():
        print(f'{nbs_path} not found')
        return None
    
    if not nbs_path.is_dir():
        print(f'{nbs_path} is not a directory')
        return None

    print(f'converting notebooks in {nbs_path}')
    for nb_file_path in nbs_path.glob('*.ipynb'):
        convert_notebook_file(
            nb_file_path,
            output_dir=output_dir,
            yaml_output_dir=yaml_output_dir
        )


def get_order_from_toc(toc_file_path, md_dir_path):
    """Return the chapter title and sections (in order) as defined in toc yaml
    """
    toc_path = Path(toc_file_path).resolve()

    if not toc_path.is_file():
        return None

    chapters = None
    with open(toc_path) as file:
        chapters = yaml.load(file, Loader=yaml.BaseLoader)

    chapter = next((ch for ch in chapters if md_dir_path.endswith(ch['url'])), [])

    def get_section_url(s):
        url =  s['url'].replace(chapter['url'], '')
        return url[1:] if url.startswith('/') else url

    return chapter['title'], list(map(get_section_url, chapter['sections']))


def merge(md_dir, toc_file_path=None, output_dir=None):
    """Merge markdown files in directory into single file
    """
    md_dir_path = Path(md_dir).resolve()

    if not md_dir_path.exists():
        print(f'{md_dir_path} not found')
        return None
    
    if not md_dir_path.is_dir():
        print(f'{md_dir_path} is not a directory')
        return None

    merged_file_name = 'content.md'

    output_path = output_dir if output_dir else str(md_dir_path)
    merged_md_path = os.path.join(output_path, merged_file_name)

    # Assumes section urls in toc corresponds to nb/md file names
    title, sections = get_order_from_toc(toc_file_path, str(md_dir_path))
    if sections:
        md_files_path = [f'{os.path.join(str(md_dir_path), x)}.md' for x in sections if x != merged_file_name]
    else:
        md_files_path = [x for x in md_dir_path.glob('*.md') if x.name != merged_file_name]

    with open(merged_md_path, 'w') as out_file:
        if title and sections:
            out_file.write(f'# {title}\n\n')
        for count, md_path in enumerate(md_files_path):
            if count > 0:
                out_file.write(f'\n\n---\n')
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
