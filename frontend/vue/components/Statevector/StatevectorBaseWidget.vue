<template>
  <div class="statevector-base-widget">
    <div class="statevector-base-widget__explanation">
      <slot />
    </div>
    <div class="statevector-base-widget__input-data">
      <bx-slider
        v-for="(value, index) in slidersData"
        :key="index"
        min="0"
        max="100"
        step-ratio="1"
        :value="value"
        @bx-slider-changed="sliderChangedHandler($event.detail.value, index)"
      >
        <bx-slider-input />
      </bx-slider>
    </div>
    <div class="statevector-base-widget__output-data">
      <AmplitudeDisk
        v-for="(data, index) in amplitudeDiskData"
        :key="index"
        :magnitude="data.magnitude"
        :phase="data.phase"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import 'carbon-web-components/es/components/slider/slider.js'
import 'carbon-web-components/es/components/slider/slider-input.js'
import AmplitudeDisk from '../AmplitudeDisk/AmplitudeDisk.vue'
import { Amplitude } from '../AmplitudeDisk/amplitude'

const numberOfElements = 4

export default defineComponent({
  name: 'StatevectorBaseWidget',
  components: {
    AmplitudeDisk
  },
  props: {
    transformFunction: { type: Function, default: (a: number) => ({ magnitude: 1 / numberOfElements, phase: a === 0 ? 0 : 180 }) }
  },
  data () {
    return {
      slidersData: Array.from({ length: numberOfElements }, _ => Math.round(Math.random() * 100)) as number[],
      amplitudeDiskData: Array.from({ length: numberOfElements }, _ => ({ magnitude: 1 / numberOfElements, phase: 0 })) as Amplitude[]
    }
  },
  mounted () {
    for (let i = 0; i < numberOfElements; i++) {
      this.sliderChangedHandler(this.slidersData[i], i)
    }
  },
  methods: {
    sliderChangedHandler (value: number, index: number) {
      this.slidersData[index] = value
      this.amplitudeDiskData[index] = this.transformFunction(value)
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/colors.scss';
@import '~/../scss/variables/mq.scss';

.statevector-base-widget {

}

</style>
