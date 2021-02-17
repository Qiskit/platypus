# qiskit-textbook-edu

Qiskit Textbook edu exploration

## Docker setup

```
$ cd qiskit-textbook-edu
$ docker build -t platypus .
$ docker run -d -p 5000:5000 --name=platypus platypus
```

### start and stop container

```
$ docker start platypus
$ docker stop platypus
```

After the Docker container has started access the site at: http://localhost:5000/


## Local setup

### pre-requisites

1. Python (3.6 or later) environment with `textbook_converter` requirements installed

    ```
    $ cd qiskit-textbook-edu/textbook-converter
    $ pip install -r requirements.txt
    ```

1. Node.js

### setup

```
$ cd qiskit-textbook-edu
$ npm install
$ npm run build
$ npm start
```

> _To watch changes and rebuild automatically run with `npm run watch`_

After the application has started access the site at: http://localhost:5000/

