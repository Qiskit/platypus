import { NavLink } from './../../../constants/menuLinks'

const wholeSection = 'whole-section'
const sectionBasicsCourse = 'basics-course'
const sectionIntroductionCourse = 'introduction-course'
const sectionQMLCourse = 'quantum-machine-learning'
const sectionPrerequisites = 'prerequisites'
const sectionQuantumStatesAndQubits = 'quantum-states-and-qubits'
const sectionMultipleQubitsAndEntanglement = 'multiple-qubits-and-entanglement'
const sectionGamesAndDemos = 'games-and-demos'
const sectionProtocolsAndAlgorithms = 'protocols-and-algorithms'
const sectionPulses = 'pulses'
const sectionApps = 'apps'
const sectionCircuits = 'circuits'
const sectionLabs = 'labs'
const sectionTutorials = 'tutorials'
const sectionSummerSchool = 'summer-schools'
const sectionProblemSets = 'problem-sets'

const pathBasicsCourse = '/course/basics'
const pathIntroductionCourse = '/course/introduction'
const pathQuantumMachineLearning = '/course/machine-learning'
const pathPrerequisites = '/course/ch-prerequisites'
const pathQuantumStatesAndQubits = '/course/ch-states'
const pathMultipleQubitsAndEntanglement = '/course/ch-gates'
const pathGamesAndDemos = '/course/ch-demos'
const pathProtocolsAndAlgorithms = '/course/ch-algorithms'
const pathPulses = '/course/quantum-hardware-pulses'
const pathHardwareUsingCircuits = '/course/quantum-hardware'
const pathApps = '/course/ch-applications'
const pathLabs = '/course/ch-labs'
const pathProblemSets = '/problem-sets'
const pathSummerSchool = '/summer-school'

const tutorialsBaseUrl = 'https://qiskit.org/documentation/tutorials'

type MegaDropdownMenuGroup = {
  title: NavLink,
  content: NavLink[]
}

const BASICS_COURSE: MegaDropdownMenuGroup = {
  title: {
    label: 'Basics of quantum information',
    url: `${pathBasicsCourse}`,
    segment: {
      cta: wholeSection, location: sectionBasicsCourse
    }
  },
  content: [
    {
      label: 'Single systems',
      url: `${pathBasicsCourse}/single-systems`,
      segment: {
        cta: 'single_systems', location: sectionBasicsCourse
      }
    },
    {
      label: 'Multiple systems',
      url: `${pathBasicsCourse}/multiple-systems`,
      segment: {
        cta: 'multiple_systems', location: sectionBasicsCourse
      }
    },
    {
      label: 'Circuits, protocols, and games',
      url: `${pathBasicsCourse}/circuits-protocols-games`,
      segment: {
        cta: 'circuits_protocols_and_games', location: sectionBasicsCourse
      }
    }
  ]
}

const INTRODUCTION_COURSE: MegaDropdownMenuGroup = {
  title: {
    label: 'Introduction Course',
    url: `${pathIntroductionCourse}`,
    segment: {
      cta: wholeSection, location: sectionIntroductionCourse
    }
  },
  content: [
    {
      label: 'Why Quantum Computing?',
      url: `${pathIntroductionCourse}/why-quantum-computing`,
      segment: {
        cta: 'why-quantum-computing', location: sectionIntroductionCourse
      }
    },
    {
      label: 'The Atoms of Computation',
      url: `${pathIntroductionCourse}/the-atoms-of-computation`,
      segment: {
        cta: 'the-atoms-of-computation', location: sectionIntroductionCourse
      }
    },
    {
      label: 'What is Quantum?',
      url: `${pathIntroductionCourse}/what-is-quantum`,
      segment: {
        cta: 'what-is-quantum', location: sectionIntroductionCourse
      }
    },
    {
      label: 'Describing Quantum Computers',
      url: `${pathIntroductionCourse}/describing-quantum-computers`,
      segment: {
        cta: 'describing-quantum-computers', location: sectionIntroductionCourse
      }
    },
    {
      label: 'Entangled States',
      url: `${pathIntroductionCourse}/entangled-states`,
      segment: {
        cta: 'entangled-states', location: sectionIntroductionCourse
      }
    },
    {
      label: 'Visualizing Entanglement',
      url: `${pathIntroductionCourse}/visualizing-entanglement`,
      segment: {
        cta: 'visualizing-entanglement', location: sectionIntroductionCourse
      }
    },
    {
      label: 'Grover\'s search algorithm',
      url: `${pathIntroductionCourse}/grovers-search-algorithm`,
      segment: {
        cta: 'grovers-search-algorithm', location: sectionIntroductionCourse
      }
    },
    {
      label: 'Project',
      url: `${pathIntroductionCourse}/project`,
      segment: {
        cta: 'project', location: sectionIntroductionCourse
      }
    }
  ]
}

const QML_COURSE: MegaDropdownMenuGroup = {
  title: {
    label: 'Quantum Machine Learning',
    url: `${pathQuantumMachineLearning}`,
    segment: {
      cta: wholeSection, location: sectionQMLCourse
    }
  },
  content: [
    {
      label: 'Introduction',
      url: `${pathQuantumMachineLearning}/introduction`,
      segment: {
        cta: 'introduction', location: sectionQMLCourse
      }
    },
    {
      label: 'Parameterized quantum circuits',
      url: `${pathQuantumMachineLearning}/parameterized-quantum-circuits`,
      segment: {
        cta: 'parameterized-quantum-circuits', location: sectionQMLCourse
      }
    },
    {
      label: 'Data encoding',
      url: `${pathQuantumMachineLearning}/data-encoding`,
      segment: {
        cta: 'data-encoding', location: sectionQMLCourse
      }
    },
    {
      label: 'Training parameterized quantum circuits',
      url: `${pathQuantumMachineLearning}/training-quantum-circuits`,
      segment: {
        cta: 'training-quantum-circuits', location: sectionQMLCourse
      }
    },
    {
      label: 'Supervised learning',
      url: `${pathQuantumMachineLearning}/supervised-learning`,
      segment: {
        cta: 'supervised-learning', location: sectionQMLCourse
      }
    },
    {
      label: 'Variational classification',
      url: `${pathQuantumMachineLearning}/variational-classification`,
      segment: {
        cta: 'variational-classification', location: sectionQMLCourse
      }
    },
    {
      label: 'Quantum feature maps and kernels',
      url: `${pathQuantumMachineLearning}/quantum-feature-maps-kernels`,
      segment: {
        cta: 'quantum-feature-maps-kernels', location: sectionQMLCourse
      }
    },
    {
      label: 'Unsupervised learning',
      url: `${pathQuantumMachineLearning}/unsupervised-learning`,
      segment: {
        cta: 'unsupervised-learning', location: sectionQMLCourse
      }
    },
    {
      label: 'Quantum generative adversarial networks',
      url: `${pathQuantumMachineLearning}/quantum-generative-adversarial-networks`,
      segment: {
        cta: 'quantum-generative-adversarial-networks', location: sectionQMLCourse
      }
    },
    {
      label: 'Project',
      url: `${pathQuantumMachineLearning}/project`,
      segment: {
        cta: 'project', location: sectionQMLCourse
      }
    }
  ]
}

