# platypus
This repository is home of the new [Qiskit Textbook (beta)](https://qiskit.org/learn/).

The previous version of the Qiskit Textbook textbook can be found [here](https://github.com/qiskit-community/qiskit-textbook).

The textbook is intended for use as a university quantum algorithms course supplement as well as a guide for self-learners who are interested in learning quantum programming.

## Tools & technologies
- [Python](https://www.python.org/doc/) - interpreted, interactive, object-oriented programming language
- [Jupyter Notebooks](https://jupyter-notebook-beginner-guide.readthedocs.io/en/latest/what_is_jupyter.html) - documents containing interactive code and rich text
- [Node.js](https://nodejs.org/en/docs/) - JavaScript runtime
- [Mathigon Studio](https://github.com/mathigon/studio) - platform for highly interactive online courses
- [Typescript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [Vue 3](https://v3.vuejs.org/guide/introduction.html) - framework for building user interfaces
- [Sass/SCSS](https://sass-lang.com/documentation) - stylesheet language
- [Cypress](https://docs.cypress.io/) - front end testing tool

## Getting Started
### Pre-requisites
1. Python (3.6 or later) environment with `textbook_converter` requirements installed

    ```
    $ cd platypus/converter/textbook-converter
    $ pip install -r requirements.txt -r requirements-test.txt
    ```

1. Node.js (14.0 or later) (you could install node.js from [here](https://nodejs.org/en/download/)

### Setup

```
$ cd platypus
$ npm install
$ npm run build
$ npm start
```

> _To watch changes and rebuild automatically run with `npm run watch` after installing the dependencies._

After the application has started, the site will be available at http://localhost:8080/, but the index route will redirect to an external landing page.

In order to test the application locally, you can visit a specific course page, like https://localhost:8080/course/ch-prerequisites/.

> _You can specify the port setting the env variable `PORT`. For instance `PORT=5000 npm start`._

## Contribution
If you'd like to contribute to Qiskit Textbook (beta), please take a look at our [contributors guide](CONTRIBUTING.md) and [code of conduct](CODE_OF_CONDUCT.md)

When opening a PR against the `main` branch, a preview build might be generated and deployed. The same redirection logic as the one described in the [Setup](#setup) section will apply, meaning that one would need to visit a specific course page to access the preview build.

Once you open a jupyter notebook, you will see that it has wide rectangular cells, one can either write codes in the cell and execute or one can write formatted text, add images, write equations etc. using markdown. After entering a cell, you can choose code or markdown from a dropdown at the top, just below the menu bar on the notebook. If you choose markdown, you should be able to use that cell for writing formatted text, adding images, writing equations etc.

Specifically with text, you might want to add headings, bullet points, render images or add hyperlinks. There are plenty of resources out there which can help you with this. One such resource is [this](https://www.earthdatascience.org/courses/intro-to-earth-data-science/file-formats/use-text-files/format-text-with-markdown-jupyter-notebook/).

To add blocks (for example: reminder blocks or quiz blocks) to the jupyter notebook via markdown, you could check out the markdown syntax in a specific chapter notebook in the qiskit textbook (beta), for eg: the notebook for [Representing qubit states](https://github.com/Qiskit/platypus/blob/main/notebooks/ch-states/representing-qubit-states.ipynb) or you could check [blocks.ipynb](https://github.com/Qiskit/platypus/blob/main/notebooks/examples/blocks.ipynb). To check the markdown syntax, you would have to open these specific notebooks from your cloned repository and double click the appropriate markdown cells.

To add mathematical symbols and equations, Jupyter Notebook uses MathJax to render the Latex syntax inside markdown.  To use LaTeX in the Jupyter notebook, put the Latex math content inside ‘$$ … $$’ symbols. You could checkout Latex syntax from the [any notebook](https://github.com/Qiskit/platypus/tree/main/notebooks) in this repository. There are many resources online that could help you, a couple of which are the [jupyter notebook documentation](https://jupyter-notebook.readthedocs.io/en/stable/examples/Notebook/Typesetting%20Equations.html) and this [link](https://jupyterbook.org/content/math.html). You could also use this [online latex editor](https://www.tutorialspoint.com/online_latex_editor.php) to assist you with writing in Latex. 

## License
The materials and associated source code of this open-source textbook are licensed under [Apache License 2.0](https://github.com/Qiskit/platypus/blob/main/LICENSE).