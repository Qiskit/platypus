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
      <button
        class="mini-composer__circuit-section__reset"
        @click="onResetButton"
      >

      Reset <ResetIcon class="mini-composer__circuit-section__reset__icon" />
      </button>
      <Circuit
        class="mini-composer__circuit-section__circuit-lines"
        :circuit-state="circuitState"
        :auto-measure-gate="false"
        :max-lines="circuitState.length"
        :max-gates="MAX_GATES"
      />
    </div>
    <div
      ref="explanationRef"
      class="mini-composer__explanation"
    />
    <div class="mini-composer__state-views">
      <section>
        <h1 class="mini-composer__state-views__title">
          Matrix
        </h1>
        <SymbolicNotation
          class="mini-composer__state-views__area"
          :tex="matrixTex"
        />
      </section>
      <section>
        <h1 class="mini-composer__state-views__title">
          State Vector
        </h1>rm 
        <SymbolicNotation
          class="mini-composer__state-views__area"
          :tex="stateVectorTex"
        />
      </section>
    </div>
  </section>
</template>

<script lang="ts">
import { ref } from '@vue/reactivity'
import { Options, Vue, prop } from 'vue-class-component'
import draggable from 'vuedraggable'
import ResetIcon from '@carbon/icons-vue/lib/reset/16'
import SolutionStateIndicator from '../common/SolutionStateIndicator.vue'
import GatesPool from './GatesPool.vue'
import Circuit from './Circuit.vue'
import { ComposerGate, gateMatrix } from './composerTypes'
import { GateName, IdentityState, StateMatrixToTexMatrix, StateMatrixToTexKetNotation } from './gateUtils'
import SymbolicNotation from './SymbolicNotation.vue'

class Props {
  goal = prop<String>({ default: 'mini-composer-solved', required: true })
}

@Options({
  components: {
    Circuit,
    GatesPool,
    draggable,
    SymbolicNotation,
    SolutionStateIndicator,
    ResetIcon
  }
})
export default class CircuitSandboxWidget extends Vue.with(Props) {
  configRef = ref<HTMLDivElement | null>(null)
  get configDiv () { return (this.configRef as unknown as HTMLDivElement) }
  instructionsRef = ref<HTMLDivElement | null>(null)
  get instructions () { return (this.instructionsRef as unknown as HTMLDivElement) }
  explanationRef = ref<HTMLDivElement | null>(null)
  get explanation () { return (this.explanationRef as unknown as HTMLDivElement) }

  MAX_GATES = 7

  initialAvailableGates: ComposerGate[] = []
  get availableGates (): ComposerGate[] {
    return this.initialAvailableGates.map(gate => gate)
  }

  circuitState: ComposerGate[][] = [[]]

  get matrixState () {
    if (this.goal && this.circuitState[0].length > 0) {
      this.$step?.score(this.goal as string)
    }

    return this.circuitState[0].reduce((prev, current) => {
      return gateMatrix(current).apply(prev)
    }, IdentityState())
  }

  get matrixTex () {
    return StateMatrixToTexMatrix(this.matrixState)
  }

  get stateVectorTex () {
    return StateMatrixToTexKetNotation(this.matrixState)
  }

  mounted () {
    const instructionElement = this.configDiv.querySelector('.instructions')
    const explanationElement = this.configDiv.querySelector('.explanation')
    const availableGatesElement = this.configDiv.querySelector('.availableGates')

    this.setCircuitConfig(availableGatesElement as HTMLElement)

    if (instructionElement) {
      this.instructions.appendChild(instructionElement)
    } else {
      this.instructions.remove()
    }
    if (explanationElement) {
      this.explanation.appendChild(explanationElement)
    } else {
      this.explanation.remove()
    }
  }

  setCircuitConfig (availableGatesElement: HTMLElement) {
    this.initialAvailableGates = []
    if (availableGatesElement && availableGatesElement.textContent) {
      this.initialAvailableGates = this.stringToGateNameArray(availableGatesElement.textContent)
    }
  }

  stringToGateNameArray (text: string) : ComposerGate[] {
    let lastGateId = 0
    return text.split(' ')
      .filter(text => text !== '')
      .map<ComposerGate>((gateText: string) => {
        if (Object.values(GateName).some(gate => gateText.startsWith(gate))) {
          const parts = gateText.split('(')
          const gateName = parts[0]
          const rotation = parts[1]?.split(')')[0]
          return { name: gateName as GateName, id: lastGateId++, rotation }
        }
        return { name: GateName.UNKNOWN, id: lastGateId++ }
      })
  }

  onResetButton () {
    this.circuitState = [[]]
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
  grid-template-columns: 20rem 1fr;
  grid-template-rows: min-content min-content 1fr min-content;
  grid-template-areas:
    "text text"
    "gates lesson"
    "circuit lesson"
    "explanation lesson";

  @include mq ($until: medium) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, min-content);
    grid-template-areas:
      "text"
      "gates"
      "circuit"
      "explanation"
      "lesson";
  }

  &__config-container {
    display: none;
  }

  &__exercise-text {
    @include type-style('body-long-01');
    grid-area: text;
    border-bottom: 1px solid $border-color;
    padding: $spacing-05;
  }
  &__explanation {
    @include type-style('body-long-01');
    grid-area: explanation;
    padding: $spacing-05;
  }
  &__gates {
    grid-area: gates;
    border-bottom: 1px solid $border-color;
    padding: $spacing-05;
    &__title {
      margin: $spacing-03 0 $spacing-05 0;
      @include type-style('heading-01');
    }
  }
  &__circuit-section {
    grid-area: circuit;
    padding: $spacing-05;
    display: grid;
    grid-template-columns: 1fr 4rem;
    grid-template-rows: min-content 1fr;
    grid-template-areas:
      "title reset"
      "line line";

    &__title {
      grid-area: title;
      margin-top: $spacing-03;
      @include type-style('heading-01');
    }
    &__reset {
      @include type-style('body-short-01');
      grid-area: reset;
      display: flex;
      flex-flow: row;
      gap: $spacing-03;
      color: $link-color-tertiary;
      &__icon{
        height: 16px;
      }
      &:hover {
        color: $link-hover-color-tertiary;
      }
    }
    &__circuit-lines {
      grid-area: line;
    }
  }
  &__state-views {
    grid-area: lesson;
    display: flex;
    flex-direction: column;
    gap: $spacing-05;
    border-left: 1px solid $border-color;
    padding: $spacing-05;

    @include mq ($until: medium) {
      border-left: none;
      border-top: 1px solid $border-color;
    }

    &__title {
      @include type-style('heading-01');
      margin-top: $spacing-03;
    }
    &__area {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      height: 16px;
      width: 16px;
      border: 2px solid $border-color;
      background-color: $background-color-white;
    }
  }
}
</style>
