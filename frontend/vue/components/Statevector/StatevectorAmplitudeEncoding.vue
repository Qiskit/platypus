<template>
  <StatevectorBaseWidget
    :number-of-elements="4"
    :max-value="1"
    :min-value="-1"
    :step="0.01"
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
  name: 'StatevectorAmplitudeEncoding',
  components: {
    StatevectorBaseWidget
  },
  methods: {
    transformFunction (slidersValues: number[], currentAmplitudes: Amplitude[]): Amplitude[] {
      return Array.from({ length: currentAmplitudes.length }, (_, index: number) => {
        return { magnitude: Math.abs(slidersValues[index]), phase: slidersValues[index] < 0 ? 180 : 0 }
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
