<template>
  <div class="amplitude-disk-with-values">
    <AmplitudeDisk
      :magnitude="internalAmplitude.magnitude"
      :phase="internalAmplitude.phase"
      :is-interactive="isInteractive"
      @updateAmplitude="updateInternalAmplitude"
    />
    <AmplitudeValues
      :magnitude="internalAmplitude.magnitude"
      :phase="internalAmplitude.phase"
      :is-interactive="isInteractive"
      @updateAmplitude="updateInternalAmplitude"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { Point } from '@mathigon/euclid'
import AmplitudeValues from './AmplitudeValues.vue'
import AmplitudeDisk from './AmplitudeDisk.vue'
import { Amplitude } from './amplitude'

export default defineComponent({
  name: 'AmplitudeDiskWithValues',
  components: {
    AmplitudeDisk,
    AmplitudeValues
  },
  props: {
    magnitude: {
      type: Number,
      required: false,
      default: 0.7071
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
      isGrabbing: false,
      center: new Point(0, 0),
      internalAmplitude: { phase: 30, magnitude: 1 }
    }
  },
  computed: {
    amplitudeOverflow (): boolean {
      return this.internalAmplitude.magnitude > 1
    }
  },
  watch: {
    phase (newVal) {
      this.updateInternalAmplitude({ phase: newVal, magnitude: this.internalAmplitude.magnitude } as Amplitude)
    },
    magnitude (newVal) {
      this.updateInternalAmplitude({ phase: this.internalAmplitude.phase, magnitude: newVal } as Amplitude)
    }
  },
  mounted () {
    this.updateInternalAmplitude({ phase: this.phase, magnitude: this.magnitude } as Amplitude)
  },
  methods: {
    updateInternalAmplitude (amplitude: Amplitude) {
      this.internalAmplitude = { phase: amplitude.phase, magnitude: Math.min(amplitude.magnitude, 1.1) }
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/colors.scss';

.amplitude-disk-with-values {
  display: flex;
  flex-direction: var(--display-direction, column);
  align-items: center;
  gap: $spacing-05;
}
</style>
