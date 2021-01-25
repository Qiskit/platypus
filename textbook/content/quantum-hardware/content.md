# Investigating Quantum Hardware Using Quantum Circuits

## Introduction to Quantum Error Correction using Repetition Codes

### Introduction

Quantum computing requires us to encode information in qubits. Most quantum algorithms developed over the past few decades have assumed that these qubits are perfect: they can be prepared in any state we desire, and be manipulated with complete precision. Qubits that obey these assumptions are often known as logical qubits.

The last few decades have also seen great advances in finding physical systems that behave as qubits, with better quality qubits being developed all the time. However, the imperfections can never be removed entirely. These qubits will always be much too imprecise to serve directly as logical qubits. Instead, we refer to them as _physical qubits_.

In the current era of quantum computing, we seek to use physical qubits despite their imperfections, by designing custom algorithms and using error mitigation effects. For the future era of fault-tolerance, however, we must find ways to build logical qubits from physical qubits. This will be done through the process of quantum error correction, in which logical qubits are encoded in a large number of physical qubits. The encoding is maintained by constantly putting the physical qubits through a highly entangling circuit. Auxilliary degrees of freedom are also constantly measured, to detect signs of errors and allow their effects to be removed. The operations on the logical qubits required to implement quantum computation will be performed by essentially making small perturbations to this procedure.

Because of the vast amount of effort required for this process, most operations performed in fault-tolerant quantum computers will be done to serve the purpose of error detection and correction. So when benchmarking our progress towards fault-tolerant quantum computation, we must keep track of how well our devices perform error correction.

In this chapter we will look at a particular example of error correction: the repetition code. Though not a true example of quantum error correction - it uses physical qubits to encode a logical bit, rather than a qubit - it serves as a simple guide to all the basic concepts in any quantum error correcting code. We will also see how it can be run on current prototype devices.

---

### Introduction to the repetition code

#### The basics of error correction

The basic ideas behind error correction are the same for quantum information as for classical information. This allows us to begin by considering a very straightforward example: speaking on the phone. If someone asks you a question to which the answer is 'yes' or 'no', the way you give your response will depend on two factors:

- How important is it that you are understood correctly?
- How good is your connection?

Both of these can be paramaterized with probabilities. For the first, we can use `{latex} P_a`, the maximum acceptable probability of being misunderstood. If you are being asked to confirm a preference for ice cream flavours, and don't mind too much if you get vanilla rather than chocolate, `{latex} P_a` might be quite high. If you are being asked a question on which someone's life depends, however, `{latex} P_a` will be much lower.

For the second we can use `{latex} p`, the probability that your answer is garbled by a bad connection. For simplicity, let's imagine a case where a garbled 'yes' doesn't simply sound like nonsense, but sounds like a 'no'. And similarly a 'no' is transformed into 'yes'. Then `{latex} p` is the probability that you are completely misunderstood.

TODO


----------------------------------------------------------------------------------------------------


## Measurement Error Mitigation

    pre(data-executable='true' fata-language='python').
        from qiskit import QuantumCircuit, QuantumRegister, Aer, execute

### Introduction

The effect of noise is to give us outputs that are not quite correct. The effect of noise that occurs throughout a computation will be quite complex in general, as one would have to consider how each gate transforms the effect of each error.

A simpler form of noise is that occurring during final measurement. At this point, the only job remaining in the circuit is to extract a bit string as an output. For an `{latex} n` qubit final measurement, this means extracting one of the `{latex} 2^n` possible `{latex} n` bit strings. As a simple model of the noise in this process, we can imagine that the measurement first selects one of these outputs in a perfect and noiseless manner, and then noise subsequently causes this perfect output to be randomly perturbed before it is returned to the user.

Given this model, it is very easy to determine exactly what the effects of measurement errors are. We can simply prepare each of the `{latex} 2n` possible basis states, immediately measure them, and see what probability exists for each outcome.

As an example, we will first create a simple noise model, which randomly flips each bit in an output with probability `{latex} p`.

    pre(data-executable='true' fata-language='python').
        from qiskit.providers.aer.noise import NoiseModel
        from qiskit.providers.aer.noise.errors import pauli_error, depolarizing_error

        def get_noise(p):

            error_meas = pauli_error([('X',p), ('I', 1 - p)])

            noise_model = NoiseModel()
            noise_model.add_all_qubit_quantum_error(error_meas, "measure") # measurement error is applied to measurements
                
            return noise_model

TODO


----------------------------------------------------------------------------------------------------


## Randomized Benchmarking

### 1. Introduction

One of the main challenges in building a quantum information processor is the non-scalability of completely characterizing the noise affecting a quantum system via process tomography. In addition, process tomography is sensitive to noise in the pre- and post rotation gates plus the measurements (SPAM errors). Gateset tomography can take these errors into account, but the scaling is even worse. A complete characterization of the noise is useful because it allows for the determination of good error-correction schemes, and thus the possibility of reliable transmission of quantum information.

Since complete process tomography is infeasible for large systems, there is growing interest in scalable methods for partially characterizing the noise affecting a quantum system. A scalable (in the number `{latex} n` of qubits comprising the system) and robust algorithm for benchmarking the full set of Clifford gates by a single parameter using randomization techniques was presented in [1]. The concept of using randomization methods for benchmarking quantum gates is commonly called **Randomized Benchmarking (RB)**.


TODO


----------------------------------------------------------------------------------------------------

## Measuring Quantum Volume

### What is quantum volume?

#### Introduction

**Quantum Volume (QV)** is a single-number metric that can be measured using a concrete protocol on near-term quantum computers of modest size. The QV method quantifies the largest random circuit of equal width and depth that the computer successfully implements. Quantum computing systems with high-fidelity operations, high connectivity, large calibrated gate sets, and circuit rewriting toolchains are expected to have higher quantum volumes [gravity](gloss:gravity).



    p(data-vue-mount)
      This the start of a paragraph and this is a <Annotation content="highlight me" information="This is the tooltip content"/>

    p(data-vue-mount)
        Lorem ipsum test <Annotation content="annotated string" information="An annotated string is an interactive element that allows readers to see more information about a particular concept."/> within a sentence, as an inline element.
