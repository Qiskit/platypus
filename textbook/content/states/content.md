# Quantum States and Qubits

## Introduction

> id: states-qubits-intro
> goals: bit-description

If you think quantum mechanics sounds challenging, you are not alone. All of our intuitions are based on day-to-day experiences, and so are better at understanding the behavior of balls and bananas than atoms or electrons. Though quantum objects can seem random and chaotic at first, they just follow a different set of rules. Once we know what those rules are, we can use them to create new and powerful technology. Quantum computing will be the most revolutionary example of this.

    figure: x-img(src="images/atoms10.png" width=549 height=268)

To get you started on your journey towards quantum computing, let's test what you already know. Which of the following is the correct description of a bit?

::: .definebit

    div
        input(type="checkbox", id="blade", name="blade", value="blade")
        label A blade used by a carpenter.  
    div
        input(type="checkbox", id="unit", name="unit", value="unit")
        label The smallest unit of information: either a 0 or a 1.  
    div
        input(type="checkbox", id="horse", name="horse", value="horse")
        label Something you put in a horse's mouth.

:::

---

&nbsp;

Actually, they are all correct: it's a very multi-purpose word! But if you chose the second one, it shows that you are already thinking along the right lines. The idea that information can be stored and processed as a series of 0s and 1s is quite a big conceptual hurdle, but it's something most people today know without even thinking about it. Taking this as a starting point, we can start to imagine bits that obey the rules of quantum mechanics. These [quantum bits](gloss:qubit), or qubits, will then allow us to process information in new and different ways.

We'll start diving deeper into the world of qubits. For this, we'll need some way of keeping track of what they are doing when we apply gates. The most powerful way to do this is to use the mathematical language of vectors and matrices.

    figure: x-img(src="images/bloch.png" width=549 height=487)

This chapter will be most effective for readers who are already familiar with vectors and matrices. Those who aren't familiar will likely be fine too, though it might be useful to consult our [Introduction to Linear Algebra for Quantum Computing](https://qiskit.org/textbook/ch-appendix/linear_algebra.html) from time to time.

