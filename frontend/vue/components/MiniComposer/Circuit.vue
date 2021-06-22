<template>
  <div class="circuit">
    <QubitLine
      v-for="(qubitLine, index) in circuitState"
      :key="index"
      :circuit-state="qubitLine"
      :auto-measure-gate="autoMeasureGate"
      @onGatesChanged="OnGatesChanged"
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
import { GateName } from './Gate.vue'
import QubitLine from './QubitLine.vue'
import { ComposerGate } from './composerTypes'

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
  OnGatesChanged () {
    this.$emit('onCircuitChanged')
  }

  addLine () {
    this.circuitState.push([])
    this.$emit('onCircuitChanged')
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
