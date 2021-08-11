/// <reference types="cypress" />

const pagesUrls = [
  '/course/ch-algorithms',
  '/course/ch-algorithms/quantum-circuits',
  '/course/ch-algorithms/deutsch-jozsa-algorithm',
  '/course/ch-algorithms/bernstein-vazirani-algorithm',
  '/course/ch-algorithms/simons-algorithm',
  '/course/ch-algorithms/quantum-fourier-transform',
  '/course/ch-algorithms/quantum-phase-estimation',
  '/course/ch-algorithms/shors-algorithm',
  '/course/ch-algorithms/grovers-algorithm',
  '/course/ch-algorithms/quantum-counting',
  '/course/ch-algorithms/quantum-teleportation',
  '/course/ch-algorithms/superdense-coding',
  '/course/ch-algorithms/quantum-key-distribution',

  '/course/ch-appendix',
  '/course/ch-appendix/an-introduction-to-linear-algebra-for-quantum-computing',
  '/course/ch-appendix/basic-qiskit-syntax',

  '/course/ch-applications',
  '/course/ch-applications/solving-linear-systems-of-equations-using-hhl-and-its-qiskit-implementation',
  '/course/ch-applications/simulating-molecules-using-vqe',
  '/course/ch-applications/solving-combinatorial-optimization-problems-using-qaoa',
  '/course/ch-applications/solving-satisfiability-problems-using-grovers-algorithm',
  '/course/ch-applications/hybrid-quantum-classical-neural-networks-with-pytorch-and-qiskit',
  '/course/ch-applications/the-variational-quantum-linear-solver',
  '/course/ch-applications/flexible-representation-of-quantum-images-frqi',

  '/course/ch-demos',
  '/course/ch-demos/bonus-level-sandbox',
  '/course/ch-demos/bonus-level-make-your-own-puzzles',
  '/course/ch-demos/level-5-proving-the-uniqueness-of-quantum-variables',
  '/course/ch-demos/estimating-pi-pi-using-quantum-phase-estimation-algorithm',
  '/course/ch-demos/local-reality-and-the-chsh-inequality',
  '/course/ch-demos/widgets-demonstration',

  '/course/ch-gates',
  '/course/ch-gates/introduction',
  '/course/ch-gates/multiple-qubits-and-entangled-states',
  '/course/ch-gates/phase-kickback',
  '/course/ch-gates/basic-circuit-identities',
  '/course/ch-gates/proving-universality',
  '/course/ch-gates/classical-computation-on-a-quantum-computer',

  '/course/ch-labs',
  '/course/ch-labs/lab-1-quantum-circuits',
  '/course/ch-labs/lab-2-quantum-measurements',
  '/course/ch-labs/lab-3-accuracy-of-quantum-phase-estimation',
  '/course/ch-labs/lab-4-iterative-phase-estimation-algorithm',
  '/course/ch-labs/lab-5-scalable-shors-algorithm',
  '/course/ch-labs/lab-6-grovers-search-with-an-unknown-number-of-solutions',
  '/course/ch-labs/lab-7-quantum-simulation-as-a-search-algorithm',

  '/course/ch-prerequisites',
  '/course/ch-prerequisites/environment-setup-guide-to-work-with-qiskit-textbook',
  '/course/ch-prerequisites/introduction-to-python-and-jupyter-notebooks',

  '/course/ch-states',
  '/course/ch-states/introduction',
  '/course/ch-states/the-atoms-of-computation',
  '/course/ch-states/representing-qubit-states',
  '/course/ch-states/single-qubit-gates',
  '/course/ch-states/the-case-for-quantum-computers',

  '/course/examples/annotations',
  '/course/examples/blocks',
  '/course/examples/widgets',

  '/course/introduction',
  '/course/introduction/why-quantum-computing',
  '/course/introduction/the-atoms-of-computation',
  '/course/introduction/what-is-quantum',
  '/course/introduction/describing-quantum-computers',
  '/course/introduction/entangled-states',
  '/course/introduction/visualizing-entanglement',
  '/course/introduction/grovers-search-algorithm',
  '/course/introduction/project',

  '/course/learning-qml',
  '/course/learning-qml/introduction',
  '/course/learning-qml/parametrized-quantum-circuits',
  '/course/learning-qml/data-encoding',
  '/course/learning-qml/quantum-feature-maps-and-kernels',
  '/course/learning-qml/variational-classification',

  '/course/learning-states-and-qubits',
  '/course/learning-states-and-qubits/introduction',
  '/course/learning-states-and-qubits/the-atoms-of-computation',
  '/course/learning-states-and-qubits/representing-qubit-states',
  '/course/learning-states-and-qubits/single-qubit-gates',
  '/course/learning-states-and-qubits/the-case-for-quantum-computers',

  '/course/quantum-hardware',
  '/course/quantum-hardware/introduction-to-quantum-error-correction-via-the-repetition-code',
  '/course/quantum-hardware/measurement-error-mitigation',
  '/course/quantum-hardware/randomized-benchmarking',
  '/course/quantum-hardware/measuring-quantum-volume',

  '/course/quantum-hardware-pulses',
  '/course/quantum-hardware-pulses/calibrating-qubits-using-qiskit-pulse',
  '/course/quantum-hardware-pulses/accessing-higher-energy-states-with-qiskit-pulse',
  '/course/quantum-hardware-pulses/introduction-to-transmon-physics',
  '/course/quantum-hardware-pulses/circuit-quantum-electrodynamics',
  '/course/quantum-hardware-pulses/exploring-the-jaynes-cummings-hamiltonian-with-qiskit-pulse',
  '/course/quantum-hardware-pulses/measuring-the-qubit-ac-stark-shift',
  '/course/quantum-hardware-pulses/hamiltonian-tomography'
]

describe('Every page', () => {
  pagesUrls.forEach((pageUrl) => {
    it('loads', () => {
      cy.request('GET', pageUrl, { responseTimeout: 3000 })
        .then((response) => {
          expect(response.status).to.eq(200)
        })
    })
  })
})
