<template>
  <div
    class="amplitude-disk"
    :style="`--magnitude: ${internalMagnitude}; --phase: ${internalPhase}`"
    @pointerout="stopGrabbingArrow"
  >
    <div class="amplitude-disk__magnitude-disk" />
    <div class="amplitude-disk__arrows">
      <AmplitudeArrow
        class="amplitude-disk__arrows__main"
        :magnitude="magnitude"
        :phase="phase"
        :is-interactive="isInteractive"
        @updateAmplitude="updateInternalAmplitude"
      />
      <div class="amplitude-disk__arrows__secondary__wrapper">
        <AmplitudeArrow
          class="amplitude-disk__arrows__secondary"
          :magnitude="internalMagnitude"
          :phase="internalPhase"
          :is-interactive="false"
          @updateAmplitude="updateInternalAmplitude"
        />
      </div>
      <!--AmplitudeArrow
        class="amplitude-disk__arrows__result"
        :magnitude="magnitude"
        :phase="phase"
        :is-interactive="isInteractive"
        @updateAmplitude="updateInternalAmplitude"
      /-->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { Point } from '@mathigon/euclid'
import AmplitudeArrow from './AmplitudeArrow.vue'

export default defineComponent({
  name: 'AmplitudeDisk',
  components: {
    AmplitudeArrow
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
      internalPhase: 0,
      internalMagnitude: 0
    }
  },
  watch: {
    phase (newVal) {
      this.internalPhase = newVal
    },
    magnitude (newVal) {
      this.internalMagnitude = newVal
    }
  },
  mounted () {
    this.updateInternalAmplitude({ phase: this.phase, magnitude: this.magnitude })
  },
  methods: {
    updateInternalAmplitude (amplitude: { phase: number, magnitude: number }) {
      this.internalPhase = amplitude.phase
      this.internalMagnitude = amplitude.magnitude
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
  }

  &__arrows {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    width: 100%;
    height: 100%;

    &__main {
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
}
</style>
