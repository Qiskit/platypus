"""This script updates notebooks/toc.yaml to point to new versions of the
textbook

Usage:
    python3 scrips/make_toc.py <submodule name>

    E.g. if you copied a new version to notebooks/v3, run:
         python3 scripts/make_toc.py v3
"""
import yaml
import sys

def read_new_toc(dir_name):
    """Reads the newly-added toc to be appended to ~/notebooks/toc.yaml
           dir_name: the folder for the new version (containing a toc.yaml)
                     (e.g. 'v2')
    """
    with open(f'notebooks/{dir_name}/notebooks/toc.yaml') as f:
        new_toc = yaml.load(f, Loader=yaml.BaseLoader)

    return new_toc

def replace_urls(toc, dir_name):
    """Prepends `dir_name` to urls in `toc` (so they point to the right place).
    """
    for course in toc:
        course['url'] = f'/{dir_name}_' + course['url'].lstrip('/')
        for section in course['sections']:
            section['url'] = dir_name + '/notebooks/' + section['url'].lstrip('/')

    return toc

def write_to_main_toc(toc):
    with open(f'notebooks/toc.yaml', 'a') as new_toc:
        new_toc.write('\n\n#---- Below was added by machine ---\n\n')
        new_toc.write(yaml.dump(toc))

if __name__ == '__main__':
    dir_name = sys.argv[-1]
    new_toc = read_new_toc(dir_name)
    new_toc = replace_urls(new_toc, dir_name)
    write_to_main_toc(new_toc)
    print("Done!")