const PREREQUISITES: MegaDropdownMenuGroup = {
  title: {
    label: 'Prerequisites',
    url: `${pathPrerequisites}`,
    segment: {
      cta: wholeSection, location: sectionPrerequisites
    }
  },
  content: [
    {
      label: 'Setting Up Your Environment',
      url: `${pathPrerequisites}/environment-setup-guide-to-work-with-qiskit-textbook`,
      segment: {
        cta: 'setting-the-environment', location: sectionPrerequisites
      }
    },
    {
      label: 'Python and Jupyter Notebooks',
      url: `${pathPrerequisites}/introduction-to-python-and-jupyter-notebooks`,
      segment: {
        cta: 'python-and-jupyter-notebooks', location: sectionPrerequisites
      }
    }
  ]
}

const QUANTUM_STATES_AND_QUBITS: MegaDropdownMenuGroup = {
  title: {
    label: 'Quantum States and Qubits',
    url: `${pathQuantumStatesAndQubits}`,
    segment: {
      cta: wholeSection, location: sectionQuantumStatesAndQubits
    }
  },
  content: [
    {
      label: 'Introduction',
      url: `${pathQuantumStatesAndQubits}/introduction`,
      segment: {
        cta: 'introduction', location: sectionQuantumStatesAndQubits
      }
    },
    {
      label: 'The Atoms of Computation',
      url: `${pathQuantumStatesAndQubits}/the-atoms-of-computation`,
      segment: {
        cta: 'the-atoms-of-computation', location: sectionQuantumStatesAndQubits
      }
    },
    {
      label: 'Representing Qubit States',
      url: `${pathQuantumStatesAndQubits}/representing-qubit-states`,
      segment: {
        cta: 'representing-qubit-states', location: sectionQuantumStatesAndQubits
      }
    },
    {
      label: 'Single Qubit Gates',
      url: `${pathQuantumStatesAndQubits}/single-qubit-gates`,
      segment: {
        cta: 'single-qubit-gates', location: sectionQuantumStatesAndQubits
      }
    },
    {
      label: 'The Case for Quantum',
      url: `${pathQuantumStatesAndQubits}/the-case-for-quantum-computers`,
      segment: {
        cta: 'the-case-for-quantum-computers', location: sectionQuantumStatesAndQubits
      }
    }
  ]
}

const MULTIPLE_QUBITS_AND_ENTANGLEMENT: MegaDropdownMenuGroup = {
  title: {
    label: 'Multiple Qubits and Entanglement',
    url: `${pathMultipleQubitsAndEntanglement}`,
    segment: {
      cta: wholeSection, location: sectionMultipleQubitsAndEntanglement
    }
  },
  content: [
    {
      label: 'Introduction',
      url: `${pathMultipleQubitsAndEntanglement}/introduction`,
      segment: {
        cta: 'introduction', location: sectionMultipleQubitsAndEntanglement
      }
    },
    {
      label: 'Multiple Qubits and Entangled States',
      url: `${pathMultipleQubitsAndEntanglement}/multiple-qubits-and-entangled-states`,
      segment: {
        cta: 'multiple-qubits-and-entangled-states', location: sectionMultipleQubitsAndEntanglement
      }
    },
    {
      label: 'Phase Kickback',
      url: `${pathMultipleQubitsAndEntanglement}/phase-kickback`,
      segment: {
        cta: 'phase-kickback', location: sectionMultipleQubitsAndEntanglement
      }
    },
    {
      label: 'Basic Circuit Identities',
      url: `${pathMultipleQubitsAndEntanglement}/basic-circuit-identities`,
      segment: {
        cta: 'basic-circuit-identities', location: sectionMultipleQubitsAndEntanglement
      }
    },
    {
      label: 'Proving Universality',
      url: `${pathMultipleQubitsAndEntanglement}/proving-universality`,
      segment: {
        cta: 'proving-universality', location: sectionMultipleQubitsAndEntanglement
      }
    },
    {
      label: 'Classical Computation on a Quantum Computer',
      url: `${pathMultipleQubitsAndEntanglement}/classical-computation-on-a-quantum-computer`,
      segment: {
        cta: 'classical-computation-on-a-quantum-computer', location: sectionMultipleQubitsAndEntanglement
      }
    }
  ]
}

const GAMES_AND_DEMOS: MegaDropdownMenuGroup = {
  title: {
    label: 'Games & Demos',
    url: `${pathGamesAndDemos}`,
    segment: {
      cta: wholeSection, location: sectionGamesAndDemos
    }
  },
  content: [
    {
      label: 'Bonus Level: Sandbox',
      url: `${pathGamesAndDemos}/bonus-level-sandbox`,
      segment: {
        cta: 'bonus-level-sandbox', location: sectionGamesAndDemos
      }
    },
    {
      label: 'Estimating Pi Using Quantum Phase Estimation Algorithm',
      url: `${pathGamesAndDemos}/estimating-pi-pi-using-quantum-phase-estimation-algorithm`,
      segment: {
        cta: 'estimating-pi-pi-using-quantum-phase-estimation-algorithm', location: sectionGamesAndDemos
      }
    },
    {
      label: 'Local Reality and the CHSH inequality',
      url: `${pathGamesAndDemos}/local-reality-and-the-chsh-inequality`,
      segment: {
        cta: 'local-reality-and-the-chsh-inequality', location: sectionGamesAndDemos
      }
    },
    {
      label: 'Widgets Demonstration',
      url: `${pathGamesAndDemos}/widgets-demonstration`,
      segment: {
        cta: 'widgets-demonstration', location: sectionGamesAndDemos
      }
    }
  ]
}

