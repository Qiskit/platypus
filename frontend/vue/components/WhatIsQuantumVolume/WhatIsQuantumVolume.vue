<template>
  <section class="what-is-qv">
    <div class="what-is-qv__text-wrapper">
      <p class="what-is-qv__text">
        {{ stepDescription[selectedInt] }}
      </p>
    </div>
    <WhatIsQVChart class="what-is-qv__chart" :state="selectedInt" :tooltip="tooltipHoverTexts" />
    <DotsSelector class="what-is-qv__selector" :count="5" @onSelectedChange="OnDotChange" />
  </section>
</template>

<script lang="ts">
import { Options, Vue, prop } from 'vue-class-component'
import DotsSelector from '../common/DotsSelector.vue'
import WhatIsQVChart from './WhatIsQVChart.vue'
import LayersCircuit from './LayersCircuit.vue'

class Props {
  goal = prop<String>({ default: 'wiqv-solved', required: true });
  goalStep = prop<Number>({ default: 4, required: true });
}

@Options({
  components: {
    DotsSelector,
    WhatIsQVChart,
    LayersCircuit
  }
})
export default class WhatIsQuantumVolume extends Vue.with(Props) {
  selectedInt = 0
  stepDescription = [
    'Click through these slides for a quick overview on quantum volume.',
    'The power of our quantum computer is limited by the number of available qubits. Near term quantum computers are error prone, which needs to be taken into consideration. This is also limits the power of our quantum computer.',
    'When a quantum computer achieves a quantum volume score, it means the computer has both a certain number of qubits, and certain ability to manipulate those qubits, but you can’t compensate for one with the other.',
    'To achieve a quantum volume score, your quantum computer needs to successfully run the ‘square’ circuits specified by the quantum volume test. A square circuit is constructed from randomly chosen two-qubit gates, and the depth of the circuit is equal to the number of qubits. Each ‘layer’ in the circuit pairs our qubits up and performs one of the gates on each pair. Hover over the diagram to see an example.',
    'The quantum volume of a device is then the largest size of square circuit our quantum computer can reliably execute. 2^(circuit size) roughly corresponds to how difficult the circuit is to simulate classically, so we define the quantum volume as 2 to the power of the largest square circuit size we can reliably execute. Hover over the circuits below to see how they correlate to quantum volume value.'
  ]

  tooltipHoverTexts = [
    'A quantum computer that can reliably run a circuit of depth and width 2 has a quantum volume of 2² = 4',
    'A quantum computer that can reliably run a circuit of depth and width 3 has a quantum volume of 2³ = 8',
    'A quantum computer that can reliably run a circuit of depth and width 4 has a quantum volume of 2⁴ = 16',
    'A quantum computer that can reliably run a circuit of depth and width 5 has a quantum volume of 2⁵ = 32'
  ]

  isScored: boolean = false

  OnDotChange (value: number) {
    this.selectedInt = value
    if (!this.isScored && this.goalStep === this.selectedInt) {
      this.$step?.score(this.goal as string)
    }
  }
}
</script>

<style lang="scss">
html.dark-theme {
  .what-is-qv {
    background: transparent;
    filter: invert(1) hue-rotate(180deg);
  }
}
</style>

<style scoped lang="scss">
@import '~/../scss/variables/colors.scss';

.what-is-qv {
  background-color: $background-color-lighter;
  color: $text-color-light;

  &__chart {
    position: relative;
    margin-bottom: 50px;
  }
  &__text {
    flex: 1;

    &-wrapper {
      display: flex;
      align-items: center;
      padding: 15px 15px 0 15px;
      min-height: 115px;
    }
  }
}
</style>
