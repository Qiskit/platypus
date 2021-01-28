import os
import os.path

import json
import re
import yaml

from nbconvert.exporters import Exporter


HERO_IMAGE_START = '![hero:'
VUE_COMPONENT_START = '![vue:'
IMAGE_START = '!['
HEADING_START = '#'


def handle_vue_component(vue_component_syntax):
    """Convert syntax from this:

        ![vue:some-component]()

        to this:

            div(data-vue-mount)
                some-component

    """
    return ''.join([
        '\n',
        '    div(data-vue-mount)',
        '\n',
        '         ',
        re.search(r':.*]', vue_component_syntax).group()[1:-1],
        '\n'
    ])


def handle_images(image_syntax):
    """Convert syntax from this:

        ![alt text](path/image)

        to this:

            figure: x-img(src="path/image")

    """
    return ''.join([
        '\n',
        '    figure: x-img(src="',
        re.search(r'\(.*\)', image_syntax).group()[1:-1],
        '")'
        '\n'
    ])


def handle_hero_image(hero_image_syntax):
    """Convert syntax from this:

        ![hero:alt text](path/image)

        to this:

        > hero: path/image
    """
    return ''.join([
        '> hero: ', re.search(r'\(.*\)', hero_image_syntax).group()[1:-1]
    ])


def handle_heading(heading_syntax):
    """Increase heading level by one
    """
    return ''.join([
        '#', heading_syntax,
        '\n'
    ])


def handle_markdown_cell(cell):
    """Reformat code markdown
    """
    markdown_lines = []
    lines = cell.source.splitlines()

    for line in lines:
        if line.lstrip().startswith(HERO_IMAGE_START):
            markdown_lines.append(handle_hero_image(line))
        elif line.lstrip().startswith(VUE_COMPONENT_START): 
            markdown_lines.append(handle_vue_component(line))
        elif line.lstrip().startswith(IMAGE_START):
            markdown_lines.append(handle_images(line))

        elif line.lstrip().startswith(HEADING_START):
            markdown_lines.append(handle_heading(line))
        else: 
            markdown_lines.append(line.replace('$$', '$'))
            markdown_lines.append('\n')

    return ''.join(markdown_lines)


def handle_code_cell(cell):
    """Prepend code with:

            pre(data-executable="true" data-language="python").

        and indent all lines
    """
    formatted_source = cell.source.replace('\n', '\n      ').replace('<', ' < ')

    return ''.join([
        '\n    pre(data-executable="true" data-language="python").\n      ',
        formatted_source,
        '\n\n'
    ])


def append_to_yaml(content, yaml_path):
    """Append dictionary content to yaml file (create if doesn't exist)
    """
    if len(content):
        with open(yaml_path, 'a') as f:
            f.write('\n' + yaml.dump(yaml.load(json.dumps(content), Loader=yaml.BaseLoader)))


class TextbookExporter(Exporter):
    output_mimetype = 'text/markdown'


    def _file_extension_default(self):
        return '.md'


    def from_notebook_node(self, nb, resources=None, **kw):
        nb_copy, resources = super().from_notebook_node(nb, resources)

        markdown_lines = []
        glossary = {}

        for cell in nb_copy.cells:
            if cell.cell_type == 'markdown':
                markdown_lines.append(handle_markdown_cell(cell))
                markdown_lines.append('\n')

                if 'gloss' in cell.metadata:
                    gloss_data = cell.metadata['gloss']
                    glossary = { **glossary, **gloss_data }

            elif cell.cell_type == 'code' and cell.source.strip():
                markdown_lines.append(handle_code_cell(cell))

        markdown_lines.append('\n')

        yaml_path = kw['yaml_output_dir'] if 'yaml_output_dir' in kw else None
        if not yaml_path:
            yaml_path = resources["metadata"]["path"]

        append_to_yaml(glossary, f'{yaml_path}/glossary.yaml')

        return (''.join(markdown_lines), resources)
