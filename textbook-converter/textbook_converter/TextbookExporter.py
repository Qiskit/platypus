import re

from nbconvert.exporters import Exporter


HERO_IMAGE_START = '![hero:'
hero_regex = re.compile(r'^!\[hero:.*]\((.*)\)')

VUE_COMPONENT_START = '![vue:'
vue_regex = re.compile(r'^!\[vue:(.*)]\(.*\)')

IMAGE_START = '!['
img_regex = re.compile(r'^!\[.*]\((.*)\)')

HEADING_START = '#'

COMMENT_START = '<!--'
comment_regex = re.compile(r'^<!--\s+(:::.*)\s+-->')


def handle_block_comment(comment_syntax):
    """Convert syntax from:

        <!-- ::: block content -->

        to this:

        ::: block content
    """
    match = comment_regex.search(comment_syntax.lstrip())
    if match is not None:
        return match.group(1)
    else:
        return comment_syntax
    pass


def handle_vue_component(vue_component_syntax):
    """Convert syntax from this:

        ![vue:some-component]()

        to this (the indentation is required):

            div(data-vue-mount)
                some-component

    """
    match = vue_regex.search(vue_component_syntax.lstrip())
    if match is not None:
        return f'''
    div(data-vue-mount)
        {match.group(1)}
        '''
    else:
        return vue_component_syntax


def handle_images(image_syntax):
    """Convert syntax from this:

        ![alt text](path/image)

        to this (the indentation is required):

            figure: x-img(src="path/image")

    """
    match = img_regex.search(image_syntax.lstrip())
    if match is not None:
        return f'''
    figure: x-img(src="{match.group(1)}")
        '''
    else:
        return image_syntax


def handle_hero_image(hero_image_syntax):
    """Convert syntax from this:

        ![hero:alt text](path/image)

        to this:

        > hero: path/image
    """
    match = hero_regex.search(hero_image_syntax.lstrip())
    if match is not None:
        return f'> hero: {match.group(1)}'
    else:
        return hero_image_syntax


def handle_heading(heading_syntax):
    """Increase heading level
    """
    return f'#{heading_syntax}\n'


def handle_markdown_cell(cell):
    """Reformat code markdown
    """
    markdown_lines = []
    lines = cell.source.splitlines()

    for line in lines:
        if line.lstrip().startswith(COMMENT_START):
            markdown_lines.append(handle_block_comment(line))
        elif line.lstrip().startswith(HERO_IMAGE_START):
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


class TextbookExporter(Exporter):
    output_mimetype = 'text/markdown'


    def _file_extension_default(self):
        return '.md'


    def from_notebook_node(self, nb, resources=None, **kw):
        nb_copy, resources = super().from_notebook_node(nb, resources)

        markdown_lines = []

        for cell in nb_copy.cells:
            if cell.cell_type == 'markdown':
                markdown_lines.append(handle_markdown_cell(cell))
            elif cell.cell_type == 'code' and cell.source.strip():
                markdown_lines.append(handle_code_cell(cell))

        markdown_lines.append('\n')

        return (''.join(markdown_lines), resources)