const QUANTUM_PROTOCOLS_AND_ALGORITHMS: MegaDropdownMenuGroup = {
  title: {
    label: 'Quantum Protocols and Quantum Algorithms',
    url: `${pathProtocolsAndAlgorithms}`,
    segment: {
      cta: wholeSection, location: sectionProtocolsAndAlgorithms
    }
  },
  content: [
    {
      label: 'Defining Quantum Circuits',
      url: `${pathProtocolsAndAlgorithms}/quantum-circuits`,
      segment: {
        cta: 'defining-quantum-circuits', location: sectionProtocolsAndAlgorithms
      }
    },
    {
      label: 'Deutsch-Jozsa Algorithm',
      url: `${pathProtocolsAndAlgorithms}/deutsch-jozsa-algorithm`,
      segment: {
        cta: 'deutsch-jozsa-algorithm', location: sectionProtocolsAndAlgorithms
      }
    },
    {
      label: 'Bernstein-Vazirani Algorithm',
      url: `${pathProtocolsAndAlgorithms}/bernstein-vazirani-algorithm`,
      segment: {
        cta: 'bernstein-vazirani-algorithm', location: sectionProtocolsAndAlgorithms
      }
    },
    {
      label: 'Simon\'s Algorithm',
      url: `${pathProtocolsAndAlgorithms}/simons-algorithm`,
      segment: {
        cta: 'simons-algorithm', location: sectionProtocolsAndAlgorithms
      }
    },
    {
      label: 'Quantum Fourier Transform',
      url: `${pathProtocolsAndAlgorithms}/quantum-fourier-transform`,
      segment: {
        cta: 'quantum-fourier-transform', location: sectionProtocolsAndAlgorithms
      }
    },
    {
      label: 'Quantum Phase Estimation',
      url: `${pathProtocolsAndAlgorithms}/quantum-phase-estimation`,
      segment: {
        cta: 'quantum-phase-estimation', location: sectionProtocolsAndAlgorithms
      }
    },
    {
      label: 'Shor\'s Algorithm',
      url: `${pathProtocolsAndAlgorithms}/shors-algorithm`,
      segment: {
        cta: 'shors-algorithm', location: sectionProtocolsAndAlgorithms
      }
    },
    {
      label: 'Grover\'s Algorithm',
      url: `${pathProtocolsAndAlgorithms}/grovers-algorithm`,
      segment: {
        cta: 'grovers-algorithm', location: sectionProtocolsAndAlgorithms
      }
    },
    {
      label: 'Quantum Counting',
      url: `${pathProtocolsAndAlgorithms}/quantum-counting`,
      segment: {
        cta: 'quantum-counting', location: sectionProtocolsAndAlgorithms
      }
    },
    {
      label: 'Quantum Teleportation',
      url: `${pathProtocolsAndAlgorithms}/quantum-teleportation`,
      segment: {
        cta: 'quantum-teleportation', location: sectionProtocolsAndAlgorithms
      }
    },
    {
      label: 'Superdense Coding',
      url: `${pathProtocolsAndAlgorithms}/superdense-coding`,
      segment: {
        cta: 'superdense-coding', location: sectionProtocolsAndAlgorithms
      }
    },
    {
      label: 'Quantum Key Distribution',
      url: `${pathProtocolsAndAlgorithms}/quantum-key-distribution`,
      segment: {
        cta: 'quantum-key-distribution', location: sectionProtocolsAndAlgorithms
      }
    }
  ]
}

const INVESTIGATING_Q_HW_USING_MICROWAVE_PULSES : MegaDropdownMenuGroup = {
  title: {
    label: 'Investigating Quantum Hardware Using Microwave Pulses',
    url: `${pathPulses}`,
    segment: {
      cta: wholeSection, location: sectionPulses
    }
  },
  content: [
    {
      label: 'Calibrating Qubits with Qiskit Pulse',
      url: `${pathPulses}/calibrating-qubits-using-qiskit-pulse`,
      segment: {
        cta: 'calibrating-qubits-using-qiskit-pulse', location: sectionPulses
      }
    },
    {
      label: 'Accessing Higher Energy States',
      url: `${pathPulses}/accessing-higher-energy-states-with-qiskit-pulse`,
      segment: {
        cta: 'accessing_higher_energy_states-with-qiskit-pulse', location: sectionPulses
      }
    },
    {
      label: 'Introduction to Transmon Physics',
      url: `${pathPulses}/introduction-to-transmon-physics`,
      segment: {
        cta: 'introduction-to-transmon-physics', location: sectionPulses
      }
    },
    {
      label: 'Circuit Quantum Electrodynamics',
      url: `${pathPulses}/circuit-quantum-electrodynamics`,
      segment: {
        cta: 'circuit-quantum-electrodynamics', location: sectionPulses
      }
    },
    {
      label: 'Exploring the Jaynes-Cummings Hamiltonian with Qiskit Pulse',
      url: `${pathPulses}/exploring-the-jaynes-cummings-hamiltonian-with-qiskit-pulse`,
      segment: {
        cta: 'exploring-the-jaynes-cummings-hamiltonian-with-qiskit-pulse', location: sectionPulses
      }
    },
    {
      label: 'Measuring the Qubit ac-Stark Shift',
      url: `${pathPulses}/measuring-the-qubit-ac-stark-shift`,
      segment: {
        cta: 'measuring-the-qubit-ac-stark-shift', location: sectionPulses
      }
    },
    {
      label: 'Hamiltonian Tomography',
      url: `${pathPulses}/hamiltonian-tomography`,
      segment: {
        cta: 'hamiltonian-tomography', location: sectionPulses
      }
    }
  ]
}

const QUANTUM_ALGORITHMS_FOR_APPS : MegaDropdownMenuGroup = {
  title: {
    label: 'Quantum Algorithms for Applications',
    url: `${pathApps}`,
    segment: {
      cta: wholeSection, location: sectionApps
    }
  },
  content: [
    {
      label: 'Solving Linear Systems of Equations using HHL',
      url: `${pathApps}/solving-linear-systems-of-equations-using-hhl-and-its-qiskit-implementation`,
      segment: {
        cta: 'solving-linear-systems-of-equations-using-hhl-and-its-qiskit-implementation', location: sectionApps
      }
    },
    {
      label: 'Simulating Molecules using VQE',
      url: `${pathApps}/simulating-molecules-using-vqe`,
      segment: {
        cta: 'simulating-molecules-using-vqe', location: sectionApps
      }
    },
    {
      label: 'Solving combinatorial optimization problems using QAOA',
      url: `${pathApps}/solving-combinatorial-optimization-problems-using-qaoa`,
      segment: {
        cta: 'solving-combinatorial-optimization-problems-using-qaoa', location: sectionApps
      }
    },
    {
      label: 'Solving Satisfiability Problems using Grover\'s Algorithm',
      url: `${pathApps}/solving-satisfiability-problems-using-grovers-algorithm`,
      segment: {
        cta: 'solving-satisfiability-problems-using-grovers-algorithm', location: sectionApps
      }
    },
    {
      label: 'Hybrid quantum-classical Neural Networks with PyTorch and Qiskit',
      url: `${pathApps}/hybrid-quantum-classical-neural-networks-with-pytorch-and-qiskit`,
      segment: {
        cta: 'hybrid-quantum-classical-neural-networks-with-pytorch-and-qiskit', location: sectionApps
      }
    },
    {
      label: 'Variational Quantum Linear Solver',
      url: `${pathApps}/the-variational-quantum-linear-solver`,
      segment: {
        cta: 'the-variational-quantum-linear-solver', location: sectionApps
      }
    },
    {
      label: 'Quantum Image Processing - FRQI and NEQR Image Representations',
      url: `${pathApps}/flexible-representation-of-quantum-images-frqi`,
      segment: {
        cta: 'flexible-representation-of-quantum-images-frqi', location: sectionApps
      }
    }
  ]
}

