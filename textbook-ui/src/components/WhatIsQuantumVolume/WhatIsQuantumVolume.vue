<template>
  <section class="what-is-qv">
    <p class="what-is-qv__text">
      {{ stepDescription[selectedInt] }}
    </p>
    <WhatIsQVChart class="what-is-qv__chart" :state="selectedInt" :tooltip="tooltipHoverTexts" />
    <DotsSelector class="what-is-qv__selector" :count="6" @onSelectedChange="value => selectedInt = value" />
  </section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import DotsSelector from './DotsSelector.vue'
import WhatIsQVChart from './WhatIsQVChart.vue'

@Options({
  components: {
    DotsSelector,
    WhatIsQVChart
  }
})
export default class WhatIsQuantumVolumeSVG extends Vue {
  selectedInt = 0
  stepDescription = [
    'Need new introduction text here. But the idea is to show the full graphic upfront, then have it dissapear in the next slide in order to start telling the story.',
    'The power of our quantum computer is limited by the number of available qubits.',
    'Near term quantum computers are error prone, which needs to be taken into consideration. This is also limits the power of our quantum computer.',
    'When a quantum computer achieves a quantum volume score, it means the computer has both a certain number of qubits, and certain ability to manipulate those qubits, but you can’t compensate for one with the other.',
    'To achieve a quantum volume score, your quantum computer needs to successfully run the ‘square’ circuits specified by the quantum volume test. A square circuit is constructed from randomly chosen two-qubit gates, and the depth of the circuit is equal to the number of qubits. Each ‘layer’ in the circuit pairs our qubits up and performs one of the gates on each pair. Hover over the diagram to see an example.',
    'The quantum volume of a device is then the largest size of square circuit our quantum computer can reliably execute. 2^(circuit size) roughly corresponds to how difficult the circuit is to simulate classically, so we define the quantum volume as 2 to the power of the largest square circuit size we can reliably execute. Hover over the circuits below to see how they correlate to quantum volume value.'
  ]

  tooltipHoverTexts = [
    'A quantum computer that can reliably run a circuit of depth and width 2 has a quantum volume of 2^2 = 4',
    'A quantum computer that can reliably run a circuit of depth and width 3 has a quantum volume of 2^3 = 8',
    'A quantum computer that can reliably run a circuit of depth and width 4 has a quantum volume of 2^4 = 16',
    'A quantum computer that can reliably run a circuit of depth and width 5 has a quantum volume of 2^5 = 32'
  ]
}
</script>
<style scoped lang="scss">
.what-is-qv {
  background-color: #F2F4F8;

  &__chart {
    position: relative;
    margin-bottom: 50px;
  }
  &__text {
    padding: 30px 15px 0 15px;
    height: 180px;
  }
}
</style>
