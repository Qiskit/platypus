import { NavLink } from './../../../constants/menuLinks'

const actionPrefix = 'mega-menu'
const wholeSection = 'whole-section'
const sectionPrerequisites = 'prerequisites'
const sectionQuantumStatesAndQubits = 'quantum-states-and-qubits'
const sectionMultipleQubitsAndEntanglement = 'multiple-qubits-and-entanglement'
const sectionGamesAndDemos = 'games-and-demos'
const sectionProtocolsAndAlgorithms = 'protocols-and-algorithms'
const sectionPulses = 'pulses'
const sectionApps = 'apps'
const sectionCircuits = 'circuits'
const sectionLabs = 'labs'

const baseUrl = window && window.location ? window.location.origin : 'https://learn.qiskit.org'
const pathPrerequisites = '/course/ch-prerequisites'
const pathQuantumStatesAndQubits = '/course/ch-states'
const pathMultipleQubitsAndEntanglement = '/course/ch-gates'
const pathGamesAndDemos = '/course/ch-demos'
const pathProtocolsAndAlgorithms = '/course/ch-algorithms'
const pathPulses = '/course/quantum-hardware-pulses'
const pathHardwareUsingCircuits = '/course/quantum-hardware'
const pathApps = '/course/ch-applications'
const pathLabs = '/course/ch-labs'

type MegaDropdownMenuGroup = {
  title: NavLink,
  content: NavLink[]
}

const PREREQUISITES: MegaDropdownMenuGroup = {
  title: {
    label: 'Prerequisites',
    url: `${baseUrl}${pathPrerequisites}`,
    segment: {
      action: `${actionPrefix} > ${sectionPrerequisites} > ${wholeSection}`
    }
  },
  content: [
    {
      label: 'Setting Up Your Environment',
      url: `${baseUrl}${pathPrerequisites}/environment-setup-guide-to-work-with-qiskit-textbook`,
      segment: {
        action: `${actionPrefix} > ${sectionPrerequisites} > setting-the-environment`
      }
    },
    {
      label: 'Python and Jupyter Notebooks',
      url: `${baseUrl}${pathPrerequisites}/introduction-to-python-and-jupyter-notebooks`,
      segment: {
        action: `${actionPrefix} > ${sectionPrerequisites} > python-and-jupyter-notebooks`
      }
    }
  ]
}

const QUANTUM_STATES_AND_QUBITS: MegaDropdownMenuGroup = {
  title: {
    label: 'Quantum States and Qubits',
    url: `${baseUrl}${pathQuantumStatesAndQubits}`,
    segment: {
      action: `${actionPrefix} > ${sectionQuantumStatesAndQubits} > ${wholeSection}`
    }
  },
  content: [
    {
      label: 'Introduction',
      url: `${baseUrl}${pathQuantumStatesAndQubits}/introduction`,
      segment: {
        action: `${actionPrefix} > ${sectionQuantumStatesAndQubits} > introduction`
      }
    },
    {
      label: 'The Atoms of Computation',
      url: `${baseUrl}${pathQuantumStatesAndQubits}/the-atoms-of-computation`,
      segment: {
        action: `${actionPrefix} > ${sectionQuantumStatesAndQubits} > the-atoms-of-computation`
      }
    },
    {
      label: 'Representing Qubit States',
      url: `${baseUrl}${pathQuantumStatesAndQubits}/representing-qubit-states`,
      segment: {
        action: `${actionPrefix} > ${sectionQuantumStatesAndQubits} > representing-qubit-states`
      }
    },
    {
      label: 'Single Qubit Gates',
      url: `${baseUrl}${pathQuantumStatesAndQubits}/single-qubit-gates`,
      segment: {
        action: `${actionPrefix} > ${sectionQuantumStatesAndQubits} > single-qubit-gates`
      }
    },
    {
      label: 'The Case for Quantum',
      url: `${baseUrl}${pathQuantumStatesAndQubits}/the-case-for-quantum-computers`,
      segment: {
        action: `${actionPrefix} > ${sectionQuantumStatesAndQubits} > the-case-for-quantum-computers`
      }
    }
  ]
}

