<template>
  <div class="amplitude-values">
    <NumberInput
      v-if="isInteractive"
      class="amplitude-values__magnitude-control"
      :label="'Magnitude:'"
      :value="round2Decimals(magnitude)"
      :min="0"
      :max="1"
      :step="0.05"
      @onValueChange="magnitudeChange"
    />
    <div v-else class="amplitude-values__magnitude-state">
      <span class="amplitude-values__magnitude-state__label">Magnitude:</span>
      <span class="amplitude-values__magnitude-state__value">{{ round2Decimals(magnitude) }}</span>
      <span class="amplitude-values__magnitude-state__warning">{{ magnitude > 1 ? warningMessage : '' }}</span>
    </div>
    <NumberInput
      v-if="isInteractive"
      class="amplitude-values__phase-control"
      :label="'Phase:'"
      :value="Math.trunc(phase)"
      :min="0"
      :max="359"
      :step="5"
      @onValueChange="phaseChange"
    />
    <div v-else class="amplitude-values__phase-state">
      <span class="amplitude-values__phase-state__label">Phase:</span>
      <span class="amplitude-values__phase-state__value">{{ Math.trunc(phase) }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import NumberInput from '../common/NumberInput.vue'
import { Amplitude } from './amplitude'

export default defineComponent({
  name: 'AmplitudeValues',
  components: {
    NumberInput
  },
  props: {
    magnitude: {
      type: Number,
      required: false,
      default: 0.7
    },
    phase: {
      type: Number,
      required: false,
      default: 30
    },
    isInteractive: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      internalAmplitude: { phase: 30, magnitude: 1 },
      warningMessage: 'Cannot be > 1'
    }
  },
  watch: {
    phase (newVal) {
      this.phaseChange(newVal)
    },
    magnitude (newVal) {
      this.magnitudeChange(newVal)
    }
  },
  mounted () {
    this.updateInternalAmplitude({ phase: this.phase, magnitude: this.magnitude } as Amplitude)
  },
  methods: {
    phaseChange (newVal: number) {
      this.updateInternalAmplitude({ phase: newVal, magnitude: this.internalAmplitude.magnitude } as Amplitude)
    },
    magnitudeChange (newVal: number) {
      this.updateInternalAmplitude({ phase: this.internalAmplitude.phase, magnitude: newVal } as Amplitude)
    },
    updateInternalAmplitude (amplitude: Amplitude) {
      this.internalAmplitude = { phase: amplitude.phase, magnitude: Math.min(amplitude.magnitude, 1.1) }
      this.$emit('updateAmplitude', this.internalAmplitude)
    },
    round2Decimals (val: number) {
      return Math.round(val * 100) / 100
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/colors.scss';

.amplitude-values {
  display: flex;
  flex-direction: column;
  width: 9.5rem;
  gap: $spacing-05;

  &__phase-state,
  &__magnitude-state {
    height: 5rem;
    &__label {
      @include type-style('body-long-01');
      display: block;
      margin-bottom: $spacing-03;
    }
    &__value {
      @include type-style('expressive-heading-04');
      display: block;
      height: 3rem;
    }
  }

  &__magnitude-state {
    &__value {
      height: 2rem;
    }
    &__warning {
      @include type-style('body-short-01');
      color: $status-color-wrong;
      height: 1rem;
    }
  }
}

</style>
