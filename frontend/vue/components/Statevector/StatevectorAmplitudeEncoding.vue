<template>
  <StatevectorBaseWidget
    class="statevector-amplitude-encoding"
    :number-of-elements="4"
    :max-value="1"
    :min-value="-1"
    :step="0.01"
    :transform-function="transformFunction"
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Convallis vitae elit fermentum sit. Pellentesque congue risus sed condimentum viverra dolor. Sapien nunc vulputate posuere vel.
    <div class="statevector-amplitude-encoding__warning">
      {{ areAllValuesZero ? 'Cannot analyze all zero values' : '&nbsp;' }}
    </div>
  </StatevectorBaseWidget>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { Amplitude } from '../AmplitudeDisk/amplitude'
import StatevectorBaseWidget from './StatevectorBaseWidget.vue'

export default defineComponent({
  name: 'StatevectorAmplitudeEncoding',
  components: {
    StatevectorBaseWidget
  },
  data () {
    return {
      areAllValuesZero: false
    }
  },
  methods: {
    transformFunction (slidersValues: number[], _: Amplitude[]): Amplitude[] {
      this.areAllValuesZero = !slidersValues.some(value => value !== 0)
      if (this.areAllValuesZero) {
        const sqrtOfLenght = 1 / Math.sqrt(slidersValues.length)
        return Array.from({ length: slidersValues.length }, () => ({ magnitude: sqrtOfLenght, phase: 0 }))
      }

      const squaredValues = slidersValues.map(value => value * value)
      const squaredValuesSum = squaredValues.reduce((sum, currentValue) => sum + currentValue)
      const sqrtOfSquaredValuesSum = Math.sqrt(squaredValuesSum)

      return slidersValues.map((value) => {
        return { magnitude: Math.abs(value / sqrtOfSquaredValuesSum), phase: value < 0 ? 180 : 0 }
      })
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
