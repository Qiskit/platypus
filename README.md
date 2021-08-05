# project-platypus

Project Platypus

## Local setup

### pre-requisites

1. Python (3.6 or later) environment with `textbook_converter` requirements installed

    ```
    $ cd platypus/converter/textbook-converter
    $ pip install -r requirements.txt -r requirements-test.txt
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

## Work with translations

If we want to have different languages on our textbook, we need to follow some steps

### Preparation

1. Identify the language you want to translate to from this [yaml file](https://github.com/mathigon/studio/blob/main/server/data/locales.yaml) and take the name of its key. For example, for japanese, the key is `ja`:

```
ja:
  key: Japanese
  name: 日本語
  flag: jp
```

2. Go to the `config.yaml` file and add the mention key to the `locales` list. Following with the example of adding japanese, the `locales` list will be:

```
locales: [en, ja]
```

3. If the notebook translations are on the old textbook repository, go there and copy the files. The japanese notebooks are [here](https://github.com/qiskit-community/qiskit-textbook/tree/main/i18n/locales/ja)

4. Once we have the notebook translations we want to include on the new texbook, we add it to `/translations/<key-for-the-new-language>`. This `key-for-the-new-language` is the same value we added to the `locales` list on the step 2.

5. Create a `toc.yaml file` inside `/translations/<key-for-the-new-language>` with the table of content for the specific language. Notice that the file for the original version (english in this case) should be in `/notebooks/toc.yaml`

### Convert notebooks files into md files

By running 

```
npm run build:nb
```

we execute the converter. This function converts the notebooks into md files and add the english versions to the `/working/content` folder and the translations to the `/working/translations/<key-for-the-new-language>` folder

### Convert md files into html

By running

```
npm run build:studio
```

mathigon studio converts the md files on the `/working/content` and `/working/translations/<key-for-the-new-language>` directories into json files in the `public` directory that contains the html needed to render the page

⚠️ **Known problem**
- Every course has to start with a section title (##). If it doesn't, the `npm run build:studio` throws an error

### Try it on local
On local, you can see if the translations are working by adding the following query parameter to the URL (have in mind that this is the query parameter for the japanese version):

```
?hl=ja
```

### Production
In production, the translations go under a subdomain, and that subdomain should be linked manually in Google Cloud. On our example, it will be:

``` 
ja.learn.qiskit.org/...
```


