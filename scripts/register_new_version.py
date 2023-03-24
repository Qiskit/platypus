"""This script updates notebooks/toc.yaml to point to new versions of the
textbook

Usage:
    python3 scrips/make_toc.py <submodule name>

    E.g. if you copied a new version to notebooks/v3, run:
         python3 scripts/make_toc.py v3
"""
import yaml
import sys
import os
import shutil 


def read_toc(filepath):
    with open(filepath) as f:
        new_toc = yaml.load(f, Loader=yaml.BaseLoader)

    return new_toc

def replace_urls(toc, version_name, prep_string):
    """Updates course names, and prepends `version_name` to urls in `toc` (so
    they point to the right place).
    """
    for course in toc:
        course['url'] = f'/{version_name}_' + course['url'].lstrip('/')
        for section in course['sections']:
            section['url'] = prep_string.format(version_name=version_name) + section['url'].lstrip('/')

    return toc

def write_toc(toc, filepath):
    with open(filepath, 'a') as new_toc:
        new_toc.write('\n\n#---- Below was added by machine ---\n\n')
        new_toc.write(yaml.dump(toc))

def get_available_translations(translations_path):
    translations = []
    for file in os.scandir(translations_path):
        if file.is_dir():
            translations.append(file)
    return translations


if __name__ == '__main__':
    version_name = sys.argv[-1]

    assert version_name.startswith('v')
    assert version_name[1:].replace('.','').isdigit()

    # Handle translated content
    available_translations = get_available_translations(f'notebooks/{version_name}/translations')

    for language in available_translations:
        if not os.path.exists(language.path + '/toc.yaml'):
            print(f"Skipping {language.name} (no toc.yaml)")
            continue
        # copy files over
        shutil.copytree(
            language.path,
            f"translations/{language.name}/{version_name}"
        )
        shutil.rmtree(language.path)
        # update toc
        new_toc = read_toc(f'translations/{language.name}/{version_name}/toc.yaml')
        new_toc = replace_urls(new_toc, version_name, '{version_name}/')
        write_toc(new_toc, f'translations/{language.name}/toc.yaml')


    # Handle English content

    # Copy `notebooks` folder up a level
    shutil.copytree(
        f"notebooks/{version_name}/notebooks",
        f"notebooks/{version_name}_temp"
    )
    shutil.rmtree(f"notebooks/{version_name}")
    shutil.copytree(
        f"notebooks/{version_name}_temp",
        f"notebooks/{version_name}"
    )
    shutil.rmtree(f"notebooks/{version_name}_temp")

    # Update toc.yaml with new notebooks
    new_toc = read_toc(f'notebooks/{version_name}/toc.yaml')
    new_toc = replace_urls(new_toc, version_name, '{version_name}/')
    write_toc(new_toc, 'notebooks/toc.yaml')

    print("Done!")
