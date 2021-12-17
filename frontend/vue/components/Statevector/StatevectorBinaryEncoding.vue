<template>
  <StatevectorBaseWidget
    class="statevector-binary-encoding"
    :number-of-elements="4"
    :amplitude-disk-data="amplitudeDiskData"
  >
    <template #default>
      <slot />
      <div class="statevector-binary-encoding__warning">
        {{ areAllValuesZero ? 'Cannot analyze all false values' : '&nbsp;' }}
      </div>
    </template>
    <template #input-elements>
      <bx-checkbox
        v-for="(value, index) in inputData"
        :key="index"
        :checked="value"
        :label-text="inputLabels[index]"
        @bx-checkbox-changed="inputChangedHandler($event, index)"
      />
    </template>
  </StatevectorBaseWidget>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { Amplitude } from '../AmplitudeDisk/amplitude'
import { randomValue } from '../../../ts/utilities'
import StatevectorBaseWidget from './StatevectorBaseWidget.vue'
import 'carbon-web-components/es/components/checkbox/checkbox.js'

const numberOfElements = 4

export default defineComponent({
  name: 'StatevectorBinaryEncoding',
  components: {
    StatevectorBaseWidget
  },
  data () {
    return {
      inputData: [] as boolean[],
      inputLabels: ['00', '01', '10', '11'],
      areAllValuesZero: false,
      amplitudeDiskData: [] as Amplitude[]
    }
  },
  mounted () {
    this.inputData = Array.from({ length: numberOfElements }, _ => randomValue(1, 0, 1) === 1) as boolean[]
    if (this.inputData.filter(value => value).length === 0) {
      this.inputData[0] = true
    }
    this.amplitudeDiskData = this.transformFunction(this.inputData)
  },
  methods: {
    transformFunction (inputValues: boolean[]) : Amplitude[] {
      let valuesCount = inputValues.filter(value => value).length
      this.areAllValuesZero = valuesCount === 0
      if (this.areAllValuesZero) {
        valuesCount = inputValues.length
      }
      const magnitude = 1 / Math.sqrt(valuesCount)

      return Array.from({ length: inputValues.length }, (_, index: number) => {
        const isOn = inputValues[index] || this.areAllValuesZero
        return { phase: 0, magnitude: isOn ? magnitude : 0 }
      })
    },
    inputChangedHandler (value: any, index: number) {
      this.inputData[index] = value.target.checked
      this.amplitudeDiskData = this.transformFunction(this.inputData)
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/colors.scss';

.statevector-binary-encoding {
  &__warning {
    @include type-style('body-short-01');
    color: $status-color-wrong;
    margin: $spacing-03 0;
  }
}
</style>
