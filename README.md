> [!IMPORTANT]
> This repository and its content has been superseded by [IBM Quantum
> Learning](https://learning.quantum.ibm.com). These source files are
> no longer maintained and may contain errors. We are not accepting any
> contributions.

# platypus
This repository is home of the new [Qiskit Textbook](https://qiskit.org/learn/).

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
1. Python 3.10 environment with `textbook_converter` requirements installed

    ```
    $ cd platypus/converter/textbook-converter
    $ pip install -r requirements.txt -r requirements-test.txt
    ```

2. Node.js (Using any version from 14.0 to 16.19.0) (you could install node.js from [here](https://nodejs.org/en/download/))

### Setup

```
$ cd platypus
$ git submodule update --init --recursive
$ npm install
$ npm run build
$ npm start
```

> _To watch changes and rebuild automatically run with `npm run watch` after installing the dependencies._

After the application has started, the site will be available at http://localhost:8080/, but the index route will redirect to an external landing page.

In order to test the application locally, you can visit a specific course page, like http://localhost:8080/course/ch-prerequisites/.

> _You can specify the port setting the env variable `PORT`. For instance `PORT=5000 npm start`._

## Content contributions

If you want to help improve the textbook's content, check out the [contributors guide](CONTRIBUTING.md), and the [code of conduct](CODE_OF_CONDUCT.md). If you would like to help us make the textbook accessible in different languages please see the [localization guide](TRANSLATING.md).

## License
The materials and associated source code of this open-source textbook are licensed under [Apache License 2.0](https://github.com/Qiskit/platypus/blob/main/LICENSE).
