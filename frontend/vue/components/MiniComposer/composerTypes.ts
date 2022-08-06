import { GateName, QuantumGate, gateMap } from './gateUtils'

export interface ComposerGate {
  name: GateName
  rotation?: string
  id: number
}

export interface ProbabilityState {
  key: string
  value: number
}

export interface ExerciseStep {
  autoMeasureGate: boolean
  availableGates: ComposerGate[]
  circuitState: ComposerGate[][]
  circuitStateGoal: ComposerGate[][]
  startProbabilities: ProbabilityState[]
  endProbabilities: ProbabilityState[]
  isCompleted: boolean
}

export function emptyExerciseStep (): ExerciseStep {
  return {
    autoMeasureGate: false,
    availableGates: [],
    circuitState: [[]],
    circuitStateGoal: [[]],
    startProbabilities: [],
    endProbabilities: [],
    isCompleted: false
  }
}

export function gateMatrix (gate: ComposerGate): QuantumGate {
  return gateMap[gate.name]
}