const INVESTIGATING_Q_HW_USING_Q_CIRCUITS : MegaDropdownMenuGroup = {
  title: {
    label: 'Investigating Quantum Hardware Using Quantum Circuits',
    url: `${pathHardwareUsingCircuits}`,
    segment: {
      cta: wholeSection, location: sectionCircuits
    }
  },
  content: [
    {
      label: 'Introduction to Quantum Error Correction using Repetition Codes',
      url: `${pathHardwareUsingCircuits}/introduction-to-quantum-error-correction-via-the-repetition-code`,
      segment: {
        cta: 'introduction-to-quantum-error-correction-via-the-repetition-code', location: sectionCircuits
      }
    },
    {
      label: 'Measurement Error Mitigation',
      url: `${pathHardwareUsingCircuits}/measurement-error-mitigation`,
      segment: {
        cta: 'measurement-error-mitigation', location: sectionCircuits
      }
    },
    {
      label: 'Randomized Benchmarking',
      url: `${pathHardwareUsingCircuits}/randomized-benchmarking`,
      segment: {
        cta: 'randomized-benchmarking', location: sectionCircuits
      }
    },
    {
      label: 'Measuring Quantum Volume',
      url: `${pathHardwareUsingCircuits}/measuring-quantum-volume`,
      segment: {
        cta: 'measuring-quantum-volume', location: sectionCircuits
      }
    },
    {
      label: 'The Density Matrix & Mixed States',
      url: `${pathHardwareUsingCircuits}/density-matrix`,
      segment: {
        cta: 'density-matrix', location: sectionCircuits
      }
    }
  ]
}

const QUANTUM_COMPUTING_LABS : MegaDropdownMenuGroup = {
  title: {
    label: 'Quantum Computing Labs',
    url: `${pathLabs}`,
    segment: {
      cta: wholeSection, location: sectionLabs
    }
  },
  content: [
    {
      label: 'Lab 1. Quantum Circuits',
      url: `${pathLabs}/lab-1-quantum-circuits`,
      segment: {
        cta: 'lab-1-quantum-circuits', location: sectionLabs
      }
    },
    {
      label: 'Lab 2. Single Qubit Gates',
      url: `${pathLabs}/lab-2-single-qubit-gates`,
      segment: {
        cta: 'lab-2-single-qubit-gates', location: sectionLabs
      }
    },
    {
      label: 'Lab 3. Quantum Measurement',
      url: `${pathLabs}/lab-3-quantum-measurements`,
      segment: {
        cta: 'lab-3-quantum-measurements', location: sectionLabs
      }
    },
    {
      label: 'Lab 4. Bell Circuit & GHZ Circuit',
      url: `${pathLabs}/lab-4-bell-ghz-circuit`,
      segment: {
        cta: 'lab-4-bell-ghz-circuit', location: sectionLabs
      }
    },
    {
      label: 'Lab 5. Accuracy of Quantum Phase Estimation',
      url: `${pathLabs}/lab-5-accuracy-of-quantum-phase-estimation`,
      segment: {
        cta: 'lab-5-accuracy-of-quantum-phase-estimation', location: sectionLabs
      }
    },
    {
      label: 'Lab 6. Iterative Phase Estimation Algorithm',
      url: `${pathLabs}/lab-6-iterative-phase-estimation-algorithm`,
      segment: {
        cta: 'lab-6-iterative-phase-estimation-algorithm', location: sectionLabs
      }
    },
    {
      label: 'Lab 7. Scalable Shor’s Algorithm',
      url: `${pathLabs}/lab-7-scalable-shors-algorithm`,
      segment: {
        cta: 'lab-7-scalable-shors-algorithm', location: sectionLabs
      }
    },
    {
      label: 'Lab 8. Grover’s search with an unknown number of solutions',
      url: `${pathLabs}/lab-8-grovers-search-with-an-unknown-number-of-solutions`,
      segment: {
        cta: 'lab-8-grovers-search-with-an-unknown-number-of-solutions', location: sectionLabs
      }
    },
    {
      label: 'Lab 9. Quantum Simulation as a Search Algorithm',
      url: `${pathLabs}/lab-9-quantum-simulation-as-a-search-algorithm`,
      segment: {
        cta: 'lab-9-quantum-simulation-as-a-search-algorithm', location: sectionLabs
      }
    }
  ]
}

const PROBLEM_SETS : MegaDropdownMenuGroup = {
  title: {
    label: 'Problem Sets',
    url: `${pathProblemSets}`,
    segment: {
      cta: wholeSection, location: sectionProblemSets
    }
  },
  content: [
    {
      label: 'Single Systems - Problem Set',
      url: `${pathProblemSets}/single_systems_problem_set`,
      segment: {
        cta: 'single_systems_problem_set', location: sectionProblemSets
      }
    },
    {
      label: 'Quantum Enigma 001 - Problem Set',
      url: `${pathProblemSets}/quantum_enigma_problem_set`,
      segment: {
        cta: 'quantum_enigma_problem_set', location: sectionProblemSets
      }
    }
  ]
}

