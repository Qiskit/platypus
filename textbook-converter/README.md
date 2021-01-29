nbconvert textbook
==================

custom `nbconvert` exporter for Textbook to Mathigon format conversion

## Install

```
python setup.py install
```

## Usage

```
python -m textbook_converter path/to/notebook.ipynb -o optional/output/path
```

or

```python
import textbook_converter

textbook_converter.convert_notebook(
    'path/to/notebook.ipynb',
    output_dir='optional/output/path'
)
```