const MULTIPLE_QUBITS_AND_ENTANGLEMENT: MegaDropdownMenuGroup = {
  title: {
    label: 'Multiple Qubits and Entanglement',
    url: `${baseUrl}${pathMultipleQubitsAndEntanglement}`,
    segment: {
      action: `${actionPrefix} > ${sectionMultipleQubitsAndEntanglement} > ${wholeSection}`
    }
  },
  content: [
    {
      label: 'Introduction',
      url: `${baseUrl}${pathMultipleQubitsAndEntanglement}/introduction`,
      segment: {
        action: `${actionPrefix} > ${sectionMultipleQubitsAndEntanglement} > introduction`
      }
    },
    {
      label: 'Multiple Qubits and Entangled States',
      url: `${baseUrl}${pathMultipleQubitsAndEntanglement}/multiple-qubits-and-entangled-states`,
      segment: {
        action: `${actionPrefix} > ${sectionMultipleQubitsAndEntanglement} > multiple-qubits-and-entangled-states`
      }
    },
    {
      label: 'Phase Kickback',
      url: `${baseUrl}${pathMultipleQubitsAndEntanglement}/phase-kickback`,
      segment: {
        action: `${actionPrefix} > ${sectionMultipleQubitsAndEntanglement} > phase-kickback`
      }
    },
    {
      label: 'Basic Circuit Identities',
      url: `${baseUrl}${pathMultipleQubitsAndEntanglement}/basic-circuit-identities`,
      segment: {
        action: `${actionPrefix} > ${sectionMultipleQubitsAndEntanglement} > basic-circuit-identities`
      }
    },
    {
      label: 'Proving Universality',
      url: `${baseUrl}${pathMultipleQubitsAndEntanglement}/proving-universality`,
      segment: {
        action: `${actionPrefix} > ${sectionMultipleQubitsAndEntanglement} > proving-universality`
      }
    },
    {
      label: 'Classical Computation on a Quantum Computer',
      url: `${baseUrl}${pathMultipleQubitsAndEntanglement}/classical-computation-on-a-quantum-computer`,
      segment: {
        action: `${actionPrefix} > ${sectionMultipleQubitsAndEntanglement} > classical-computation-on-a-quantum-computer`
      }
    }
  ]
}

const GAMES_AND_DEMOS: MegaDropdownMenuGroup = {
  title: {
    label: 'Games & Demos',
    url: `${baseUrl}${pathGamesAndDemos}`,
    segment: {
      action: `${actionPrefix} > ${sectionGamesAndDemos} > ${wholeSection}`
    }
  },
  content: [
    {
      label: 'Bonus Level: Sandbox',
      url: `${baseUrl}${pathGamesAndDemos}/bonus-level-sandbox`,
      segment: {
        action: `${actionPrefix} > ${sectionGamesAndDemos} > bonus-level-sandbox`
      }
    },
    {
      label: 'Estimating Pi Using Quantum Phase Estimation Algorithm',
      url: `${baseUrl}${pathGamesAndDemos}/estimating-pi-pi-using-quantum-phase-estimation-algorithm`,
      segment: {
        action: `${actionPrefix} > ${sectionGamesAndDemos} > estimating-pi-pi-using-quantum-phase-estimation-algorithm`
      }
    },
    {
      label: 'Local Reality and the CHSH inequality',
      url: `${baseUrl}${pathGamesAndDemos}/local-reality-and-the-chsh-inequality`,
      segment: {
        action: `${actionPrefix} > ${sectionGamesAndDemos} > local-reality-and-the-chsh-inequality`
      }
    },
    {
      label: 'Widgets Demonstration',
      url: `${baseUrl}${pathGamesAndDemos}/widgets-demonstration`,
      segment: {
        action: `${actionPrefix} > ${sectionGamesAndDemos} > widgets-demonstration`
      }
    },
    {
      label: 'Quantum Coin Game',
      url: `${baseUrl}${pathGamesAndDemos}/coin-game`,
      segment: {
        action: `${actionPrefix} > ${sectionGamesAndDemos} > coin-game`
      }
    },
    {
      label: 'Your First Quantum Game',
      url: `${baseUrl}${pathGamesAndDemos}/first-quantum-game`,
      segment: {
        action: `${actionPrefix} > ${sectionGamesAndDemos} > first-quantum-game`
      }
    },
    {
      label: 'Variational Quantum Regression',
      url: `${baseUrl}${pathGamesAndDemos}/variational-quantum-regression`,
      segment: {
        action: `${actionPrefix} > ${sectionGamesAndDemos} > variational-quantum-regression`
      }
    }
  ]
}