const QUANTUM_CIRCUITS: MegaDropdownMenuGroup = {
  title: {
    label: 'Quantum Computing Labs',
    url: 'https://qiskit.org/documentation/tutorials.html#quantum-circuits',
    segment: {
      cta: wholeSection, location: sectionTutorials
    }
  },
  content: [
    {
      label: 'Circuit Basics',
      url: `${tutorialsBaseUrl}/circuits/01_circuit_basics.html`,
      segment: {
        cta: '01_circuit_basics', location: sectionTutorials
      }
    },
    {
      label: 'Getting Started with Qiskit',
      url: `${tutorialsBaseUrl}/circuits/1_getting_started_with_qiskit.html`,
      segment: {
        cta: '1_getting_started_with_qiskit', location: sectionTutorials
      }
    },
    {
      label: 'Qiskit Visualizations',
      url: `${tutorialsBaseUrl}/circuits/2_plotting_data_in_qiskit.html`,
      segment: {
        cta: '2_plotting_data_in_qiskit', location: sectionTutorials
      }
    },
    {
      label: 'Summary of Quantum Operations',
      url: `${tutorialsBaseUrl}/circuits/3_summary_of_quantum_operations.html`,
      segment: {
        cta: '3_summary_of_quantum_operations', location: sectionTutorials
      }
    },
    {
      label: 'Circuit Tutorials',
      url: `${tutorialsBaseUrl}/circuits/index.html`,
      segment: {
        cta: 'circuit_tutorials', location: sectionTutorials
      }
    }
  ]
}

const ADVANCED_CIRCUITS: MegaDropdownMenuGroup = {
  title: {
    label: 'Advanced Circuits',
    url: 'https://qiskit.org/documentation/tutorials.html#advanced-circuits',
    segment: {
      cta: wholeSection, location: sectionTutorials
    }
  },
  content: [
    {
      label: 'Advanced Circuits',
      url: `${tutorialsBaseUrl}/circuits_advanced/01_advanced_circuits.html`,
      segment: {
        cta: '01_advanced_circuits', location: sectionTutorials
      }
    },
    {
      label: 'Operators',
      url: `${tutorialsBaseUrl}/circuits_advanced/02_operators_overview.html`,
      segment: {
        cta: '02_operators_overview', location: sectionTutorials
      }
    },
    {
      label: 'Visualizing a Quantum Circuit',
      url: `${tutorialsBaseUrl}/circuits_advanced/03_advanced_circuit_visualization.html`,
      segment: {
        cta: '03_advanced_circuit_visualization', location: sectionTutorials
      }
    },
    {
      label: 'Transpiler Passes and Pass Manager',
      url: `${tutorialsBaseUrl}/circuits_advanced/04_transpiler_passes_and_passmanager.html`,
      segment: {
        cta: '04_transpiler_passes_and_passmanager', location: sectionTutorials
      }
    },
    {
      label: 'Pulse gates',
      url: `${tutorialsBaseUrl}/circuits_advanced/05_pulse_gates.html`,
      segment: {
        cta: '05_pulse_gates', location: sectionTutorials
      }
    },
    {
      label: 'Building Pulse Schedules',
      url: `${tutorialsBaseUrl}/circuits_advanced/06_building_pulse_schedules.html`,
      segment: {
        cta: '06_building_pulse_schedules', location: sectionTutorials
      }
    },
    {
      label: 'Using the Scheduler',
      url: `${tutorialsBaseUrl}circuits_advanced/07_pulse_scheduler.html`,
      segment: {
        cta: '07_pulse_scheduler', location: sectionTutorials
      }
    },
    {
      label: 'Obtaining information about your backend',
      url: `${tutorialsBaseUrl}/circuits_advanced/08_gathering_system_information.html`,
      segment: {
        cta: '08_gathering_system_information', location: sectionTutorials
      }
    },
    {
      label: 'Advanced Circuit Tutorials',
      url: `${tutorialsBaseUrl}/circuits_advanced/index.html`,
      segment: {
        cta: 'advanced_circuit_tutorials', location: sectionTutorials
      }
    }
  ]
}

const CLASSICAL_SIMULATORS: MegaDropdownMenuGroup = {
  title: {
    label: 'Classical Simulators',
    url: 'https://qiskit.org/documentation/tutorials.html#advanced-circuits',
    segment: {
      cta: wholeSection, location: sectionTutorials
    }
  },
  content: [
    {
      label: 'Simulators',
      url: `${tutorialsBaseUrl}/simulators/1_aer_provider.html`,
      segment: {
        cta: '01_advanced_circuits', location: sectionTutorials
      }
    },
    {
      label: 'Device backend noise model simulations',
      url: `${tutorialsBaseUrl}/simulators/2_device_noise_simulation.html`,
      segment: {
        cta: '2_device_noise_simulation', location: sectionTutorials
      }
    },
    {
      label: 'Building Noise Models',
      url: `${tutorialsBaseUrl}/simulators/3_building_noise_models.html`,
      segment: {
        cta: '3_building_noise_models', location: sectionTutorials
      }
    },
    {
      label: 'Applying noise to custom unitary gates',
      url: `${tutorialsBaseUrl}/simulators/4_custom_gate_noise.html`,
      segment: {
        cta: '4_custom_gate_noise', location: sectionTutorials
      }
    },
    {
      label: 'Noise Transformation',
      url: `${tutorialsBaseUrl}/simulators/5_noise_transformation.html`,
      segment: {
        cta: '5_noise_transformation', location: sectionTutorials
      }
    },
    {
      label: 'The Extended Stabilizer Simulator',
      url: `${tutorialsBaseUrl}/simulators/6_extended_stabilizer_tutorial.html`,
      segment: {
        cta: '6_extended_stabilizer_tutorial', location: sectionTutorials
      }
    },
    {
      label: 'Matrix product state simulation method',
      url: `${tutorialsBaseUrl}/simulators/7_matrix_product_state_method.html`,
      segment: {
        cta: '7_matrix_product_state_method', location: sectionTutorials
      }
    },
    {
      label: 'High-Performance Simulator Tutorials',
      url: `${tutorialsBaseUrl}/simulators/index.html`,
      segment: {
        cta: 'high_performance_simulator_tutorials', location: sectionTutorials
      }
    }
  ]
}

