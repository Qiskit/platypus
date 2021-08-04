import argparse
import os
import sys

from pathlib import Path

from .converter import convert, merge, yml_to_dict


parser = argparse.ArgumentParser(
    prog='textbook_converter',
    description='Convert notebook to Mathigon markdown'
)

parser.add_argument('toc_file', nargs=1, type=str, help='path to toc yaml')
parser.add_argument('-n', '--notebooks', nargs=1, type=str, help='directory where notebooks are located')
parser.add_argument('-o', '--output', nargs=1, type=str, help='directory to store converted notebook')

args = parser.parse_args()

toc_file_path = args.toc_file[0]
notebooks_dir = args.notebooks[0] if args.notebooks else None
output_dir = args.output[0] if args.output else None

toc_chapters = yml_to_dict(toc_file_path)
nb_dir_path = Path(toc_file_path).parent if notebooks_dir is None else Path(notebooks_dir)
output_path = output_dir or nb_dir_path
shared_dir = os.path.join(output_path, 'shared')

for chapter in toc_chapters:
    chapter_url = chapter['url'][1:] if chapter['url'].startswith('/') else chapter['url']
    chapter_output = os.path.join(output_path, chapter_url)

    if len(chapter['sections']):
        for section in chapter['sections']:
            section_url = section['url'][1:] if section['url'].startswith('/') else section['url']
            convert(
                os.path.join(nb_dir_path, section_url) + '.ipynb',
                output_dir=chapter_output,
                shared_dir=shared_dir,
                section_id=section['id']
            )

        merge(chapter_output, toc_file_path)
