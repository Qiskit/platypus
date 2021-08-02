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