Since we will be using Qiskit, our Python-based framework for quantum computing, it would also be useful to know the basics of Python. Those who need a primer can consult the [Introduction to Python and Jupyter notebooks](https://qiskit.org/textbook/ch-prerequisites/python-and-jupyter-notebooks.html).


----------------------------------------------------------------------------------------------------


## The Atoms of Computation
---

Programming a quantum computer is now something that anyone can do in the comfort of their own home.

But what to create? What is a quantum program anyway? In fact, what is a quantum computer?

These questions can be answered by making comparisons to standard digital computers. Unfortunately, most people don’t actually understand how digital computers work either. In this article, we’ll look at the basics principles behind these devices. To help us transition over to quantum computing later on, we’ll do it using the same tools as we'll use for quantum.

Below is some Python code we'll need to run if we want to use the code in this page:

    pre(data-executable='true' data-language='python').
      from qiskit import QuantumCircuit, execute, Aer  
      from qiskit.visualization import plot_histogram

---

### 1. Splitting information into bits 

> id: binary-number-system
> goals: calculator

The first thing we need to know about is the idea of bits. These are designed to be the world’s simplest alphabet. With only two characters, 0 and 1, we can represent any piece of information.

One example is numbers. You are probably used to representing a number through a string of the ten digits 0, 1, 2, 3, 4, 5, 6, 7, 8, and 9. In this string of digits, each digit represents how many times the number contains a certain power of ten. For example, when we write 9213, we mean

``` latex
9000 + 200 + 10 + 3
```

or, expressed in a way that emphasizes the powers of ten

``` latex
(9 × 10^3) + (2 × 10^2) + (1 × 10^1) + (3 × 10^0)
```

Though we usually use this system based on the number 10, we can just as easily use one based on any other number. The binary number system, for example, is based on the number two. This means using the two characters 0 and 1 to express numbers as multiples of powers of two. For example, 9213 becomes 10001111111101, since

``` latex
9213 = & (1×2^{13})+(0×2^{12})+(0×2^{11})+(0×2^{10})+ \\
       & (1×2^9)+(1×2^8)+ (1×2^7)+(1×2^6)+(1×2^5)+ \\
       & (1×2^4)+(1×2^3)+(1×2^2)+(0×2^1)+(1×2^0)
```

In this we are expressing numbers as multiples of 2, 4, 8, 16, 32, etc. instead of 10, 100, 1000, etc.

    pre(data-executable='true' data-language='python').
      from qiskit_textbook.widgets import binary_widget
      binary_widget(nbits=5)

These strings of bits, known as binary strings, can be used to represent more than just numbers. For example, there is a way to represent any text using bits. For any letter, number, or punctuation mark you want to use, you can find a corresponding string of at most eight bits using [this table](https://www.ibm.com/support/knowledgecenter/en/ssw_aix_72/com.ibm.aix.networkcomm/conversion_table.htm). Though these are quite arbitrary, this is a widely agreed-upon standard. In fact, it's what was used to transmit this article to you through the internet.

This is how all information is represented in computers. Whether numbers, letters, images, or sound, it all exists in the form of binary strings.

Like our standard digital computers, quantum computers are based on this same basic idea. The main difference is that they use qubits, an extension of the bit to quantum mechanics. In the rest of this textbook, we will explore what qubits are, what they can do, and how they do it. In this section, however, we are not talking about quantum at all. So, we just use qubits as if they were bits.

::: .tabset

### Quick Exercises

::: tab

1. Think of a number and try to write it down in binary.
2. If you have _n_ bits, how many different states can they be in?

:::

:::

    .calculator
      h3 Binary Calculator
      p Decimal number:
      input(type="number", min=0, step=1, id="decinput")
      p Binary equivalent:
      input(type="text", id="bininput")
      .result.var(:html="result")

---

### 2. Computation as a diagram 

Whether we are using qubits or bits, we need to manipulate them in order to turn the inputs we have into the outputs we need. For the simplest programs with very few bits, it is useful to represent this process in a diagram known as a circuit diagram. These have inputs on the left, outputs on the right, and operations represented by arcane symbols in between. These operations are called 'gates', mostly for historical reasons.

Here's an example of what a circuit looks like for standard, bit-based computers. You aren't expected to understand what it does. It should simply give you an idea of what these circuits look like.

    figure: x-img(src="https://qiskit.org/textbook/ch-states/images/classical_circuit.png" width=377 height=211)

For quantum computers, we use the same basic idea but have different conventions for how to represent inputs, outputs, and the symbols used for operations. Here is the quantum circuit that represents the same process as above.

    figure: x-img(src="https://qiskit.org/textbook/ch-states/images/quantum_circuit.png" width=503 height=266)

In the rest of this section, we will explain how to build circuits. At the end, you'll know how to create the circuit above, what it does, and why it is useful.

---

### 3. Your first quantum circuit 

In a circuit, we typically need to do three jobs: First, encode the input, then do some actual computation, and finally extract an output. For your first quantum circuit, we'll focus on the last of these jobs. We start by creating a circuit with eight qubits and eight outputs.

    pre(data-executable='true' data-language='python').
      n = 8
      n_q = n
      n_b = n
      qc_output = QuantumCircuit(n_q,n_b)

This circuit, which we have called `{code}qc_output`, is created by Qiskit using `{code}QuantumCircuit`. The number `{code}n_q` defines the number of qubits in the circuit. With `{code}n_b` we define the number of output bits we will extract from the circuit at the end.

The extraction of outputs in a quantum circuit is done using an operation called measure. Each measurement tells a specific qubit to give an output to a specific output bit. The following code adds a measure operation to each of our eight qubits. The qubits and bits are both labelled by the numbers from 0 to 7 (because that’s how programmers like to do things). The command `{code}qc.measure(j,j)` adds a measurement to our circuit qc that tells qubit `{code}j` to write an output to bit `{code}j`.

    pre(data-executable='true' data-language='python').
        for j in range(n):
            qc_output.measure(j,j)

Now that our circuit has something in it, let's take a look at it.

    pre(data-executable='true' data-language='python').
        qc_output.draw()

![image]()

Qubits are always initialized to give the output `{code}0`. Since we don't do anything to our qubits in the circuit above, this is exactly the result we'll get when we measure them. We can see this by running the circuit many times and plotting the results in a histogram. We will find that the result is always [[00000000]]: a 0 from each qubit.

---

    pre(data-executable='true' data-language='python').
        counts = execute(qc_output,Aer.get_backend('qasm_simulator')).result().get_counts()
        plot_histogram(counts)

![image]()

The reason for running many times and showing the result as a histogram is because quantum computers may have some randomness in their results. In this case, since we aren’t doing anything quantum, we get just the `{code}00000000` result with certainty.

Note that this result comes from a quantum simulator, which is a standard computer calculating what an ideal quantum computer would do. Simulations are only possible for small numbers of qubits (~30 qubits), but they are nevertheless a very useful tool when designing your first quantum circuits. To run on a real device you simply need to replace `{code}Aer.get_backend('qasm_simulator')` with the backend object of the device you want to use.

----------------------------------------------------------------------------------------------------


## Representing Qubit States

TODO


----------------------------------------------------------------------------------------------------


## Single Qubit Gates

TODO


----------------------------------------------------------------------------------------------------


## The Case for Quantum

TODO
