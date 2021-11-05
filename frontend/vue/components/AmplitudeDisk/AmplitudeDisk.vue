<template>
  <div class="amplitude-disk__wrapper">
    <div
      class="amplitude-disk"
      :style="`--magnitude: ${internalAmplitude.magnitude}; --phase: ${internalAmplitude.phase}`"
      @pointerout="stopGrabbingArrow"
    >
      <div
        class="amplitude-disk__magnitude-disk"
        :class="{'amplitude-disk__magnitude-disk_amplitude-overflow': amplitudeOverflow}"
      />
      <AmplitudeArrow
        class="amplitude-disk__arrow"
        :amplitude="internalAmplitude"
        :is-interactive="isInteractive"
        @updateAmplitude="updateInternalAmplitude"
      />
    </div>
    <AmplitudeControls v-if="showControls" :magnitude="internalAmplitude.magnitude" :phase="internalAmplitude.phase" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { Point } from '@mathigon/euclid'
import AmplitudeArrow from './AmplitudeArrow.vue'
import AmplitudeControls from './AmplitudeControls.vue'
import { Amplitude } from './amplitude'

export default defineComponent({
  name: 'AmplitudeDisk',
  components: {
    AmplitudeArrow,
    AmplitudeControls
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
    },
    showControls: {
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

.amplitude-disk {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: $background-color-light;
  position: relative;

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-05;
  }

  &__magnitude-disk {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.5s ease-in-out;
    width: calc(var(--magnitude, 1) * 100%);
    height: calc(var(--magnitude, 1) * 100%);
    border-radius: 50%;
    background-color: $background-color-quaternary;
    border: 1px solid $block-border-color;

    &_amplitude-overflow {
      background-color: $status-color-wrong;
      opacity: 0.7;
    }
  }

  &__arrow {
    position: absolute;
    left: 50%;
    top: 50%;
  }

  &__secondary {
    position: absolute;
    left: 50%;
    top: 50%;

    &__wrapper {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      pointer-events: none;
      transform: rotate(calc(var(--phase, 30) * -1deg)) translate(calc(var(--magnitude, 1) * 50%), 0)  rotate(calc(var(--phase, 30) * 1deg));
    }
  }
}
</style>
