import json
import nbformat
import os
import re
import shutil
import yaml

from pathlib import Path
from nbconvert.writers import FilesWriter

from . import TextbookExporter


figure_regex = re.compile(r'x-img\(src="(.*)"\)')


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
        resources = {
            'textbook': {
                'id': file_name
            }
        }

        if 'textbook' in nb_node['metadata']:
            resources['textbook'] = { **resources['textbook'], **nb_node['metadata']['textbook'] }

        (body, resources) = exporter.from_notebook_node(nb_node, resources=resources)

        writer = FilesWriter()
        writer.build_directory = output_dir
        writer.write(
            output=body, 
            resources=resources, 
            notebook_name=file_name
        )

        return (body, resources)
    except Exception as err:
        print(f'Error exporting notebook: {err}')
        return None, None


def append_to_glossary_yaml(resources, yaml_output_path):
    """Append 'gloss' metadata into 'glossary.yaml'
    """
    if 'textbook' in resources and 'glossary' in resources['textbook']:
        glossary_file_path = os.path.join(yaml_output_path, 'glossary.yaml')

        new_glossary = resources["textbook"]["glossary"]
        existing_glossary = yml_to_dict(glossary_file_path) or {}
        updated_glossary = { **existing_glossary, **new_glossary }

        content = yaml.load(json.dumps(updated_glossary), Loader=yaml.BaseLoader)
        with open(glossary_file_path, 'w') as glossary_file:
            glossary_file.write(f'{yaml.dump(content)}')


def append_to_notations_yaml(resources, yaml_output_path):
    """Create and append to 'notations.yaml'
    """
    if 'textbook' in resources and 'formulas' in resources['textbook']:
        formulas_file_path = os.path.join(yaml_output_path, 'notations.yaml')

        new_formulas = resources["textbook"]["formulas"]
        existing_formulas = yml_to_dict(formulas_file_path) or {}
        updated_formulas = { **existing_formulas, **new_formulas }

        content = yaml.load(json.dumps(updated_formulas), Loader=yaml.BaseLoader)
        with open(formulas_file_path, 'w') as formulas_file:
            formulas_file.write(f'{yaml.dump(content)}')


def append_to_styles(nb_node, output_path):
    """Create 'styles.less'
    """
    styles_file_path = os.path.join(output_path, 'styles.less')
    styles_path = Path(styles_file_path).resolve()

    if not styles_path.exists():
        with open(styles_path, 'w') as styles_file:
            styles_file.write('\n@import "../shared/shared";\n')


def append_to_ts(resources, source_path, output_path):
    """Create and append to 'functions.ts'
    """
    ts_file_path = os.path.join(output_path, 'functions.ts')
    ts_path = Path(ts_file_path).resolve()

    if not ts_path.exists():
        src_ts_file_path = Path(os.path.join(source_path, 'functions.ts')).resolve()
        if not src_ts_file_path.exists():
            with open(ts_path, 'w') as ts_file:
                ts_file.write('import * as shared from "../shared/shared";\n')
        else:
            shutil.copy(str(src_ts_file_path), str(ts_path))

    if 'textbook' in resources and 'functions' in resources['textbook']:
        with open(ts_path, 'a') as ts_file:
            ts_file.write(f'\n\n{resources["textbook"]["functions"]}')


def append_to_index(resources, output_path):
    """Create and append to 'index.yaml'
    """
    if 'textbook' in resources and 'index' in resources['textbook']:
        index_file_path = os.path.join(output_path, 'index.yaml')

        new_index = resources["textbook"]["index"]
        existing_index = yml_to_dict(index_file_path) or {}
        updated_index = { **existing_index, **new_index }

        content = yaml.load(json.dumps(updated_index), Loader=yaml.BaseLoader)
        with open(index_file_path, 'w') as index_file:
            index_file.write(f'{yaml.dump(content)}')


def convert_notebook_file(nb_file_path, output_dir=None, shared_dir=None):
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
        shared_path = shared_dir if shared_dir else os.path.join(output_path, 'shared')

        if not os.path.exists(shared_path):
            os.makedirs(shared_path, exist_ok=True)

        print('converting:', file_name)
        print('output path:', output_path)
        print('shared path:', shared_path)

        (body, resources) = convert_notebook_node(nb_node, file_name, output_path)

        if body:
            print('updating glossary')
            append_to_glossary_yaml(resources, shared_path)

            print('updating notations')
            append_to_notations_yaml(resources, shared_path)

            # print('updating styles.less')
            # append_to_styles(nb_node, output_path)

            print('updating functions')
            append_to_ts(resources, str(nb_path.parent), output_path)

            print('updating index')
            append_to_index(resources, output_path)


def convert_notebook_directory(
    nbs_dir_path,
    output_dir=None,
    shared_dir=None
):
    """Convert & combine notebook file in directory to Mathigon format
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
            shared_dir=shared_dir
        )


def yml_to_dict(yml_file_path):
    """Return the yaml file content as a dictionary
    """
    yml_path = Path(yml_file_path).resolve()

    if not yml_path.is_file():
        return None

    yml_dict = None
    with open(yml_path) as file:
        yml_dict = yaml.load(file, Loader=yaml.BaseLoader)

    return yml_dict


def update_image_path(line, source_path):
    """Update figure image src (if referenced) in line using source
    """
    match = figure_regex.search(line)
    if match is not None:
        figure_path = match.group(1)
        return line.replace(figure_path, f'/content/{source_path}/{figure_path}')
    else:
        return line


def get_order_from_toc(toc_file_path, md_dir_path):
    """Return the chapter title and sections (in order) as defined in toc yaml
    """
    chapters = yml_to_dict(toc_file_path)

    chapter = next((ch for ch in chapters if md_dir_path.endswith(ch['url'])), [])

    def get_section_url(s):
        return s['url'][1:] if s['url'].startswith('/') else s['url']

    return chapter['title'], list(map(get_section_url, chapter['sections']))


def merge(md_dir, toc_file_path, output_dir=None):
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
        md_files_path = [f'{os.path.join(str(md_dir_path), x.split("/")[-1])}.md' for x in sections if x != merged_file_name]
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
                    if sections:
                        line = update_image_path(line, sections[count].split('/')[0])
                    out_file.write(line)


def convert(
    nb_file_or_dir_path,
    output_dir='',
    shared_dir='shared',
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
            shared_dir=shared_dir
        )
    else:
        convert_notebook_directory(
            nb_file_or_dir_path,
            output_dir=output_dir,
            shared_dir=shared_dir
        )