const QUANTUM_PROTOCOLS_AND_ALGORITHMS: MegaDropdownMenuGroup = {
  title: {
    label: 'Quantum Protocols and Quantum Algorithms',
    url: `${baseUrl}${pathProtocolsAndAlgorithms}`,
    segment: {
      action: `${actionPrefix} > ${sectionProtocolsAndAlgorithms} > ${wholeSection}`
    }
  },
  content: [
    {
      label: 'Defining Quantum Circuits',
      url: `${baseUrl}${pathProtocolsAndAlgorithms}/quantum-circuits`,
      segment: {
        action: `${actionPrefix} > ${sectionProtocolsAndAlgorithms} > defining-quantum-circuits`
      }
    },
    {
      label: 'Deutsch-Jozsa Algorithm',
      url: `${baseUrl}${pathProtocolsAndAlgorithms}/deutsch-jozsa-algorithm`,
      segment: {
        action: `${actionPrefix} > ${sectionProtocolsAndAlgorithms} > deutsch-jozsa-algorithm`
      }
    },
    {
      label: 'Bernstein-Vazirani Algorithm',
      url: `${baseUrl}${pathProtocolsAndAlgorithms}/bernstein-vazirani-algorithm`,
      segment: {
        action: `${actionPrefix} > ${sectionProtocolsAndAlgorithms} > bernstein-vazirani-algorithm`
      }
    },
    {
      label: 'Simon\'s Algorithm',
      url: `${baseUrl}${pathProtocolsAndAlgorithms}/simons-algorithm`,
      segment: {
        action: `${actionPrefix} > ${sectionProtocolsAndAlgorithms} > simons-algorithm`
      }
    },
    {
      label: 'Quantum Fourier Transform',
      url: `${baseUrl}${pathProtocolsAndAlgorithms}/quantum-fourier-transform`,
      segment: {
        action: `${actionPrefix} > ${sectionProtocolsAndAlgorithms} > quantum-fourier-transform`
      }
    },
    {
      label: 'Quantum Phase Estimation',
      url: `${baseUrl}${pathProtocolsAndAlgorithms}/quantum-phase-estimation`,
      segment: {
        action: `${actionPrefix} > ${sectionProtocolsAndAlgorithms} > quantum-phase-estimation`
      }
    },
    {
      label: 'Shor\'s Algorithm',
      url: `${baseUrl}${pathProtocolsAndAlgorithms}/shors-algorithm`,
      segment: {
        action: `${actionPrefix} > ${sectionProtocolsAndAlgorithms} > shors-algorithm`
      }
    },
    {
      label: 'Grover\'s Algorithm',
      url: `${baseUrl}${pathProtocolsAndAlgorithms}/grovers-algorithm`,
      segment: {
        action: `${actionPrefix} > ${sectionProtocolsAndAlgorithms} > grovers-algorithm`
      }
    },
    {
      label: 'Quantum Counting',
      url: `${baseUrl}${pathProtocolsAndAlgorithms}/quantum-counting`,
      segment: {
        action: `${actionPrefix} > ${sectionProtocolsAndAlgorithms} > quantum-counting`
      }
    },
    {
      label: 'Quantum Teleportation',
      url: `${baseUrl}${pathProtocolsAndAlgorithms}/quantum-teleportation`,
      segment: {
        action: `${actionPrefix} > ${sectionProtocolsAndAlgorithms} > quantum-teleportation`
      }
    },
    {
      label: 'Superdense Coding',
      url: `${baseUrl}${pathProtocolsAndAlgorithms}/superdense-coding`,
      segment: {
        action: `${actionPrefix} > ${sectionProtocolsAndAlgorithms} > superdense-coding`
      }
    },
    {
      label: 'Quantum Key Distribution',
      url: `${baseUrl}${pathProtocolsAndAlgorithms}/quantum-key-distribution`,
      segment: {
        action: `${actionPrefix} > ${sectionProtocolsAndAlgorithms} > quantum-key-distribution`
      }
    },
    {
      label: 'The Hidden Shift Problem',
      url: `${baseUrl}${pathProtocolsAndAlgorithms}/hidden-shift-problem`,
      segment: {
        action: `${actionPrefix} > ${sectionProtocolsAndAlgorithms} > hidden-shift-problem`
      }
    }
  ]
}

