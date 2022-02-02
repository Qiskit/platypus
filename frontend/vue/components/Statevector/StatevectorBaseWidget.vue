<template>
  <div class="statevector-base-widget">
    <div class="statevector-base-widget__explanation">
      <slot />
    </div>
    <div class="statevector-base-widget__input-data">
      <h5 class="statevector-base-widget__input-data__title">
        Input data
      </h5>
      <slot name="input-elements" />
    </div>
    <div class="statevector-base-widget__output-data">
      <h5 class="statevector-base-widget__output-data__title">
        Output statevector
      </h5>
      <div class="statevector-base-widget__output-data__statevector__wrapper">
        <StatevectorBrackets class="statevector-base-widget__output-data__statevector">
          <AmplitudeDisk
            v-for="(data, index) in internalAmplitudeDiskData"
            :key="index"
            class="statevector-base-widget__output-data__statevector__disk"
            :magnitude="data.magnitude"
            :phase="data.phase"
          />
        </StatevectorBrackets>
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
import StatevectorBrackets from './StatevectorBrackets.vue'

export default defineComponent({
  name: 'StatevectorBaseWidget',
  components: {
    AmplitudeDisk,
    StatevectorBrackets
  },
  props: {
    numberOfElements: { type: Number, default: 4 },
    amplitudeDiskData: { type: Array, default: () => [] }
  },
  data () {
    return {
      internalAmplitudeDiskData: [] as Amplitude[]
    }
  },
  watch: {
    amplitudeDiskData (newVal) {
      this.internalAmplitudeDiskData = newVal
    }
  },
  mounted () {
    this.internalAmplitudeDiskData = this.amplitudeDiskData as Amplitude[]
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

  @include mq($until: medium) {
    grid-template-areas:
      "explanation"
      "input"
      "output";
    grid-template-columns: auto;
  }

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
