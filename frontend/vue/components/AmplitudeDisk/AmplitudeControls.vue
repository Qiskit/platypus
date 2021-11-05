<template>
  <div class="amplitude-controls">
    <NumberInput
      :label="'Magnitude:'"
      :value="magnitude"
      :min="0"
      :max="1"
      :step="0.05"
      @onValueChange="magnitudeChange"
    />
    <NumberInput
      :label="'Phase:'"
      :value="Math.trunc(phase)"
      :min="0"
      :max="359"
      :step="1"
      @onValueChange="phaseChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import NumberInput from '../common/NumberInput.vue'
import { Amplitude } from './amplitude'

export default defineComponent({
  name: 'AmplitudeControls',
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
    }
  },
  data () {
    return {
      internalAmplitude: { phase: 30, magnitude: 1 }
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
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/colors.scss';

.amplitude-controls {
  display: flex;
  flex-direction: column;
  width: 9rem;
  gap: $spacing-05;
}
</style>
