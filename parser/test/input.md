# Test Title

## Section 1 

> id: step1
> section: section1

Here is a paragraph with _italic_ and __bold__ as well as emoji: :smile: and :penguin:

Here is a paragraph with [Biographies](bio:gauss) of [People](bio:euler),
[Glossary entries](gloss:polygon), [External links](https://mathigon.org), and
[Targets](->#step1).

Here is a paragraph with [[blanks|gaps]] and [[100]] inputs, and inputs with
[[200 (hints!)]], as well as variables like ${x|1|0,1,10}{x} and ${x}. You
can also have _{span.class} blanks inside [[a|b|c]] tags_.

Here is a paragraph with maths: `x^2 + 4x - 20/2`.

{.red-wrap(data-value=10)} Here is a paragraph with classes: _{.red} red_

Here is a multiline equation $ \begin{bmatrix}
  2 \\\\\\
  8
\end{bmatrix}, $ and an equation at the end of the line $x!$

Here is a special _{small} inline element_

Some __adjacent__**elements** and _nested*elements*_.

---
> id: step2

A **matrix** is a rectangular array of numbers: 

Escape 20\$ and \$20 and $20 20\ m.

Here is $x$ and $a + y$ and $y$. Here is $a and $b as variables and $20 + $30 as currency.



``` latex
x
```

Here are some `{py}code` blocs with `{r} custom `  with `{code} format `.

---
> id: step3

Here is another section that contains [[blanks|text]] and [links](url).

* {.item1} list item 
* {.item2} list item with _italic_ and [[blanks|gaps]]

---
> id: step4

Here are PUG includes

    include include.svg

and PUG code

    .row

---
> id: step5

Here is a table

| a | b |
| - | - |
| c | d |
{.table-class}

And a table without header

| a | b |
| c | d |
{.table-class}

---
> id: step6

Here is a paragraph

::: article.row
Here is an _indented_ block

::: .nested
More __text__
:::

More text
:::

More text 

---
> id: step7

::: column(width=410)
Right Triangle: When a triangle has one right angle.
::: column.grow
Obtuse Triangle: When a triangle has one obtuse angle.
::: column
Acute Triangle: When all three angles in the triangle are acute.
:::

Here is a paragraph

---
> id: step8

::: tab
#### Title 1
Right Triangle: When a triangle has one right angle.
::: tab

#### Title 2

Obtuse Triangle: When a triangle has one obtuse angle.

:::

Here is a paragraph

---
> id: step9

Let's test some built-in components [[10]] [[11|12]], ${x}{x|2|1,1,3}

    x-slider(steps=100)
    x-sortable
    x-free-text
    x-quill
    x-gameplay
    x-equation
    x-equation-system: div: x-equation
    
    x-slideshow
      div(slot="stage")
      p Step 1
      p Step 2
      p Step 3
      
    x-algebra-flow: ul
      li Step 1
      li Step 2
      li Step 3
      
    x-picker
      .item
      .item(data-error="wrong")
      .item

[Continue](btn:next)