const ALGORITHMS: MegaDropdownMenuGroup = {
  title: {
    label: 'Algorithms',
    url: 'https://qiskit.org/documentation/tutorials.html#algorithms',
    segment: {
      cta: wholeSection, location: sectionTutorials
    }
  },
  content: [
    {
      label: 'An Introduction to Algorithms in Qiskit',
      url: `${tutorialsBaseUrl}/algorithms/01_algorithms_introduction.html`,
      segment: {
        cta: '01_algorithms_introduction', location: sectionTutorials
      }
    },
    {
      label: 'Monitoring VQE convergence',
      url: `${tutorialsBaseUrl}/algorithms/02_vqe_convergence.html`,
      segment: {
        cta: '02_vqe_convergence', location: sectionTutorials
      }
    },
    {
      label: 'VQE on Aer simulator with noise',
      url: `${tutorialsBaseUrl}/algorithms/03_vqe_simulation_with_noise.html`,
      segment: {
        cta: '03_vqe_simulation_with_noise', location: sectionTutorials
      }
    },
    {
      label: 'Advanced VQE usage',
      url: `${tutorialsBaseUrl}/tutorials/algorithms/04_vqe_advanced.html`,
      segment: {
        cta: '04_vqe_advanced', location: sectionTutorials
      }
    },
    {
      label: 'Quantum Approximate Optimization Algorithm',
      url: `${tutorialsBaseUrl}/algorithms/05_qaoa.html`,
      segment: {
        cta: '05_qaoa', location: sectionTutorials
      }
    },
    {
      label: 'Grover’s Algorithm and Amplitude Amplification',
      url: `${tutorialsBaseUrl}/algorithms/06_grover.html`,
      segment: {
        cta: '06_grover', location: sectionTutorials
      }
    },
    {
      label: 'Grover’s algorithm examples',
      url: `${tutorialsBaseUrl}/algorithms/07_grover_examples.html`,
      segment: {
        cta: '07_grover_examples', location: sectionTutorials
      }
    },
    {
      label: 'Shor’s algorithms',
      url: `${tutorialsBaseUrl}/algorithms/08_factorizers.html`,
      segment: {
        cta: '08_factorizers', location: sectionTutorials
      }
    },
    {
      label: 'Iterative Quantum Phase Estimation Algorithm',
      url: `${tutorialsBaseUrl}/algorithms/09_IQPE.html`,
      segment: {
        cta: '09_IQPE', location: sectionTutorials
      }
    },
    {
      label: 'Algorithms Tutorials',
      url: `${tutorialsBaseUrl}/algorithms/index.html`,
      segment: {
        cta: 'algorithms_tutorials', location: sectionTutorials
      }
    }
  ]
}

const OPERATORS: MegaDropdownMenuGroup = {
  title: {
    label: 'Operators',
    url: 'https://qiskit.org/documentation/tutorials.html#operators',
    segment: {
      cta: wholeSection, location: sectionTutorials
    }
  },
  content: [
    {
      label: 'Operator Flow',
      url: `${tutorialsBaseUrl}/operators/01_operator_flow.html`,
      segment: {
        cta: '01_operator_flow', location: sectionTutorials
      }
    },
    {
      label: 'Qiskit Gradient Framework',
      url: `${tutorialsBaseUrl}/operators/02_gradients_framework.html`,
      segment: {
        cta: '02_gradients_framework', location: sectionTutorials
      }
    },
    {
      label: 'Operators Tutorials',
      url: `${tutorialsBaseUrl}/operators/index.html`,
      segment: {
        cta: 'operators_tutorials', location: sectionTutorials
      }
    }
  ]
}

const SAMPLE_ALGORITHMS_IN_QISKIT: MegaDropdownMenuGroup = {
  title: {
    label: 'Sample Algorithms in Qiskit',
    url: 'https://qiskit.org/documentation/tutorials.html#operators',
    segment: {
      cta: wholeSection, location: sectionTutorials
    }
  },
  content: [
    {
      label: 'Iterative Quantum Phase Estimation Algorithm',
      url: `${tutorialsBaseUrl}/textbook/01_IQPE.html`,
      segment: {
        cta: '01_IQPE', location: sectionTutorials
      }
    },
    {
      label: 'Textbook algorithms in Qiskit',
      url: `${tutorialsBaseUrl}/textbook/index.html`,
      segment: {
        cta: 'textbook-algorithms-in-qiskit', location: sectionTutorials
      }
    }
  ]
}

const SUMMER_SCHOOL_2020: MegaDropdownMenuGroup = {
  title: {
    label: 'Summer school 2020',
    url: 'https://learn.qiskit.org/summer-school/2020',
    segment: {
      cta: wholeSection, location: sectionSummerSchool
    }
  },
  content: [
    {
      label: 'Qubits and Quantum States, Quantum Circuits, Measurements',
      url: `${pathSummerSchool}/2020/qubits-states-circuits-measurements`,
      segment: {
        cta: 'qubits-states-circuits-measurements', location: sectionSummerSchool
      }
    },
    {
      label: 'Writing and Running Quantum Programs',
      url: `${pathSummerSchool}/2020/writing-running-programs`,
      segment: {
        cta: 'writing-running-programs', location: sectionSummerSchool
      }
    },
    {
      label: 'Shor\'s Algorithm I Quantum Fourier Transform, Quantum Phase Estimation',
      url: `${pathSummerSchool}/2020/shors-algorithm-i-fourier-transform-phase-estimation`,
      segment: {
        cta: 'shors-algorithm-i-fourier-transform-phase-estimation', location: sectionSummerSchool
      }
    },
    {
      label: 'Shor\'s Algorithm II From Factoring to Period-Finding, Writing the Quantum Program',
      url: `${pathSummerSchool}/2020/shors-algorithm-ii-from-factoring-to-period-finding-writing-program`,
      segment: {
        cta: 'shors-algorithm-ii-from-factoring-to-period-finding-writing-program', location: sectionSummerSchool
      }
    },
    {
      label: 'Quantum Error Correction using Repetition Codes',
      url: `${pathSummerSchool}/2020/error-correction-using-repetition-codes`,
      segment: {
        cta: 'error-correction-using-repetition-codes', location: sectionSummerSchool
      }
    },
    {
      label: 'Superconducting Qubits I Quantizing a Harmonic Oscillator, Josephson Junctions',
      url: `${pathSummerSchool}/2020/superconducting-qubits-i-quantizingharmonic-oscillator-josephson-junctions`,
      segment: {
        cta: 'superconducting-qubits-i-quantizingharmonic-oscillator-josephson-junctions', location: sectionSummerSchool
      }
    },
    {
      label: 'Superconducting Qubits II Circuit Quantum Electrodynamics, Readout and Calibration Methods',
      url: `${pathSummerSchool}/2020/superconducting-qubits-ii-circuit-electrodynamics-readout-calibration-methods`,
      segment: {
        cta: 'superconducting-qubits-ii-circuit-electrodynamics-readout-calibration-methods', location: sectionSummerSchool
      }
    },
    {
      label: 'Quantum Chemistry I Obtaining the Qubit Hamiltonian for H2 and LiH',
      url: `${pathSummerSchool}/2020/chemistry-i-obtaining-qubit-hamiltonian-h2-lih`,
      segment: {
        cta: 'chemistry-i-obtaining-qubit-hamiltonian-h2-lih', location: sectionSummerSchool
      }
    },
    {
      label: 'Quantum Chemistry II Finding the Ground States of H2 and LiH',
      url: `${pathSummerSchool}/2020/chemistry-ii-finding-ground-states-h2-lih`,
      segment: {
        cta: 'chemistry-ii-finding-ground-states-h2-lih', location: sectionSummerSchool
      }
    },
    {
      label: 'Careers in Quantum Computing',
      url: `${pathSummerSchool}/2020/careers-in-computing`,
      segment: {
        cta: 'careers-in-computing', location: sectionSummerSchool
      }
    }
  ]
}

