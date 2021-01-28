import sys

from .converter import convert_notebook


if len(sys.argv) < 2:
    sys.exit('Please provide path to notebook file.')
 
nb_file_path = sys.argv[1]
output_dir = sys.argv[2] if len(sys.argv) > 2 else None
yaml_output_dir = sys.argv[3] if len(sys.argv) > 3 else None
 
convert_notebook(nb_file_path, output_dir, yaml_output_dir=yaml_output_dir)
