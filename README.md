# project-platypus

Project Platypus

## Local setup

### pre-requisites

1. Python (3.6 or later) environment with `textbook_converter` requirements installed

    ```
    $ cd platypus/converter/textbook-converter
    $ pip install -r requirements.txt
    ```

1. Node.js (14.0 or later)

### setup

```
$ cd platypus
$ npm install
$ npm run build
$ npm start
```

> _To watch changes and rebuild automatically run with `npm run watch` after installing the dependencies._

After the application has started, access the site at: http://localhost:8080/

> _You can specify the port setting the env variable `PORT`. For instance `PORT=5000 npm start`._