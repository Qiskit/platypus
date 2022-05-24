<template>
  <section class="mini-composer">
    <div
      ref="configRef"
      class="mini-composer__config-container"
    >
      <slot />
    </div>
    <div
      ref="instructionsRef"
      class="mini-composer__exercise-text"
    />
    <div class="mini-composer__gates">
      <h1 class="mini-composer__gates__title">
        Gates
      </h1>
      <GatesPool :available-gates="availableGates" />
    </div>
    <div class="mini-composer__circuit-section">
      <h1 class="mini-composer__circuit-section__title">
        Circuit
      </h1>
      <Circuit
        :circuit-state="circuitState"
        :auto-measure-gate="autoMeasureGate"
        :max-lines="circuitState.length"
      />
    </div>
    <div class="mini-composer__lesson">
      <div>\\sqrt[3]{\\frac xy}</div>
    </div>
  </section>
</template>

<script lang="ts">
import { ref } from '@vue/reactivity'
import { Options, Vue, prop } from 'vue-class-component'
import draggable from 'vuedraggable'
import Carousel from '../Carousel/Carousel.vue'
import KetCircuitLine from '../Sketch/KetCircuitLine.vue'
import AppCta from '../common/AppCta.vue'
import SolutionStateIndicator, { SolutionState } from '../common/SolutionStateIndicator.vue'
import GatesPool from './GatesPool.vue'
import Circuit from './Circuit.vue'
import { ComposerGate } from './composerTypes'
import { GateName } from './Gate.vue'

class Props {
  goal = prop<String>({ default: 'mini-composer-solved', required: true })
}

@Options({
  components: {
    Carousel,
    KetCircuitLine,
    Circuit,
    GatesPool,
    draggable,
    AppCta,
    SolutionStateIndicator
  }
})
export default class CircuitSandboxWidget extends Vue.with(Props) {
  configRef = ref<HTMLDivElement | null>(null)
  get configDiv () { return (this.configRef as unknown as HTMLDivElement) }
  instructionsRef = ref<HTMLDivElement | null>(null)
  get instructions () { return (this.instructionsRef as unknown as HTMLDivElement) }
  footerInfoRef = ref<HTMLDivElement | null>(null)
  get footerInfoDiv () { return (this.footerInfoRef as unknown as HTMLDivElement) }
  lessonRef = ref<HTMLDivElement | null>(null)
  get lessonDiv () { return (this.lessonRef as unknown as HTMLDivElement) }

  correctSolution = SolutionState.CORRECT

  autoMeasureGate: boolean = false

  availableGates: ComposerGate[] = []

  circuitState: ComposerGate[][] = [[]]

  lastGateId = 0

  mathjaxRenderer: any | undefined = undefined

  mounted () {
    const instructionElement = this.configDiv.querySelector('.instructions')
    const circuitElement = this.configDiv.querySelector('.circuit')

    this.setCircuitConfig(circuitElement as HTMLElement)

    if (instructionElement) {
      this.instructions.appendChild(instructionElement)
    } else {
      this.instructions.remove()
    }
  }

  setCircuitConfig (htmlConfigElement: HTMLElement) {
    this.autoMeasureGate = !!htmlConfigElement.querySelector('.autoMeasureGate')

    const availableGatesElement = htmlConfigElement.querySelector('.availableGates') as HTMLElement
    this.availableGates = []
    if (availableGatesElement && availableGatesElement.textContent) {
      this.availableGates = this.stringToGateNameArray(availableGatesElement.textContent)
    }

    const initialCircuitElement = Array.from<HTMLElement>(htmlConfigElement.querySelectorAll('.initialCircuit .qubit'))
    this.circuitState = this.htmlElementsToCircuit(initialCircuitElement)
  }

  stringToGateNameArray (text: string) : ComposerGate[] {
    return text.split(' ')
      .filter(text => text !== '')
      .map<ComposerGate>((gateText: string) => {
        if (Object.values(GateName).some(gate => gateText.startsWith(gate))) {
          const parts = gateText.split('(')
          const gateName = parts[0]
          const rotation = parts[1]?.split(')')[0]
          return { name: gateName as GateName, id: this.lastGateId++, rotation }
        }
        return { name: GateName.UNKNOWN, id: this.lastGateId++ }
      })
  }

  htmlElementsToCircuit (elements: HTMLElement[]) : ComposerGate[][] {
    return elements.map((qubitLine: HTMLElement) => {
      if (qubitLine.textContent === null) {
        return []
      }
      return this.stringToGateNameArray(qubitLine.textContent)
    })
  }

  onRestartButton () {

  }
}
</script>
<style scoped lang="scss">
@import 'carbon-components/scss/globals/scss/typography';
@import 'carbon-components/scss/globals/scss/layout';
@import '../../../scss/variables/colors.scss';
@import '~/../scss/variables/mq.scss';

.mini-composer {
  display: grid;
  min-height: 36rem;
  grid-template-columns: 320px 1fr 160px;
  grid-template-rows: min-content min-content min-content auto min-content;
  grid-template-areas:
    "text text text"
    "gates lesson lesson"
    "circuit lesson lesson"
    "chart lesson lesson"
    "footer footer footer";

  &__config-container {
    display: none;
  }

  &__exercise-text {
    grid-area: text;
    border-bottom: 1px solid $border-color;

    ::v-deep(.carousel__selector) {
      margin-top: 0;
    }
  }
  &__gates {
    grid-area: gates;
    border-bottom: 1px solid $border-color;
    padding: 0 $spacing-05 $spacing-05 $spacing-05;
    &__title {
      margin: $spacing-03 0 $spacing-05 0;
      @include type-style('heading-01');
    }
  }
  &__circuit-section {
    grid-area: circuit;
    padding: 0 $spacing-04;
    &__title {
      margin-top: $spacing-03;
      @include type-style('heading-01');
    }
    &__qubit-line {
      position: relative;
      &__slot-container {
        display: flex;
        flex-flow: row;

        position: absolute;
        top: 0px;
        height: 100%;
        width: 100%;
        align-items: center;
        padding: 0 $spacing-07;
      }
      &__slot {
        display: flex;
        flex-flow: row;
        flex: 1 1 auto;
        max-width: 100%;

        &__gate {
          margin-right: $spacing-02;
          &.sortable-ghost {
            transition: opacity 0.2s ease-out;
            opacity: 0.5;
          }
        }
      }
      &__z-gate {
        flex: 0 0 auto;
      }
    }
  }
  &__probability-chart {
    grid-area: chart;
    height: 250px;
    padding: $spacing-07 $spacing-09 $spacing-07 $spacing-05;
  }
  &__lesson {
    grid-area: lesson;
    border-left: 1px solid $border-color;
    padding: $spacing-06;
    margin-bottom: $spacing-10;
  }
}
</style>