const SUMMER_SCHOOL_2021: MegaDropdownMenuGroup = {
  title: {
    label: 'Summer school 2021',
    url: 'https://learn.qiskit.org/summer-school/2021',
    segment: {
      cta: wholeSection, location: sectionSummerSchool
    }
  },
  content: [
    {
      label: 'Vector Spaces, Tensor Products, and Qubits',
      url: `${pathSummerSchool}/2021/lec1-1-vector-spaces-tensor-products-qubits`,
      segment: {
        cta: 'lec1-1-vector-spaces-tensor-products-qubits', location: sectionSummerSchool
      }
    },
    {
      label: 'Introduction to Quantum Circuits',
      url: `${pathSummerSchool}/2021/lec1-2-introduction-quantum-circuits`,
      segment: {
        cta: 'lec1-2-introduction-quantum-circuits', location: sectionSummerSchool
      }
    },
    {
      label: 'Simple Quantum Algorithms I',
      url: `${pathSummerSchool}/2021/lec2-1-simple-quantum-algorithms-i`,
      segment: {
        cta: 'lec2-1-simple-quantum-algorithms-i', location: sectionSummerSchool
      }
    },
    {
      label: 'Simple Quantum Algorithms II',
      url: `${pathSummerSchool}/2021/lec2-2-simple-quantum-algorithms-ii`,
      segment: {
        cta: 'lec2-2-simple-quantum-algorithms-ii', location: sectionSummerSchool
      }
    },
    {
      label: 'Noise in Quantum Computers pt 1',
      url: `${pathSummerSchool}/2021/lec3-1-noise-quantum-computers-1`,
      segment: {
        cta: 'lec3-1-noise-quantum-computers-1', location: sectionSummerSchool
      }
    },
    {
      label: 'Noise in Quantum Computers pt 2',
      url: `${pathSummerSchool}/2021/lec3-2-noise-quantum-computers-pt-2`,
      segment: {
        cta: 'lec3-2-noise-quantum-computers-pt-2', location: sectionSummerSchool
      }
    },
    {
      label: 'Lab 1',
      url: `${pathSummerSchool}/2021/lab1-quantum-computing-algorithm-operations`,
      segment: {
        cta: 'lab1-quantum-computing-algorithm-operations', location: sectionSummerSchool
      }
    },
    {
      label: 'Introduction to Classical Machine Learning',
      url: `${pathSummerSchool}/2021/lec4-1-introduction-classical-machine-learning`,
      segment: {
        cta: 'lec4-1-introduction-classical-machine-learning', location: sectionSummerSchool
      }
    },
    {
      label: 'Advanced Classical Machine Learning',
      url: `${pathSummerSchool}/2021/lec4-2-advanced-classical-machine-learning`,
      segment: {
        cta: 'lec4-2-advanced-classical-machine-learning', location: sectionSummerSchool
      }
    },
    {
      label: 'Building a Quantum Classifier',
      url: `${pathSummerSchool}/2021/lec5-1-building-quantum-classifier`,
      segment: {
        cta: 'lec5-1-building-quantum-classifier', location: sectionSummerSchool
      }
    },
    {
      label: 'Introduction to the Quantum Approximate Optimization Algorithm and Applications',
      url: `${pathSummerSchool}/2021/lec5-2-introduction-quantum-approximate-optimization-algorithm-applications`,
      segment: {
        cta: 'lec5-2-introduction-quantum-approximate-optimization-algorithm-applications', location: sectionSummerSchool
      }
    },
    {
      label: 'Lab 2',
      url: `${pathSummerSchool}/2021/lab2-variational-algorithms`,
      segment: {
        cta: 'lab2-variational-algorithms', location: sectionSummerSchool
      }
    },
    {
      label: 'From Variational Classifiers to Linear Classifiers',
      url: `${pathSummerSchool}/2021/lec6-1-from-variational-classifiers-linear-classifiers`,
      segment: {
        cta: 'lec6-1-from-variational-classifiers-linear-classifiers', location: sectionSummerSchool
      }
    },
    {
      label: 'Quantum Feature Spaces and Kernels',
      url: `${pathSummerSchool}/2021/lec6-2-quantum-feature-spaces-kernels`,
      segment: {
        cta: 'lec6-2-quantum-feature-spaces-kernels', location: sectionSummerSchool
      }
    },
    {
      label: 'Quantum Kernels in Practice',
      url: `${pathSummerSchool}/2021/lec7-1-quantum-kernels-practice`,
      segment: {
        cta: 'lec7-1-quantum-kernels-practice', location: sectionSummerSchool
      }
    },
    {
      label: 'Lab 3',
      url: `${pathSummerSchool}/2021/lab3-introduction-quantum-kernels-support-vector-machines`,
      segment: {
        cta: 'lab3-introduction-quantum-kernels-support-vector-machines', location: sectionSummerSchool
      }
    },
    {
      label: 'Introduction and Applications of Quantum Models',
      url: `${pathSummerSchool}/2021/lec8-1-introduction-applications-quantum-models`,
      segment: {
        cta: 'lec8-1-introduction-applications-quantum-models', location: sectionSummerSchool
      }
    },
    {
      label: 'Barren Plateaus, Trainability Issues, and How to Avoid Them',
      url: `${pathSummerSchool}/2021/lec8-2-barren-plateaus-trainability-issues-how-avoid-them`,
      segment: {
        cta: 'lec8-2-barren-plateaus-trainability-issues-how-avoid-them', location: sectionSummerSchool
      }
    },
    {
      label: 'Lab 4',
      url: `${pathSummerSchool}/2021/lab4-introduction-training-quantum-circuits`,
      segment: {
        cta: 'lab4-introduction-training-quantum-circuits', location: sectionSummerSchool
      }
    },
    {
      label: 'Introduction to Quantum Hardware',
      url: `${pathSummerSchool}/2021/lec9-1-introduction-quantum-hardware`,
      segment: {
        cta: 'lec9-1-introduction-quantum-hardware', location: sectionSummerSchool
      }
    },
    {
      label: 'Hardware Efficient Ansatze for Quantum Machine Learning',
      url: `${pathSummerSchool}/2021/lec9-2-hardware-efficient-ansatze-quantum-machine-learning`,
      segment: {
        cta: 'lec9-2-hardware-efficient-ansatze-quantum-machine-learning', location: sectionSummerSchool
      }
    },
    {
      label: 'Lab 5',
      url: `${pathSummerSchool}/2021/lab5-introduction-hardware-efficient-ansatze-quantum-machine-learning`,
      segment: {
        cta: 'lab5-introduction-hardware-efficient-ansatze-quantum-machine-learning', location: sectionSummerSchool
      }
    },
    {
      label: 'Advanced QML Algorithms',
      url: `${pathSummerSchool}/2021/lec10-1-advanced-qml-algorithms`,
      segment: {
        cta: 'lec10-1-advanced-qml-algorithms', location: sectionSummerSchool
      }
    },
    {
      label: 'The Capacity and Power of Quantum Machine Learning Models & the Future of Quantum Machine Learning',
      url: `${pathSummerSchool}/2021/lec10-2-the-capacity-power-quantum-machine-learning-models-future-quantum-machine-learning`,
      segment: {
        cta: 'lec10-2-the-capacity-power-quantum-machine-learning-models-future-quantum-machine-learning', location: sectionSummerSchool
      }
    }
  ]
}