const INVESTIGATING_Q_HW_USING_MICROWAVE_PULSES : MegaDropdownMenuGroup = {
  title: {
    label: 'Investigating Quantum Hardware Using Microwave Pulses',
    url: `${baseUrl}${pathPulses}`,
    segment: {
      action: `${actionPrefix} > ${sectionPulses} > ${wholeSection}`
    }
  },
  content: [
    {
      label: 'Calibrating Qubits with Qiskit Pulse',
      url: `${baseUrl}${pathPulses}/calibrating-qubits-using-qiskit-pulse`,
      segment: {
        action: `${actionPrefix} > ${sectionPulses} > calibrating-qubits-using-qiskit-pulse`
      }
    },
    {
      label: 'Accessing Higher Energy States',
      url: `${baseUrl}${pathPulses}/accessing-higher-energy-states-with-qiskit-pulse`,
      segment: {
        action: `${actionPrefix} > ${sectionPulses} > accessing_higher_energy_states-with-qiskit-pulse`
      }
    },
    {
      label: 'Introduction to Transmon Physics',
      url: `${baseUrl}${pathPulses}/introduction-to-transmon-physics`,
      segment: {
        action: `${actionPrefix} > ${sectionPulses} > introduction-to-transmon-physics`
      }
    },
    {
      label: 'Circuit Quantum Electrodynamics',
      url: `${baseUrl}${pathPulses}/circuit-quantum-electrodynamics`,
      segment: {
        action: `${actionPrefix} > ${sectionPulses} > circuit-quantum-electrodynamics`
      }
    },
    {
      label: 'Exploring the Jaynes-Cummings Hamiltonian with Qiskit Pulse',
      url: `${baseUrl}${pathPulses}/exploring-the-jaynes-cummings-hamiltonian-with-qiskit-pulse`,
      segment: {
        action: `${actionPrefix} > ${sectionPulses} > exploring-the-jaynes-cummings-hamiltonian-with-qiskit-pulse`
      }
    },
    {
      label: 'Measuring the Qubit ac-Stark Shift',
      url: `${baseUrl}${pathPulses}/measuring-the-qubit-ac-stark-shift`,
      segment: {
        action: `${actionPrefix} > ${sectionPulses} > measuring-the-qubit-ac-stark-shift`
      }
    },
    {
      label: 'Hamiltonian Tomography',
      url: `${baseUrl}${pathPulses}/hamiltonian-tomography`,
      segment: {
        action: `${actionPrefix} > ${sectionPulses} > hamiltonian-tomography`
      }
    }
  ]
}

