import json
import re
import yaml

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


JS_CLICK_GOAL = """
  setTimeout(() => {{
    const {elt} = $section.$("{selector}");
    {elt}.on("click", () => {{
        qiskitScore($section, ["{id}"]);
    }});
  }}, 250);
"""

JS_VALUE_GOAL = """
  setTimeout(() => {{
    const {elt} = $section.$("{selector}");
    {elt}.on("change", () => {{
        if ({elt}.value === "{value}") {{
            qiskitScore($section, ["{id}"]);
        }} else if ("{value}" === "checked" && {elt}.checked) {{
            qiskitScore($section, ["{id}"]);
        }}
    }});
  }}, 250);
"""


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


def handle_cell_glossary(cell, resources={}):
    """Convert 'gloss' dictionary to yaml (string)
    """
    if 'gloss' in cell.metadata and cell.metadata['gloss']:
        glossary = cell.metadata['gloss']
        content = yaml.load(json.dumps(glossary), Loader=yaml.BaseLoader)

        if 'textbook' not in resources:
            resources['textbook'] = {}
        if 'glossary' not in resources['textbook']:
            resources['textbook']['glossary'] = ''

        resources['textbook']['glossary'] += f'{yaml.dump(content)}\n'

    return resources


def handle_cell_goals(id, cell, resources={}):
    """Convert 'goals' dictionary to javascript function (string)
    """
    goals = set([])

    if 'goals' in cell.metadata and cell.metadata['goals']:
        goals_meta = cell.metadata['goals']
        actions = [f'export function {id}($section: Step) {{ ']

        for count, goal in enumerate(goals_meta):
            if 'click' in goal:
                actions.append(JS_CLICK_GOAL.format(
                    elt='elt' + str(count),
                    selector=goal['selector'],
                    id=goal['id']
                ))
                goals.add(goal['id'])
            if 'value' in goal:
                actions.append(JS_VALUE_GOAL.format(
                    elt='elt'+ str(count),
                    selector=goal['selector'],
                    id=goal['id'],
                    value=goal['value']
                ))
                goals.add(goal['id'])

        actions.append(' }\n')

        if 'textbook' not in resources:
            resources['textbook'] = {}
        if 'functions' not in resources['textbook']:
            resources['textbook']['functions'] = ''

        resources['textbook']['functions'] += '\n'.join(actions)

    return list(goals), resources


class TextbookExporter(Exporter):
    output_mimetype = 'text/markdown'


    def _file_extension_default(self):
        return '.md'


    def from_notebook_node(self, nb, resources=None, **kw):
        nb_copy, resources = super().from_notebook_node(nb, resources)

        markdown_lines = []
        prefix = ''

        if 'textbook' not in resources:
            resources['textbook'] = {}
        if 'id' in resources['textbook']:
            id = resources['textbook']['id']
            prefix = re.compile('[^a-zA-Z]').sub('', id).lower()

        for count, cell in enumerate(nb_copy.cells):
            id = prefix + str(count)
            if cell.cell_type == 'markdown':
                resources = handle_cell_glossary(cell, resources)
                goals, resources = handle_cell_goals(id, cell, resources)

                if goals:
                    markdown_lines.append(f'\n---\n> id: {id}')
                    markdown_lines.append(f'\n> goals: {" ".join(goals)}\n\n')

                markdown_lines.append(handle_markdown_cell(cell))

                if goals:
                    markdown_lines.append(f'\n\n---\n')
            elif cell.cell_type == 'code' and cell.source.strip():
                markdown_lines.append(handle_code_cell(cell))

        markdown_lines.append('\n')

        return (''.join(markdown_lines), resources)