const SUMMER_SCHOOL_2022: MegaDropdownMenuGroup = {
  title: {
    label: 'Summer school 2022',
    url: 'https://learn.qiskit.org/summer-school/2022',
    segment: {
      cta: wholeSection, location: sectionSummerSchool
    }
  },
  content: [
    {
      label: 'History of Quantum Computing and Motivation for Quantum Simulation',
      url: `${pathSummerSchool}/2022/history-quantum-computing-motivation-quantum-simulation`,
      segment: {
        cta: 'history-quantum-computing-motivation-quantum-simulation', location: sectionSummerSchool
      }
    },
    {
      label: 'Introduction to Linear Algebra, Prerequisite Mathematics, and Circuit Composition',
      url: `${pathSummerSchool}/2022/introduction-linear-algebra-prerequisite-mathematics-circuit-composition`,
      segment: {
        cta: 'introduction-linear-algebra-prerequisite-mathematics-circuit-composition', location: sectionSummerSchool
      }
    },
    {
      label: 'Lab 1',
      url: `${pathSummerSchool}/2022/lab-1`,
      segment: {
        cta: 'lab-1', location: sectionSummerSchool
      }
    },
    {
      label: 'Hamiltonian Time Evolution',
      url: `${pathSummerSchool}/2022/hamiltonian-time-evolution`,
      segment: {
        cta: 'hamiltonian-time-evolution', location: sectionSummerSchool
      }
    },
    {
      label: 'Simulation Problems',
      url: `${pathSummerSchool}/2022/simulation-problems`,
      segment: {
        cta: 'simulation-problems', location: sectionSummerSchool
      }
    },
    {
      label: 'Lab 2',
      url: `${pathSummerSchool}/2022/lab-2`,
      segment: {
        cta: 'lab-2', location: sectionSummerSchool
      }
    },
    {
      label: 'Noisy Real Hardware, Noise in Quantum Computers',
      url: `${pathSummerSchool}/2022/noisy-real-hardware-noise-quantum-computers`,
      segment: {
        cta: 'noisy-real-hardware-noise-quantum-computers', location: sectionSummerSchool
      }
    },
    {
      label: 'Broad Overview of Quantum Chemistry Simulation and Why it is a Challenge',
      url: `${pathSummerSchool}/2022/broad-overview-quantum-chemistry-simulation-why-is-challenge`,
      segment: {
        cta: 'broad-overview-quantum-chemistry-simulation-why-is-challenge', location: sectionSummerSchool
      }
    },
    {
      label: 'Lab 3',
      url: `${pathSummerSchool}/2022/lab-3`,
      segment: {
        cta: 'lab-3', location: sectionSummerSchool
      }
    },
    {
      label: 'Methods for Quantum Simulation',
      url: `${pathSummerSchool}/2022/methods-quantum-simulation`,
      segment: {
        cta: 'methods-quantum-simulation', location: sectionSummerSchool
      }
    },
    {
      label: 'Quantum Static Simulation',
      url: `${pathSummerSchool}/2022/quantum-static-simulation`,
      segment: {
        cta: 'quantum-static-simulation', location: sectionSummerSchool
      }
    },
    {
      label: 'Lab 4',
      url: `${pathSummerSchool}/2022/lab-4`,
      segment: {
        cta: 'lab-4', location: sectionSummerSchool
      }
    },
    {
      label: 'Quantum Dynamics',
      url: `${pathSummerSchool}/2022/quantum-dynamics`,
      segment: {
        cta: 'quantum-dynamics', location: sectionSummerSchool
      }
    }
  ]
}

type MegaDropdownMenuSection = {
  title: string,
  content: MegaDropdownMenuGroup[]
}

type MegaDropdownMenuContent = MegaDropdownMenuSection[]

const COURSES_SECTION: MegaDropdownMenuSection = {
  title: 'Courses',
  content: [
    BASICS_COURSE,
    INTRODUCTION_COURSE,
    QML_COURSE
  ]
}

const CHAPTERS_SECTION: MegaDropdownMenuSection = {
  title: 'Chapters',
  content: [
    PREREQUISITES,
    QUANTUM_STATES_AND_QUBITS,
    MULTIPLE_QUBITS_AND_ENTANGLEMENT,
    QUANTUM_PROTOCOLS_AND_ALGORITHMS,
    INVESTIGATING_Q_HW_USING_MICROWAVE_PULSES,
    QUANTUM_ALGORITHMS_FOR_APPS,
    INVESTIGATING_Q_HW_USING_Q_CIRCUITS,
    QUANTUM_COMPUTING_LABS,
    GAMES_AND_DEMOS,
    PROBLEM_SETS
  ]
}

const TUTORIALS_SECTION: MegaDropdownMenuSection = {
  title: 'Tutorials',
  content: [
    QUANTUM_CIRCUITS,
    ADVANCED_CIRCUITS,
    CLASSICAL_SIMULATORS,
    ALGORITHMS,
    OPERATORS,
    SAMPLE_ALGORITHMS_IN_QISKIT
  ]
}

const SUMMER_SCHOOL_SECTION: MegaDropdownMenuSection = {
  title: 'Summer schools',
  content: [
    SUMMER_SCHOOL_2020,
    SUMMER_SCHOOL_2021,
    SUMMER_SCHOOL_2022
  ]
}

const LEARN_MEGA_MENU: MegaDropdownMenuContent = [
  COURSES_SECTION,
  CHAPTERS_SECTION,
  TUTORIALS_SECTION,
  SUMMER_SCHOOL_SECTION
]

export {
  LEARN_MEGA_MENU
}