const QUANTUM_ALGORITHMS_FOR_APPS : MegaDropdownMenuGroup = {
  title: {
    label: 'Quantum Algorithms for Applications',
    url: `${baseUrl}${pathApps}`,
    segment: {
      action: `${actionPrefix} > ${sectionApps} > ${wholeSection}`
    }
  },
  content: [
    {
      label: 'Solving Linear Systems of Equations using HHL',
      url: `${baseUrl}${pathApps}/solving-linear-systems-of-equations-using-hhl-and-its-qiskit-implementation`,
      segment: {
        action: `${actionPrefix} > ${sectionApps} > solving-linear-systems-of-equations-using-hhl-and-its-qiskit-implementation`
      }
    },
    {
      label: 'Simulating Molecules using VQE',
      url: `${baseUrl}${pathApps}/simulating-molecules-using-vqe`,
      segment: {
        action: `${actionPrefix} > ${sectionApps} > simulating-molecules-using-vqe`
      }
    },
    {
      label: 'Solving combinatorial optimization problems using QAOA',
      url: `${baseUrl}${pathApps}/solving-combinatorial-optimization-problems-using-qaoa`,
      segment: {
        action: `${actionPrefix} > ${sectionApps} > solving-combinatorial-optimization-problems-using-qaoa`
      }
    },
    {
      label: 'Solving Satisfiability Problems using Grover\'s Algorithm',
      url: `${baseUrl}${pathApps}/solving-satisfiability-problems-using-grovers-algorithm`,
      segment: {
        action: `${actionPrefix} > ${sectionApps} > solving-satisfiability-problems-using-grovers-algorithm`
      }
    },
    {
      label: 'Hybrid quantum-classical Neural Networks with PyTorch and Qiskit',
      url: `${baseUrl}${pathApps}/hybrid-quantum-classical-neural-networks-with-pytorch-and-qiskit`,
      segment: {
        action: `${actionPrefix} > ${sectionApps} > hybrid-quantum-classical-neural-networks-with-pytorch-and-qiskit`
      }
    },
    {
      label: 'Variational Quantum Linear Solver',
      url: `${baseUrl}${pathApps}/the-variational-quantum-linear-solver`,
      segment: {
        action: `${actionPrefix} > ${sectionApps} > the-variational-quantum-linear-solver`
      }
    },
    {
      label: 'Quantum Image Processing - FRQI and NEQR Image Representations',
      url: `${baseUrl}${pathApps}/flexible-representation-of-quantum-images-frqi`,
      segment: {
        action: `${actionPrefix} > ${sectionApps} > flexible-representation-of-quantum-images-frqi`
      }
    },
    {
      label: 'Facial Expression Recognition',
      url: `${baseUrl}${pathApps}/facial-expression-recognition`,
      segment: {
        action: `${actionPrefix} > ${sectionApps} > facial-expression-recognition`
      }
    },
    {
      label: 'Quantum Edge Detection',
      url: `${baseUrl}${pathApps}/quantum-edge-detection`,
      segment: {
        action: `${actionPrefix} > ${sectionApps} > quantum-edge-detection`
      }
    },
    {
      label: 'Travelling Salesman Problem',
      url: `${baseUrl}${pathApps}/tsp`,
      segment: {
        action: `${actionPrefix} > ${sectionApps} > tsp`
      }
    }
  ]
}

const INVESTIGATING_Q_HW_USING_Q_CIRCUITS : MegaDropdownMenuGroup = {
  title: {
    label: 'Investigating Quantum Hardware Using Quantum Circuits',
    url: `${baseUrl}${pathHardwareUsingCircuits}`,
    segment: {
      action: `${actionPrefix} > ${sectionCircuits} > ${wholeSection}`
    }
  },
  content: [
    {
      label: 'Introduction to Quantum Error Correction using Repetition Codes',
      url: `${baseUrl}${pathHardwareUsingCircuits}/introduction-to-quantum-error-correction-via-the-repetition-code`,
      segment: {
        action: `${actionPrefix} > ${sectionCircuits} > introduction-to-quantum-error-correction-via-the-repetition-code`
      }
    },
    {
      label: 'Measurement Error Mitigation',
      url: `${baseUrl}${pathHardwareUsingCircuits}/measurement-error-mitigation`,
      segment: {
        action: `${actionPrefix} > ${sectionCircuits} > measurement-error-mitigation`
      }
    },
    {
      label: 'Randomized Benchmarking',
      url: `${baseUrl}${pathHardwareUsingCircuits}/randomized-benchmarking`,
      segment: {
        action: `${actionPrefix} > ${sectionCircuits} > randomized-benchmarking`
      }
    },
    {
      label: 'Measuring Quantum Volume',
      url: `${baseUrl}${pathHardwareUsingCircuits}/measuring-quantum-volume`,
      segment: {
        action: `${actionPrefix} > ${sectionCircuits} > measuring-quantum-volume`
      }
    },
    {
      label: 'The Density Matrix and Mixed States',
      url: `${baseUrl}${pathHardwareUsingCircuits}/density-matrix`,
      segment: {
        action: `${actionPrefix} > ${sectionCircuits} > density-matrix`
      }
    }
  ]
}

