<template>
  <StatevectorBaseWidget
    :number-of-elements="4"
    :max-value="3"
    :min-value="0"
    :transform-function="transformFunction"
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Convallis vitae elit fermentum sit. Pellentesque congue risus sed condimentum viverra dolor. Sapien nunc vulputate posuere vel.
  </StatevectorBaseWidget>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { Amplitude } from '../AmplitudeDisk/amplitude'
import StatevectorBaseWidget from './StatevectorBaseWidget.vue'

export default defineComponent({
  name: 'StatevectorBinaryEncoding',
  components: {
    StatevectorBaseWidget
  },
  methods: {
    transformFunction (slidersValues: number[], currentAmplitudes: Amplitude[]) : Amplitude[] {
      const valuesCount = slidersValues.filter(value => value !== 0).length
      const magnitude = 1 / Math.sqrt(valuesCount)

      return Array.from({ length: currentAmplitudes.length }, (_, index: number) => {
        const isOn = slidersValues.includes(index)
        return { phase: 0, magnitude: isOn ? magnitude : 0 }
      })
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/colors.scss';
@import '~/../scss/variables/mq.scss';

</style>
