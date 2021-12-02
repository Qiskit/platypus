<template>
  <StatevectorBaseWidget
    class="statevector-amplitude-encoding"
    :number-of-elements="numberOfElements"
    :amplitude-disk-data="amplitudeDiskData"
  >
    <template #default>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Convallis vitae elit fermentum sit. Pellentesque congue risus sed condimentum viverra dolor. Sapien nunc vulputate posuere vel.
      <div class="statevector-amplitude-encoding__warning">
        {{ areAllValuesZero ? 'Cannot analyze all zero values' : '&nbsp;' }}
      </div>
    </template>
    <template #input-elements>
      <SliderInput
        v-for="(value, index) in inputData"
        :key="index"
        class="statevector-amplitude-encoding__input-data__slider"
        :min="minValue"
        :max="maxValue"
        :step="step"
        :value="value"
        @value-changed="inputChangedHandler($event, index)"
      />
    </template>
  </StatevectorBaseWidget>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { Amplitude } from '../AmplitudeDisk/amplitude'
import SliderInput from '../common/SliderInput.vue'
import { randomValue } from '../../../ts/utilities'
import StatevectorBaseWidget from './StatevectorBaseWidget.vue'

const numberOfElements = 4

export default defineComponent({
  name: 'StatevectorAmplitudeEncoding',
  components: {
    StatevectorBaseWidget,
    SliderInput
  },
  props: {
    maxValue: { type: Number, default: 1 },
    minValue: { type: Number, default: -1 },
    step: { type: Number, default: 0.01 }
  },
  data () {
    return {
      inputData: [] as number[],
      areAllValuesZero: false,
      amplitudeDiskData: [] as Amplitude[]
    }
  },
  mounted () {
    this.inputData = Array.from({ length: numberOfElements }, _ => randomValue(this.maxValue, this.minValue, this.step)) as number[]
    this.amplitudeDiskData = this.transformFunction(this.inputData)
  },
  methods: {
    transformFunction (inputValues: number[]): Amplitude[] {
      this.areAllValuesZero = !inputValues.some(value => value !== 0)
      if (this.areAllValuesZero) {
        const sqrtOfLenght = 1 / Math.sqrt(inputValues.length)
        return Array.from({ length: inputValues.length }, () => ({ magnitude: sqrtOfLenght, phase: 0 }))
      }

      const squaredValues = inputValues.map(value => value * value)
      const squaredValuesSum = squaredValues.reduce((sum, currentValue) => sum + currentValue)
      const sqrtOfSquaredValuesSum = Math.sqrt(squaredValuesSum)

      return inputValues.map((value) => {
        return { magnitude: Math.abs(value / sqrtOfSquaredValuesSum), phase: value < 0 ? 180 : 0 }
      })
    },
    inputChangedHandler (value: number, index: number) {
      this.inputData[index] = value
      this.amplitudeDiskData = this.transformFunction(this.inputData)
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/colors.scss';
@import '~/../scss/variables/mq.scss';

.statevector-amplitude-encoding {
  &__warning {
    @include type-style('body-short-01');
    color: $status-color-wrong;
    margin: $spacing-03 0;
  }
}

</style>