const QUANTUM_COMPUTING_LABS : MegaDropdownMenuGroup = {
  title: {
    label: 'Quantum Computing Labs',
    url: `${baseUrl}${pathLabs}`,
    segment: {
      action: `${actionPrefix} > ${sectionLabs} > ${wholeSection}`
    }
  },
  content: [
    {
      label: 'Lab 1. Quantum Circuits',
      url: `${baseUrl}${pathLabs}/lab-1-quantum-circuits`,
      segment: {
        action: `${actionPrefix} > ${sectionLabs} > lab-1-quantum-circuits`
      }
    },
    {
      label: 'Lab 2. Single Qubit Gates',
      url: `${baseUrl}${pathLabs}/lab-2-single-qubit-gates`,
      segment: {
        action: `${actionPrefix} > ${sectionLabs} > lab-2-single-qubit-gates`
      }
    },
    {
      label: 'Lab 3. Quantum Measurement',
      url: `${baseUrl}${pathLabs}/lab-3-quantum-measurements`,
      segment: {
        action: `${actionPrefix} > ${sectionLabs} > lab-3-quantum-measurements`
      }
    },
    {
      label: 'Lab 4. Bell Circuit & GHZ Circuit',
      url: `${baseUrl}${pathLabs}/lab-4-bell-ghz-circuit`,
      segment: {
        action: `${actionPrefix} > ${sectionLabs} > lab-4-bell-ghz-circuit`
      }
    },
    {
      label: 'Lab 5. Accuracy of Quantum Phase Estimation',
      url: `${baseUrl}${pathLabs}/lab-5-accuracy-of-quantum-phase-estimation`,
      segment: {
        action: `${actionPrefix} > ${sectionLabs} > lab-5-accuracy-of-quantum-phase-estimation`
      }
    },
    {
      label: 'Lab 6. Iterative Quantum Phase Estimation',
      url: `${baseUrl}${pathLabs}/lab-6-iterative-phase-estimation-algorithm`,
      segment: {
        action: `${actionPrefix} > ${sectionLabs} > lab-6-iterative-phase-estimation-algorithm`
      }
    },
    {
      label: 'Lab 7. Scalable Shor\'s Algorithm',
      url: `${baseUrl}${pathLabs}/lab-7-scalable-shors-algorithm`,
      segment: {
        action: `${actionPrefix} > ${sectionLabs} > lab-7-scalable-shors-algorithm`
      }
    },
    {
      label: 'Lab 8. Grover\'s search with an unknown number of solutions',
      url: `${baseUrl}${pathLabs}/lab-8-grovers-search-with-an-unknown-number-of-solutions`,
      segment: {
        action: `${actionPrefix} > ${sectionLabs} > lab-8-grovers-search-with-an-unknown-number-of-solutions`
      }
    },
    {
      label: 'Lab 9. Quantum Simulation as a Search Algorithm',
      url: `${baseUrl}${pathLabs}/lab-9-quantum-simulation-as-a-search-algorithm`,
      segment: {
        action: `${actionPrefix} > ${sectionLabs} > lab-9-quantum-simulation-as-a-search-algorithm`
      }
    }
  ]
}

type MegaDropdownMenuColumn = MegaDropdownMenuGroup[]
const COLUMN_1: MegaDropdownMenuColumn = [
  PREREQUISITES,
  QUANTUM_STATES_AND_QUBITS,
  MULTIPLE_QUBITS_AND_ENTANGLEMENT,
  GAMES_AND_DEMOS
]

const COLUMN_2: MegaDropdownMenuColumn = [
  QUANTUM_PROTOCOLS_AND_ALGORITHMS,
  INVESTIGATING_Q_HW_USING_MICROWAVE_PULSES
]

const COLUMN_3: MegaDropdownMenuColumn = [
  QUANTUM_ALGORITHMS_FOR_APPS,
  INVESTIGATING_Q_HW_USING_Q_CIRCUITS,
  QUANTUM_COMPUTING_LABS
]

type MegaDropdownMenu = MegaDropdownMenuColumn[]
const TEXTBOOK_DEMO_MEGA_MENU: MegaDropdownMenu = [
  COLUMN_1,
  COLUMN_2,
  COLUMN_3
]

export {
  TEXTBOOK_DEMO_MEGA_MENU
}
