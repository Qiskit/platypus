import argparse
import sys

from .converter import convert, merge


parser = argparse.ArgumentParser(
    prog='textbook_converter',
    description='Convert notebook to Mathigon markdown'
)

parser.add_argument('nb_file_or_dir', nargs=1, type=str, help='path to notebook file or parent directory')
parser.add_argument('-o', '--output', nargs=1, type=str, help='directory to store converted notebook')
parser.add_argument('-s', '--shared', nargs=1, type=str, help='directory to store shared content (i.e., glossary.yaml)')
parser.add_argument('-m', '--merge', action='store_true', help='merge multiple converted files into single file')

args = parser.parse_args()

nb_file_path = args.nb_file_or_dir[0]
output_dir = args.output[0] if args.output else None
yaml_output_dir = args.shared[0] if args.shared else None
merge_nb = args.merge

convert(
    nb_file_path,
    output_dir=output_dir,
    yaml_output_dir=yaml_output_dir
)


if merge_nb:
    output_path = output_dir if output_dir else nb_file_path
    merge(output_path)
