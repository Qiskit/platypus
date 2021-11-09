# platypus

This repository is home of the new [Qiskit Textbook (beta)](https://qiskit.org/textbook-beta/).

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

1. Node.js (14.0 or later)

### Setup

```
$ cd platypus
$ npm install
$ npm run build
$ npm start
```

> _To watch changes and rebuild automatically run with `npm run watch` after installing the dependencies._

After the application has started, access the site at: http://localhost:8080/

> _You can specify the port setting the env variable `PORT`. For instance `PORT=5000 npm start`._


## Contribution Guidelines
If you'd like to contribute to Qiskit Textbook (beta), please take a look at our [contributors guide](CONTRIBUTING.md) and [code of conduct](CODE_OF_CONDUCT.md)


## License
The materials and associated source code of this open-source textbook are licensed under [Apache License 2.0](LICENSE).
