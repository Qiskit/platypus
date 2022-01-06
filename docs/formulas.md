
#  Formulas

##  How to update interactive Formula notations

Within the Qiskit Textbook, authors have the ability to add tooltips with notations, to each of the math formulas on the page.

  

In order for a formula notation to render, the code will need the following

  

1) the notation defined in `notations.yaml`

**or**

notation defined from within the section's Jupyter Notebook cell metadata

2) a HTML `class` or `id` must be added to the math formula (via MathJax `\class` and `\cssId` macros). Read more about the MathJax html extension [here](https://docs.mathjax.org/en/latest/input/tex/extensions/html.html)

  <br/>

**Notation object properties**

**id** | `string`- used as an identifier within the code base to match/provide the appropriate tooltip information to a single math symbol/variable (e.g., _this notation is specific to this one instance_)

  

**class** | `string`- used as an identifier within the code base to match/provide the appropriate tooltip information to a group of similar math symbols/variables (e.g., _this notation is repeatable, therefore applies to multiple instances_)

  

**type** | `string`- a piece of metadata that allows an author to add a note about the _type_ of math symbol/variable. For example, a particular symbol might be considered a 'Locally defined variable', or 'Common notation'. 



**meaning** | `string`- short description of the math symbol/variable. This description also renders in right-side utility panel under 'Lesson notes'

  

**say** | `string`- a short description that is intended to hep with pronounciation. This string renders as the _title_ of math symbol/variable tooltip.

  
  

###  Defining a notation in notations.yaml

https://github.com/Qiskit/platypus/blob/main/shared/notations.yaml

  

1) find the `/shared/notations.yaml` file

2) use the following yaml structure to create a notation object  

```yaml
# notations.yaml

yourNewNotation:
  meaning: This the meaning of yourNewNotation and can be a short, helpful description
  say:  Symbol/variable
  type:  Common notation

```

3) add `yourNewNotation` to the math symbol/variable that it applies to, within the formula's code, by using either a `cssId` or `class` attribute. This code must follow the syntax patterns shown in [MathJax's HTML section](http://docs.mathjax.org/en/latest/input/tex/extensions/html.html#html)

4) Now that the `class` or `id` identifier attached to the math symbol/variable, and the notation has been defined in `notations.yaml`, rebuild the server

5) After reloading the app and viewing the Textbook through your browser, the notation will be visible and interactive.

  > **Note**: To exclude the notation from the Lesson notes prefix the `cssId` or `class` with an underscore. For example, `_this-notation-is-hidden`.

  

###  Defining a notation in Jupyter Notebooks

1) In Jupyter Notebooks, find the Notebook with the formula you're targeting

2) Add `yourNewNotation` to the math symbol/variable that it applies to, within the formula's code, by using either a `cssId` or `class` attribute. This code must follow the syntax patterns shown in [MathJax's HTML section](http://docs.mathjax.org/en/latest/input/tex/extensions/html.html#html)

> **Note**: To exclude the notation from the Lesson notes prefix the `cssId` or `class` with an underscore. For example, `_this-notation-is-hidden`.

3) Within the cell metadata, update the JSON object with valid notation information like so:

```json
{
  "formulas": {
    "yourNewNotation":  {
      "meaning":  "This the meaning of yourNewNotation and can be a short, helpful description",
      "say":  "Symbol/variable",
      "type":  "Common notation"
   }
 }
}
```

4) Now that the `class` or `id` identifier attached to the math symbol/variable, and the notation has been defined in the Notebook's cell metadata, restart your server

5) After reloading the app and viewing the Textbook through your browser, the notation will be visible and interactive.
