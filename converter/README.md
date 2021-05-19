nbconvert textbook
==================

custom `nbconvert` exporter for Textbook to Mathigon format conversion

## Install

```
python setup.py install
```

## Usage

```
python -m textbook_converter path/to/toc.yaml -o output/path
```

or

```python
import textbook_converter

textbook_converter.convert_notebook(
    'path/to/toc.yaml',
    output_dir='output/path'
)
```
