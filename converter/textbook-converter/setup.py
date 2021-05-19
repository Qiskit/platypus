from setuptools import setup, find_packages
from sys import argv


with open('README.md') as f:
  readme = f.read()


requirements = [
    'ipython>=6',
    'nbformat>=4',
    'nbconvert>=5',
    'requests',
    'pyyaml'
]


setup(
  name='textbook-converter',
  version='0.1.0',
  description='Convert Textbook notebooks to Mathigon format',
  long_description=readme,
  long_description_content_type='text/markdown',
  keywords=[
    'jupyter',
    'mathigon',
    'qiskit',
    'textbook'
  ],
  license='Apache-2.0',
  install_requires=requirements,
  packages=find_packages(include=['textbook_converter']),
  url='https://github.com/qiskit-community/project-platypus/tree/main/textbook-converter',
  python_requires='>=3.6',
  entry_points={
    'nbconvert.exporters': [
      'textbook = textbook_converter:TextbookExporter',
    ],
  }
)
