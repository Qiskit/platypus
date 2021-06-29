import re

from nbconvert.exporters import Exporter


HERO_IMAGE_START = '![hero:'
hero_regex = re.compile(r'^!\[hero:.*]\((.*)\)')

VUE_COMPONENT_START = '![vue:'
vue_regex = re.compile(r'^!\[vue:(.*)]\(.*\)')

IMAGE_START = '!['
markdown_img_regex = re.compile(r'^!\[.*]\((.*)\)')
html_img_regex = re.compile(r'<img(.+?)src="(.+?)"(.*?)/?>')
mathigon_ximg_regex = re.compile(r'x-img\(src="(.*)"\)')

HEADING_START = '#'
tag_id_regex = re.compile(r'(<.*\sid=["\'])(.*)(["\'])')

COMMENT_START = '<!--'
comment_regex = re.compile(r'^<!--\s+(:::.*)\s+-->')

blank_regex = re.compile(r'\[\[(.+?)]]')


JS_CLICK_GOAL = """
    const {elt} = $section.$("{selector}");
    if ({elt}) {{
      {elt}.on("click", () => {{
        $section.score("{id}");
      }});
    }}
"""

JS_VALUE_GOAL = """
    const {elt} = $section.$("{selector}");
    if ({elt}) {{
      {elt}.on("change keyup input paste", (e) => {{
        if ({elt}.value === "{value}" || ("{value}" === "checked" && {elt}.checked)) {{
          e.preventDefault();
          $section.score("{id}");
        }}
      }});
    }}
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
    {match.group(1)}
        '''
    else:
        return vue_component_syntax


def get_attachment_data(image_source, cell=None):
    """Returns the data URI for the given image attachment
    """
    if cell and image_source.startswith('attachment:'):
        img_data = cell['attachments'][image_source[len('attachment:'):]] or []
        for x in img_data.keys():
            if x.startswith('image/'):
                img_data = f'data:{x};base64,{img_data[x]}'
                break
        return img_data if len(img_data) else image_source
    return image_source


def handle_attachments(line, cell):
    """Convert syntax from this:

        <img src="attachment:file.png">

        to this:

         <img src="data:image/png;base64,ajdfjaclencQWInak...">

    """
    match = html_img_regex.search(line)
    if match is not None:
        img_src = match.group(2)
        print(img_src)
        img_data = get_attachment_data(img_src, cell)
        return line.replace(img_src, img_data)
    else:
        return line


def handle_images(line, cell):
    """Convert syntax from this:

        ![alt text](path/image)

        to this (the indentation is required):

            figure: x-img(src="path/image")

    """
    match = markdown_img_regex.search(line.lstrip())
    if match is not None:
        return f'''
    figure: x-img(src="{get_attachment_data(match.group(1), cell)}")
        '''
    else:
        return line


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


def handle_heading(heading_syntax, in_block, suffix):
    """Increase header level and compute level, title, and id
    """
    header, title = heading_syntax.split(' ', 1)
    level = header.count('#')
    if in_block:
        return None, None, title, f'#{heading_syntax}\n'
    else:
        match = tag_id_regex.search(heading_syntax)
        if match is None:
            id = re.sub(r"\s", "-", title.strip().lower())
            id = re.sub(r"[^\w-]", "", id) + (suffix if level > 1 else "")
            if level == 1:
                # Mathigon requires all sections to start with `##`
                text = f'#{heading_syntax}\n'
            else:
                text = f'<h{level}>\n{title} <a id="{id}"></a>\n</h{level}>\n'
            return id, level, title.strip(), text
        else:
            title = heading_syntax[0:match.start()].split(' ', 1)[-1].strip()
            id = match.group(2)
            if level == 1:
                # Mathigon requires all sections to start with `##`
                text = f'#{heading_syntax}\n'
            else:
                text = f'<h{level}>\n{heading_syntax[level:]}\n</h{level}>\n'
            return id, level, title, text


def handle_markdown_cell(cell, resources, cell_number):
    """Reformat code markdown
    """
    markdown_lines = []
    lines = cell.source.splitlines()
    latex = False
    in_block = False
    headings = []

    for count, line in enumerate(lines):
        if latex:
            if line.rstrip().endswith('$$'):
                l = line.replace('$$', '')
                markdown_lines.append(f'{l}\n' if len(l) else l)
                markdown_lines.append('```\n')
                latex = False
            else:
                markdown_lines.append(line)
                markdown_lines.append('\n')
                latex = True
            continue
        elif line.lstrip().startswith('$$'):
            markdown_lines.append('```latex\n')
            l = line.replace('$$', '', 1)
            if l.rstrip().endswith('$$'):
                l = l.replace('$$', '')
                markdown_lines.append(f'{l}\n' if len(l) else l)
                markdown_lines.append('```\n')
                latex = False
            else:
                markdown_lines.append(f'{l}\n' if len(l) else l)
                latex = True
            continue

        line = handle_attachments(line, cell)

        if line.lstrip().startswith(COMMENT_START):
            l = handle_block_comment(line)
            if l.strip().endswith(':::'):
                in_block = False
            elif l.strip().startswith(':::'):
                in_block = True
            markdown_lines.append(l)
        elif line.lstrip().startswith(HERO_IMAGE_START):
            markdown_lines.append(handle_hero_image(line))
        elif line.lstrip().startswith(VUE_COMPONENT_START): 
            markdown_lines.append(handle_vue_component(line))
        elif line.lstrip().startswith(IMAGE_START):
            markdown_lines.append(handle_images(line, cell))

        elif line.lstrip().startswith(HEADING_START):
            id, level, title, heading_text = handle_heading(
                line, in_block, f'-{cell_number}-{count}'
            )
            if not in_block:
                headings.append((id, level, title))
            markdown_lines.append(heading_text)
        else:
            markdown_lines.append(line)#.replace('$$', '$').replace('\\', '\\\\'))
            markdown_lines.append('\n')

    markdown_lines.append('\n')
    updated_lines = ''.join(markdown_lines)
    return updated_lines, resources, headings


def handle_code_cell_output(cell_output):
    if 'data' in cell_output:
        for k,v in cell_output['data'].items():
            if 'image/svg+xml' in k:
                return ''.join(cell_output['data']['image/svg+xml'])
            elif 'image/' in k:
                return f'<img src="data:{k};base64,{v}"/>'
        if 'text/html' in cell_output['data']:
            return ''.join(cell_output['data']['text/html'])
        elif 'text/plain' in cell_output['data']:
            return '<pre>' + ''.join(cell_output['data']['text/plain']) + '</pre>'
    elif 'text' in cell_output:
        return '<pre>' + ''.join(cell_output['text']) + '</pre>'
    
    return None


def handle_code_cell(cell, resources):
    """Prepend code with:

            pre(data-executable="true" data-language="python").

        and indent all lines. Include cell output if configured.
    """
    formatted_source = cell.source.replace('\n', '\n      ').replace('<', ' < ')

    code_lines = [
        '\n    pre(data-executable="true" data-language="python").\n      ',
        formatted_source,
        '\n\n'
    ]

    if 'textbook' not in resources:
        resources['textbook'] = {}

    include_output = cell.metadata['include_output'] if 'include_output' in cell.metadata else None
    if include_output is None and 'include_output' in resources['textbook']:
        include_output = resources['textbook']['include_output']

    if include_output is not False:
        for cell_output in cell.outputs:
            output = handle_code_cell_output(cell_output)
            if output is not None:
                output = '    ' + output.replace('\n', '\n      ').replace('{', '\\{')
                code_lines.append(f'\n    div(data-executable-output="true").\n    {output}\n\n')

    joined_lines = ''.join(code_lines)
    return joined_lines, resources


def handle_cell_glossary(cell, resources={}):
    """Gather 'gloss' data
    """
    if 'gloss' in cell.metadata and cell.metadata['gloss']:
        glossary = cell.metadata['gloss']

        if 'textbook' not in resources:
            resources['textbook'] = {}
        if 'glossary' not in resources['textbook']:
            resources['textbook']['glossary'] = {}

        g = resources['textbook']['glossary']
        resources['textbook']['glossary'] = { **g, **glossary }

    return resources


def handle_cell_formulas(cell, resources={}):
    """Gather 'formulas' data
    """
    if 'formulas' in cell.metadata and cell.metadata['formulas']:
        formulas = cell.metadata['formulas']

        if 'textbook' not in resources:
            resources['textbook'] = {}
        if 'formulas' not in resources['textbook']:
            resources['textbook']['formulas'] = {}

        f = resources['textbook']['formulas']
        resources['textbook']['formulas'] = { **f, **formulas }

    return resources


def handle_cell_goals(id, cell, resources={}):
    """Convert 'goals' dictionary to javascript function (string)
    """
    goals = set([])

    if 'goals' in cell.metadata and cell.metadata['goals']:
        goals_meta = cell.metadata['goals']
        actions = [f'export function {id}($section: Step) {{ ']
        actions.append('  setTimeout(() => {')

        for count, goal in enumerate(goals_meta):
            if 'click' in goal:
                actions.append(JS_CLICK_GOAL.format(
                    elt='elt' + str(count),
                    selector=goal['selector'],
                    id=goal['id']
                ))

            if 'value' in goal:
                actions.append(JS_VALUE_GOAL.format(
                    elt='elt'+ str(count),
                    selector=goal['selector'],
                    id=goal['id'],
                    value=goal['value']
                ))

            goals.add(goal['id'])

        actions.append('  }, 250);')
        actions.append('}\n')

        if 'textbook' not in resources:
            resources['textbook'] = {}
        if 'functions' not in resources['textbook']:
            resources['textbook']['functions'] = ''

        resources['textbook']['functions'] += '\n'.join(actions)

    return list(goals), resources


def handle_index(headers, resources={}):
    """Create an index of the subsections (with max depth of 2)
    """
    top_section = ''
    index = []
    last_level = -1

    for id, level, title in headers:
        if level > 3:
            continue
        if not top_section:
            top_section = id
        elif level <= last_level or len(index) == 0:
            index.append({
                'id': id,
                'title': title,
                'subsections': []
            })
            last_level = level
        else:
            index[-1]['subsections'].append({
                'id': id,
                'title': title,
                'subsections': []
            })

    index = { top_section: index }

    if 'textbook' not in resources:
        resources['textbook'] = {}
    if 'index' not in resources['textbook']:
        resources['textbook']['index'] = index

    return index, resources


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

        nb_headings = []
        for count, cell in enumerate(nb_copy.cells):
            id = prefix + str(count)
            if cell.cell_type == 'markdown':
                resources = handle_cell_glossary(cell, resources)
                resources = handle_cell_formulas(cell, resources)

                blanks = blank_regex.findall(cell.source)
                if not len(blanks):
                    goals, resources = handle_cell_goals(id, cell, resources)
                    if goals:
                        markdown_lines.append(f'\n---\n> id: {id}')
                        markdown_lines.append(f'\n> goals: {" ".join(goals)}\n\n')
                else:
                    markdown_lines.append(f'\n---\n> id: {id}\n\n')

                markdown_output, resources, headings = handle_markdown_cell(cell, resources, count)
                markdown_lines.append(markdown_output)

                if goals or len(blanks):
                    markdown_lines.append(f'\n\n---\n')
                if headings:
                    nb_headings += headings

            elif cell.cell_type == 'code' and cell.source.strip():
                code_output, resources = handle_code_cell(cell, resources)
                markdown_lines.append(code_output)

        if nb_headings:
            _, resources = handle_index(nb_headings, resources)

        markdown_lines.append('\n')

        return (''.join(markdown_lines), resources)
