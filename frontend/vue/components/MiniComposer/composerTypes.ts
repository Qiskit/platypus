import { GateName } from './Gate.vue'
import { ProbabilityState } from './ProbablityChart.vue'

export interface ComposerGate {
  name: GateName
  id: number
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
