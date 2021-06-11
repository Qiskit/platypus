<template>
  <div class="circuit">
    <QubitLine
      v-for="(qubitLine, index) in circuitState"
      :key="index"
      :circuit-state="qubitLine"
      :auto-measure-gate="autoMeasureGate"
      @onGatesChanged="OnGatesChanged"
    />
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
}
</script>
<style scoped lang="scss">
@import 'carbon-components/scss/globals/scss/typography';
@import 'carbon-components/scss/globals/scss/layout';
@import '../../../scss/variables/colors.scss';
@import '~/../scss/variables/mq.scss';

.circuit-line {
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
</style>
