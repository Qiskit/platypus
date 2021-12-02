<template>
  <StatevectorBaseWidget
    :number-of-elements="4"
    :amplitude-disk-data="amplitudeDiskData"
  >
    <template #default>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Convallis vitae elit fermentum sit. Pellentesque congue risus sed condimentum viverra dolor. Sapien nunc vulputate posuere vel.
    </template>
    <template #input-elements>
      <bx-checkbox
        v-for="(value, index) in inputData"
        :key="index"
        class="statevector-binary-encoding__input-data__slider"
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
      amplitudeDiskData: [] as Amplitude[]
    }
  },
  mounted () {
    this.inputData = Array.from({ length: numberOfElements }, _ => randomValue(1, 0, 1) === 1) as boolean[]
    this.amplitudeDiskData = this.transformFunction(this.inputData)
  },
  methods: {
    transformFunction (inputValues: boolean[]) : Amplitude[] {
      /*
      M = 1/sqrt(len(data))
      for index, amp in enumerate(amplitudes):
        amp.phase = 0
        if index in data:
          amp.magnitude = M
        else:
          amp.magnitude = 0
      */
      const valuesCount = inputValues.filter(value => value).length
      const magnitude = 1 / Math.sqrt(valuesCount)

      return Array.from({ length: inputValues.length }, (_, index: number) => {
        const isOn = inputValues[index]
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
@import '~/../scss/variables/mq.scss';

</style>
