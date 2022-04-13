import sys
import nbformat
from scour import scour

class ScourOptions:
    def __init__(self, **entries):
        self.__dict__.update(entries)


NB_ROOT = './notebooks'
NB_PATHS = './scripts/content_checks/notebook_paths.txt'
SCOUR_OPTIONS = ScourOptions(
    **{
        'simple_colors': False,
        'style_to_xml': True,
        'group_collapse': True,
        'group_create': True,
        'keep_editor_data': False,
        'keep_defs': False,
        'renderer_workaround': True,
        'strip_xml_prolog': False,
        'remove_titles': True,
        'remove_descriptions': True,
        'remove_metadata': True,
        'remove_descriptive_elements': True,
        'strip_comments': True,
        'enable_viewboxing': True,
        'indent_type': 'none',
        'newlines': False,
        'strip_xml_space_attribute': False,
        'strip_ids': True,
    }
)


def scour_svgs(filepath, fix=False):
    notebook = nbformat.read(filepath, 4)
    needs_write = False
    for cell in notebook.cells:
        if cell.cell_type == 'code':
            for output in cell.outputs:
                if 'data' in output:
                    if 'image/svg+xml' in output['data']:
                        svg = output['data']['image/svg+xml']
                        if '\n' in svg:
                            if fix:
                                needs_write = True
                                min_svg = scour.scourString(svg, SCOUR_OPTIONS)
                                min_svg = min_svg.replace('\n', '')
                                output['data']['image/svg+xml'] = min_svg
                            else:
                                raise ValueError(f'Error in {filename.strip()}: SVG not minified.\n'
                                                  'Run `npm run test:nb:fix` to fix.')
    if fix and needs_write:
        nbformat.write(notebook, filepath, 4)


if __name__ == '__main__':
    fix = '--fix' in sys.argv
    with open(NB_PATHS, encoding='utf-8') as f:
        file_names = f.readlines()
    for filename in file_names:
        if not filename.strip():
            # blank line
            continue
        if filename.startswith('#'):
            print(f'Skipping: {filename}')
        else:
            scour_svgs(f'{NB_ROOT}/{filename.strip()}.ipynb', fix)
