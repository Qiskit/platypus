# Prerequisites

## Environment Setup Guide to work with Qiskit Textbook

This is a comprehensive guide for setting up your environment on your personal computer for working with Qiskit Textbook. This will help you reproduce the results as you see them on the textbook website. The Qiskit Textbook is written in [Jupyter notebooks](https://jupyter.org/install). Notebooks and [the website](https://qiskit.org/textbook/preface.html) are the only media in which the Textbook is fully supported.

<h2>
Qiskitテキストブックで作業するための環境設定ガイド <a id="qiskitテキストブックで作業するための環境設定ガイド-0-0"></a>
</h2>

Qiskitテキストブックで作業するためのパソコン環境の設定方法をまとめました。webサイト上のテキストブックで見た通りの結果を再現するのに役立ちます。Qiskitテキストブックは[Jupyter notebook](https://jupyter.org/install)で書かれています。notebookと[webサイト](https://qiskit.org/textbook/preface.html) は、テキストブックが完全にサポートされている唯一のメディアです。

<h2>
qiskit_textbook パッケージのインストール <a id="qiskit_textbook-パッケージのインストール-2-0"></a>
</h2>

Qiskitテキストブックには、テキストブック専用のツールやウィジェットが用意されています。これはQiskitの一部ではなく、`{code} qiskit_textbook`パッケージから入手できるものです。[Pip](http://pypi.org/project/pip/) と [Git](http://git-scm.com/)を用いて、最も早くインストールする方法は以下のコマンドです：

```code
pip install git+https://github.com/qiskit-community/qiskit-textbook.git#subdirectory=qiskit-textbook-src
```
もしくは、Githubより[qiskit-textbook-src](https://github.com/qiskit-community/qiskit-textbook)フォルダーをダウンロードし、このフォルダーを含むディレクトリから以下を実行してください：

```code
pip install ./qiskit-textbook-src
```

<h2>
Qiskitテキストブックに記載されている描画出力を正確に再現する為のステップ (オプション) <a id="qiskitテキストブックに記載されている描画出力を正確に再現する為のステップ-オプション-3-0"></a>
</h2>

<h3>
1. デフォルトの描画ツールをMatPlotLibに設定する <a id="1-デフォルトの描画ツールをmatplotlibに設定する-4-0"></a>
</h3>

`{code} QuantumCircuit.draw()` や `{code} qiskit.visualization.circuit_drawer()`のデフォルトのバックエンドはテキストです。しかし、ローカル環境に応じ、これらデフォルトをあなたのユースケースに適したものに変更したいと思うでしょう。これはユーザー構成ファイルで実現できます。デフォルトで、ユーザー構成ファイルは、`{code} ~/.qiskit/`の中にある`{code} settings.conf`ファイルです。

Qiskitテキストブックは、MatPlotLibをデフォルトの回路描画ツールとして使用しています。Qiskitテキストブック中に記載されている描画を再現するためには、以下の内容を含む`{code} settings.conf` ファイル(通常は`{code} ~/.qiskit/`にあります)を作成してください。

    [default]
    circuit_drawer = mpl

<h3>
2. デフォルトの画像タイプをSVGに設定する <a id="2-デフォルトの画像タイプをsvgに設定する-6-0"></a>
</h3>

オプションで、以下のコードを`{code} ipython_kernel_config.py`ファイル(通常は`{code} ~/.ipython/profile_default/`にあります)に追加して、デフォルトの画像フォーマットをPNGからより拡張性のあるSVGフォーマットに変更することができます：

    c.InlineBackend.figure_format = 'svg'

<h3>
3. テキストブック中で使用しているQiskitのバージョンと同期する <a id="3-テキストブック中で使用しているqiskitのバージョンと同期する-8-0"></a>
</h3>

ほとんどのチュートリアルの最後に、Qiskitパッケージのバージョン情報を含んだコード・スニペットがあります。構文や出力に矛盾がある場合は、同じバージョンを使用してみてください。

あなたのコンピューターにインストールされているバージョンを確認するには、PythonシェルかJupyter notebookにて以下を実行してください：

    import qiskit
    qiskit.__qiskit_version__




---
<h2>
Python 及び Jupyter notebook 入門 <a id="python-及び-jupyter-notebook-入門-0-0"></a>
</h2>

Pythonは、コンパイル不要なプログラミング言語です。 プログラムを行単位で実行することができます（これは、Notebookを使用する方法です）。ですので、もしプログラミングについて全く知らないのであれば、Pythonはスタート地点として素晴らしい場所になります。現在のバージョンは Python 3であり、本教科書で使用するものです。

Pythonでコーディングする方法の一つは、Jupyter notebookを使用することです。 これはおそらく、プログラミング、文章、および画像を統合する最良の方法です。 Notebookでは、全てがセルにの中に配置されます。 テキスト・セルとコード・セルは最も一般的なものです。 Jupyter notebookとしてこのセクションを表示している場合、現在読んでいるこのテキストはテキスト・セルに配置されています。 コード・セルは、以下にあります。

コード・セルの内容を実行するには、そのセルをクリックし、 Shift + Enter を押します。 または、左側に小さな矢印がある場合は、それをクリックすることもできます。


    pre(data-executable="true" data-language="python").
      1 + 1


    div(data-executable-output="true")
        pre 
            | 2

もしJupyter notebookとしてこのセクションを表示している場合は、読み進めると同時に各コード・セルを実行しましょう。


    pre(data-executable="true" data-language="python").
      a = 1
      b = 0.5
      a + b


    div(data-executable-output="true")
        pre 
            | 1.5

上のセルで、二つの変数`{code} a` と `{code} b`を定義し、値を与え、その後足し合わせています。このような単純な計算は、Pythonでとても完結に表記されます。

Pythonの変数は色々な形を取ります。以下にいくつかの例を示します。


    pre(data-executable="true" data-language="python").
      an_integer = 42 # Just an integer
      a_float = 0.1 # A non-integer number, up to a fixed precision
      a_boolean = True # A value that can be True or False
      a_string = '''just enclose text between two 's, or two "s, or do what we did for this string''' # Text
      none_of_the_above = None # The absence of any actual value or variable type

数のほかに、使用できるデータ構造として *list* があります。


    pre(data-executable="true" data-language="python").
      a_list = [0,1,2,3]

Pythonのlistは、様々なタイプを混在させることができます。


    pre(data-executable="true" data-language="python").
      a_list = [ 42, 0.5, True, [0,1], None, 'Banana' ]

（Fortranのような言語と違い）Pythonで、listの添字は`{code} 0`から始まります。つまり、上のlistで最初にある`{code} 42`にアクセスするためには、次の様になります。


    pre(data-executable="true" data-language="python").
      a_list[0]


    div(data-executable-output="true")
        pre 
            | 42

同じ様なデータ構造として、 *tuple* があります。


    pre(data-executable="true" data-language="python").
      a_tuple = ( 42, 0.5, True, [0,1], None, 'Banana' )
      a_tuple[0]


    div(data-executable-output="true")
        pre 
            | 42

listとtupleの主な違いは、listの要素は変更できることです。


    pre(data-executable="true" data-language="python").
      a_list[5] = 'apple'
      
      print(a_list)


    div(data-executable-output="true")
        pre 
            | [42, 0.5, True, [0, 1], None, 'apple']
            | 

一方、tupleの要素は変更できません。


    pre(data-executable="true" data-language="python").
      a_tuple[5] = 'apple'


    div(data-executable-output="true")
また、listの最後に要素を追加できますが、tupleはできません。


    pre(data-executable="true" data-language="python").
      a_list.append( 3.14 )
      
      print(a_list)


    div(data-executable-output="true")
        pre 
            | [42, 0.5, True, [0, 1], None, 'apple', 3.14]
            | 

他の便利なデータ構造として、*dictionary* があります。dictionaryは、それぞれユニークな *キー* でラベルされた *値* の集合を保存できます。

値のデータタイプは任意です。キーは十分単純（integer, float, Boolean, string）であればよいです。dictionaryは、listにはなれませんが、tupleには _なりえ_ ます。


    pre(data-executable="true" data-language="python").
      a_dict = { 1:'This is the value, for the key 1', 'This is the key for a value 1':1, False:':)', (0,1):256 }

値はキーを使ってアクセスします：


    pre(data-executable="true" data-language="python").
      a_dict['This is the key for a value 1']


    div(data-executable-output="true")
        pre 
            | 1

新しいキーと値のペアは、新しいキーに対して新しい値を与えることで追加できます。


    pre(data-executable="true" data-language="python").
      a_dict['new key'] = 'new_value'

数値の範囲をループする場合、構文は次の通りです：


    pre(data-executable="true" data-language="python").
      for j in range(5):
          print(j)


    div(data-executable-output="true")
        pre 
            | 0
            | 1
            | 2
            | 3
            | 4
            | 

デフォルトで0から始まりますので、`{code} range(n)`に対して、n-1で終わることに注意してください。

'iterable'オブジェクトについてもループすることができます。listの場合は次の通りです：


    pre(data-executable="true" data-language="python").
      for j in a_list:
          print(j)


    div(data-executable-output="true")
        pre 
            | 42
            | 0.5
            | True
            | [0, 1]
            | None
            | apple
            | 3.14
            | 

dictionaryの場合は以下の通りです：


    pre(data-executable="true" data-language="python").
      for key in a_dict:
          value = a_dict[key]
          print('key =',key)
          print('value =',value)
          print()


    div(data-executable-output="true")
        pre 
            | key = 1
            | value = This is the value, for the key 1
            | 
            | key = This is the key for a value 1
            | value = 1
            | 
            | key = False
            | value = :)
            | 
            | key = (0, 1)
            | value = 256
            | 
            | key = new key
            | value = new_value
            | 
            | 

条件文は`{code} if`、`{code} elif`、`{code} else`を使うと以下の文法で記述できます： 


    pre(data-executable="true" data-language="python").
      if 'strawberry' in a_list:
          print('We have a strawberry!')
      elif a_list[5]=='apple':
          print('We have an apple!')
      else:
          print('Not much fruit here!')


    div(data-executable-output="true")
        pre 
            | We have an apple!
            | 

パッケージは次のような行でインポートします：


    pre(data-executable="true" data-language="python").
      import numpy

パッケージ `{code} numpy` は数学的なコーディングに重要です。


    pre(data-executable="true" data-language="python").
      numpy.sin( numpy.pi/2 )


    div(data-executable-output="true")
        pre 
            | 1.0

numpyコマンドの前に、`{code} numpy.`を記述する必要があります。それで、`{code} numpy`に定義されているコマンドだと実行系が知ることができるのです。コーディングを節約するため、一般的に次の様に記述します：


    pre(data-executable="true" data-language="python").
      import numpy as np
      
      np.sin( np.pi/2 )


    div(data-executable-output="true")
        pre 
            | 1.0

このようにすると、短縮名だけが必要となります。ほとんどの人が `{code} np`を使用しますが、好きなものを使用して構いません。

`{code} numpy`の全てをそのままインポートする場合は、次の通りです：


    pre(data-executable="true" data-language="python").
      from numpy import *

この様にすると、コマンドを直接使うことができます。しかし、パッケージ同士で干渉することがあるので、注意して使用する必要があります。


    pre(data-executable="true" data-language="python").
      sin( pi/2 )


    div(data-executable-output="true")
        pre 
            | 1.0

三角関数、線形代数などを実行したい場合は、 `{code} numpy` を使用できます。 プロットする場合は、 `{code} matplotlib` を使用してください。 グラフ理論の場合は、 `{code} networkx` を使用します。 量子コンピューティングの場合は、 `{code} qiskit` を使用します。 あなたが望むどのようなものに対しても、役立つパッケージがきっとあるでしょう。

どの言語でも知っておくべきことは、関数の作り方です。

`{code} do_some_maths`という名前で、`{code} Input1` と `{code} Input2` という入力を持ち、`{code} the_answer`という出力を持つ関数は、次の通りです：


    pre(data-executable="true" data-language="python").
      def do_some_maths ( Input1, Input2 ):
          the_answer = Input1 + Input2
          return the_answer

これは次の様に使います：


    pre(data-executable="true" data-language="python").
      x = do_some_maths(1,72)
      print(x)


    div(data-executable-output="true")
        pre 
            | 73
            | 

関数にオブジェクトを指定し、関数がそのオブジェクトの状態を変更するメソッドを呼び出すと、その影響は持続します。 つまり、それがあなたのしたいことであれば、何も`{code} 返す`必要はありません。 例えば、listの `{code} append` メソッドでこれを確かめてみましょう。


    pre(data-executable="true" data-language="python").
      def add_sausages ( input_list ):
          if 'sausages' not in input_list:
              input_list.append('sausages')


    pre(data-executable="true" data-language="python").
      print('List before the function')
      print(a_list)
      
      add_sausages(a_list) # function called without an output
      
      print('\nList after the function')
      print(a_list)


    div(data-executable-output="true")
        pre 
            | List before the function
            | [42, 0.5, True, [0, 1], None, 'apple', 3.14]
            | 
            | List after the function
            | [42, 0.5, True, [0, 1], None, 'apple', 3.14, 'sausages']
            | 

乱数は `{code} random` パッケージを使用すると生成できます。


    pre(data-executable="true" data-language="python").
      import random


    pre(data-executable="true" data-language="python").
      for j in range(5):
          print('* Results from sample',j+1)
          print('\n    Random number from 0 to 1:', random.random() )
          print("\n    Random choice from our list:", random.choice( a_list ) )
          print('\n')


    div(data-executable-output="true")
        pre 
            | * Results from sample 1
            | 
            |     Random number from 0 to 1: 0.24483110888696868
            | 
            |     Random choice from our list: [0, 1]
            | 
            | 
            | * Results from sample 2
            | 
            |     Random number from 0 to 1: 0.7426371646254912
            | 
            |     Random choice from our list: [0, 1]
            | 
            | 
            | * Results from sample 3
            | 
            |     Random number from 0 to 1: 0.7269519228900921
            | 
            |     Random choice from our list: 42
            | 
            | 
            | * Results from sample 4
            | 
            |     Random number from 0 to 1: 0.8707823815722878
            | 
            |     Random choice from our list: apple
            | 
            | 
            | * Results from sample 5
            | 
            |     Random number from 0 to 1: 0.2731676546693854
            | 
            |     Random choice from our list: True
            | 
            | 
            | 

以上は基本です。いま、あなたに必要なのは検索エンジンであり、Stack Exchangeにおいて聞く価値のあるユーザーを知る知見です。 これで、あなたはPythonで何でも行うことができます。あなたのコードは最も「Pythonic」ではないかもしれませんが、それを気にしているのはPythonistasだけです。


