# 0. Getting Started

## What is Quantum?

‘Quantum physics’ is a term widely used, but much less understood. It is a mathematical model first used to describe the behaviour of small things in a laboratory, which exposed gaps in the preceding theory of ‘classical’ physics. Quantum theory explains this behaviour and gives us a more complete picture of our universe. We have realised we can use this previously unexplained behaviour to perform certain computations which we previously did not believe possible. We call this quantum computing.

Quantum computing is the perfect way to dip your toes into quantum physics. It distils the core concepts from quantum physics into their simplest forms, stripping away the complications of the physical world. This page will take you on a short journey to discover (and explain!) some strange quantum phenomena, and give you a taste for what ‘quantum’ is.

---

### Review of Classical Probability 

To cover quantum phenomena, we need to first remind ourselves of 'classical' probabilities. In this sense, 'classical' just means pre-quantum, i.e. the normal probability trees you should have seen in school. If you're already familiar with this material, you should move through it quickly. If you're not so hot on this then don't worry- we'll only cover some of the simplest probability problems possible.

#### Probability Trees 

You will hopefully remember probability trees from school. The idea is simple, we use a drawing to map out every possible eventuality and from this, we can calculate the chance of it happening.

Say we have a coin, and to start we place it in the state Heads. If we then toss this fair coin and look at it, there is a 50% chance we will see Heads again, and a 50% chance of seeing Tails instead. We can plot this on a probability tree like so:

![](https://qiskit.org/textbook/images/whatis/whatis1.png)

We draw the outcomes on the end of each branch, and the probabilities of each occurrence on the branches. Similarly, if we started in the state Tails and tossed the coin, we would have a 50% chance of seeing Heads and a 50% chance of seeing tails.

![](https://qiskit.org/textbook/images/whatis/whatis2.png)

We can test this works is by trying it. You can physically get a coin out, flip it many times, and record each result; you will eventually see roughly 50% of your results are Heads and 50% tails. Around 500 to 1000 tosses should be enough to get reliable results.

---
> id: simulation
> goals: flip

#### Experiment #1: Single Coin Toss 

Too lazy to try this? Don’t worry! You can simulate the coin-tossing experiment by pressing the Toss Coin button below to simulate a coin toss and store the results. You can change the initial state to 'Heads' or 'Tails', or increase the number of coins (No. of Coins) slider to get many results quickly. Click Reset to discard your results and start again.

::: column(width=320)

    x-coin-flip(size="120,200")

    p.btn-row.var
        button.btn.btn-red(@click="flip()") Flip
        button.btn.btn-red(@click="flip(100)") Flip 100 times
        button.btn.btn-red(@click="reset()") Reset

::: column(width=320)

    x-coordinate-system(width=320 height=320 y-axis="0,1.1,0.2" padding="8 8 20 28" axis-names="flips,proportion heads")

You've done ${numberOfFlips} flips and seen ${numberOfHeads} heads.

:::

---

#### Going Further

It looks like our probability tree model correctly predicts the results of our experiments. We can go further and chain our probability trees together to predict the outcomes of chains of events. For example, let’s say we start in the state Heads, toss the coin, then _toss the coin again_, what would we see? We can work it out using the trees:

![](https://qiskit.org/textbook/images/whatis/whatis3.png)

You may remember from school that we multiply along the branches to calculate the probability of each combination of events:

![](https://qiskit.org/textbook/images/whatis/whatis4.gif)

We then add the results together to calculate the probability of each outcome:

![](https://qiskit.org/textbook/images/whatis/whatis5.gif)

And we can see the probability of seeing Heads after these two tosses is 50%, and the probability of seeing Tails after these two tosses is also 50%.

