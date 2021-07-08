<template>
  <div class="circuit">
    <QubitLine
      v-for="(qubitLine, index) in circuitState"
      :key="index"
      :circuit-state="qubitLine"
      :auto-measure-gate="autoMeasureGate"
      :control-simulation-index="controlSimulationIndexPerLine(index)"
      @onGatesChanged="OnGatesChanged"
      @onAddedGate="(gateIndex, gate) => OnAddedGate(index, gateIndex, gate)"
      @onRemovedGate="(gateIndex, gate) => OnRemovedGate(index, gateIndex, gate)"
      @onHoverGate="(gateIndex, gate) => OnHoverGate(index, gateIndex, gate)"
      @onStartDragging="(gateIndex, gate) => OnStartDragging(index, gateIndex, gate)"
    />
    <button
      v-if="circuitState.length < maxLines"
      class="circuit__add-button"
      @click="addLine()"
    >
      <svg width="16" height="16" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.5 4.5V0.5H4.5V4.5H0.5V5.5H4.5V9.5H5.5V5.5H9.5V4.5H5.5Z" />
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { Options, Vue, prop } from 'vue-class-component'
import { GateName, isControlledGate } from './Gate.vue'
import QubitLine from './QubitLine.vue'
import { ComposerGate, generateGateId } from './composerTypes'

class Props {
  name = prop<String>({ default: GateName.H, required: true })
  circuitState = prop<ComposerGate[][]>({ default: [[]], required: true })
  autoMeasureGate = prop<boolean>({ default: true, required: true })
  maxLines = prop<Number>({ default: 1, required: true })
}

@Options({
  components: {
    QubitLine
  }
})
export default class Circuit extends Vue.with(Props) {
  controlSimulationIndex: number = -1
  controlSimulationLine: number = -1

  OnAddedGate (lineIndex: number, gateIndex: number, addedGate: ComposerGate) {
    this.circuitState[lineIndex].splice(gateIndex, 0, addedGate)

    if (isControlledGate(addedGate.name)) {
      this.circuitState[this.controlSimulationLine].splice(this.controlSimulationIndex, 0, { name: GateName.CXC, id: -addedGate.id })
    }

    this.removeUnnecesaryKeepGates()

    this.controlSimulationLine = -1
    this.controlSimulationIndex = -1
  }

  OnRemovedGate (lineIndex: number, gateIndex: number, removedGate: ComposerGate) {
    const gateIndexInLine = this.circuitState[lineIndex].findIndex((lineGate, index) => index >= gateIndex && lineGate.id === removedGate.id)
    this.circuitState[lineIndex].splice(gateIndexInLine, 1)
    this.removeUnnecesaryKeepGates()
    this.controlSimulationLine = -1
    this.controlSimulationIndex = -1
  }

  OnHoverGate (lineIndex: number, gateIndex: number, hoverGate: ComposerGate) {
    if (isControlledGate(hoverGate.name)) {
      // const oldGateIndexInLine = this.circuitState[lineIndex].findIndex(lineGate => lineGate.id === hoverGate.id)
      this.controlSimulationLine = lineIndex === 0 ? lineIndex + 1 : lineIndex - 1
      this.controlSimulationIndex = gateIndex // oldGateIndexInLine > gateIndex ? gateIndex + 1 : gateIndex
      const hoverGateOldIndex = this.circuitState[this.controlSimulationLine].findIndex(gate => gate.id === hoverGate.id)
      if (hoverGateOldIndex !== -1 && hoverGateOldIndex < this.controlSimulationIndex) {
        this.controlSimulationIndex++
      }

      console.log(`CONTROL: line:${this.controlSimulationLine} index:${this.controlSimulationIndex}`)
    }
  }

  OnStartDragging (lineIndex: number, gateIndex: number, gate: ComposerGate) {
    if (!isControlledGate(gate.name) && this.circuitState.length > 1) {
      return
    }

    this.removeControl(-gate.id)
    this.completeWithKeepGates(gate)

    if (lineIndex >= 0 && gateIndex >= 0) {
      this.OnHoverGate(lineIndex, gateIndex, gate)
    }
  }

  completeWithKeepGates (ignoredGate: ComposerGate) {
    const currentCircuitStateLineLenghts = this.circuitState.map(line => line.filter(lineGate => Math.abs(lineGate.id) !== ignoredGate.id).length)

    for (let i = 0; i < this.circuitState.length; i++) {
      const line = currentCircuitStateLineLenghts[i]
      const controlledTargetLineIndex = i === 0 ? i + 1 : i - 1
      const controlledTargetLineLenght = currentCircuitStateLineLenghts[controlledTargetLineIndex]
      const neededKeepGates = controlledTargetLineLenght - line

      for (let j = 0; j < neededKeepGates; j++) {
        this.circuitState[i].push({ name: GateName.KEEP, id: generateGateId() })
      }
    }
  }

  removeUnnecesaryKeepGates () {
    for (let i = 0; i < this.circuitState.length; i++) {
      const line = this.circuitState[i]
      while (line.length > 0 && line[line.length - 1].name === GateName.KEEP) {
        line.pop()
      }
    }
  }

  removeControl (controlId: number) {
    for (let i = 0; i < this.circuitState.length; i++) {
      for (let j = 0; j < this.circuitState[i].length; j++) {
        if (this.circuitState[i][j].id === controlId) {
          this.circuitState[i].splice(j, 1)
          break
        }
      }
    }
  }

  OnGatesChanged () {
    this.$emit('onCircuitChanged')
  }

  addLine () {
    this.circuitState.push([])
    this.$emit('onCircuitChanged')
  }

  controlSimulationIndexPerLine (lineIndex: number) {
    return this.controlSimulationLine === lineIndex ? this.controlSimulationIndex : -1
  }
}
</script>
<style scoped lang="scss">
@import 'carbon-components/scss/globals/scss/typography';
@import 'carbon-components/scss/globals/scss/layout';
@import '../../../scss/variables/colors.scss';
@import '~/../scss/variables/mq.scss';

.circuit {
  padding: $spacing-02 0;

  &__add-button {
    cursor: pointer;
    padding: $spacing-02;
    fill: $text-color-dark;
    background-color: transparent;
    transition: ease-in .2s;

    &:hover {
      fill: $text-active-color;
      background-color: $background-color-light;
    }
  }
}
</style>
