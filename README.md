# platypus

Qiskit Textbook (beta)

## Getting up and running

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
If you'd like to contribute to Qiskit Textbook, please take a look at our [contributors guide](https://github.com/qiskit-community/qiskit-textbook/blob/main/CONTRIBUTING.md).


## License
The materials and associated source code of this open-source textbook are licensed under [Apache License 2.0](LICENSE).
