<template>
  <div class="statevector-base-widget">
    <div class="statevector-base-widget__explanation">
      <slot />
    </div>
    <div class="statevector-base-widget__input-data">
      <h5 class="statevector-base-widget__input-data__title">
        Input data
      </h5>
      <SliderInput
        v-for="(value, index) in slidersData"
        :key="index"
        class="statevector-base-widget__input-data__slider"
        :min="minValue"
        :max="maxValue"
        :step="step"
        :value="value"
        @value-changed="sliderChangedHandler($event, index)"
      />
    </div>
    <div class="statevector-base-widget__output-data">
      <h5 class="statevector-base-widget__output-data__title">
        Output statevector
      </h5>
      <div class="statevector-base-widget__output-data__statevector__wrapper">
        <div class="statevector-base-widget__output-data__statevector">
          <AmplitudeDisk
            v-for="(data, index) in amplitudeDiskData"
            :key="index"
            class="statevector-base-widget__output-data__statevector__disk"
            :magnitude="data.magnitude"
            :phase="data.phase"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import 'carbon-web-components/es/components/slider/slider.js'
import 'carbon-web-components/es/components/slider/slider-input.js'
import AmplitudeDisk from '../AmplitudeDisk/AmplitudeDisk.vue'
import { Amplitude } from '../AmplitudeDisk/amplitude'
import SliderInput from '../common/SliderInput.vue'

const defaultTransformFunction = (slidersValues: number[], currentAmplitudes: Amplitude[], _: number) : Amplitude[] => {
  const magnitude = 1 / Math.sqrt(slidersValues.length)

  return Array.from({ length: currentAmplitudes.length }, (_, index: number) => {
    return { magnitude, phase: slidersValues[index] * 3.6 }
  })
}

function randomValue (min: number, max: number, step: number) {
  const rnd = Math.random()
  const rangedRandom = rnd * (max - min) + min

  return Math.round(rangedRandom / step) * step
}

export default defineComponent({
  name: 'StatevectorBaseWidget',
  components: {
    AmplitudeDisk,
    SliderInput
  },
  props: {
    transformFunction: { type: Function, default: defaultTransformFunction },
    maxValue: { type: Number, default: 100 },
    minValue: { type: Number, default: 0 },
    step: { type: Number, default: 1 },
    numberOfElements: { type: Number, default: 4 }
  },
  data () {
    return {
      slidersData: Array.from({ length: this.numberOfElements }, _ => randomValue(this.maxValue, this.minValue, this.step)) as number[],
      amplitudeDiskData: Array.from({ length: this.numberOfElements }, _ => ({ magnitude: 1 / this.numberOfElements, phase: 0 })) as Amplitude[]
    }
  },
  mounted () {
    this.amplitudeDiskData = this.transformFunction(this.slidersData, this.amplitudeDiskData, 0)
  },
  methods: {
    sliderChangedHandler (value: number, index: number) {
      this.slidersData[index] = value
      this.amplitudeDiskData = this.transformFunction(this.slidersData, this.amplitudeDiskData, index)
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/colors.scss';
@import '~/../scss/variables/mq.scss';

.statevector-base-widget {
  display: grid;
  grid-template-areas:
    "explanation output"
    "input output";
  grid-template-columns: 2fr minmax(8rem, 1fr);
  gap: $spacing-05 $spacing-08;

  &__explanation {
    @include type-style('body-long-01');
    grid-area: explanation;
  }
  &__input-data {
    grid-area: input;
    display: flex;
    flex-direction: column;
    gap: $spacing-05;

    &__title {
      @include type-style('expressive-heading-01');
    }
  }
  &__output-data {
    grid-area: output;
    display: flex;
    flex-direction: column;

    &__title {
      @include type-style('expressive-heading-01');
      margin-bottom: $spacing-05;
    }

    &__statevector {
      position: relative;

      &::before {
        content: "";
        border: solid black;
        border-width: 1px 0 1px 1px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: $spacing-05;
        border-radius: 0.5rem 0 0 0.5rem;
      }
      &::after {
        content: "";
        border: solid black;
        border-width: 1px 1px 1px 0;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        width: $spacing-05;
        border-radius: 0 0.5rem 0.5rem 0;
      }

      &__wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: $spacing-06;
        background-color: $background-color-white;
      }

      &__disk {
        width: 4rem;
        height: 4rem;
        margin: $spacing-03 $spacing-05;
      }
    }
  }
}

</style>
