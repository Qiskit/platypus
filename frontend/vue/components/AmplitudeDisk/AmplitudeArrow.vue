<template>
  <div
    v-if="isInteractive || internalAmplitude.magnitude > 0.01"
    class="amplitude-arrow"
    :style="`--magnitude: ${internalAmplitude.magnitude}; --phase: ${internalAmplitude.phase}`"
  >
    <div ref="origin" class="amplitude-arrow__origin-reference" />
    <div class="amplitude-arrow__line" />
    <div
      class="amplitude-arrow__head"
      :class="{
        'amplitude-arrow__head__grabbable': isInteractive,
        'amplitude-arrow__head__grabbing': isGrabbing
      }"
      @pointerdown="startGrabbingArrow"
      @pointerup="stopGrabbingArrow"
      @pointermove="grabArrow"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { Point } from '@mathigon/euclid'
import { Amplitude } from './amplitude'

export default defineComponent({
  name: 'AmplitudeArrow',
  components: {
  },
  props: {
    amplitude: {
      type: Object,
      required: false,
      default: () => {
        return { phase: 30, magnitude: 1 }
      }
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
  watch: {
    amplitude (newVal) {
      this.internalAmplitude = newVal
    }
  },
  mounted () {
    this.internalAmplitude = this.amplitude as Amplitude
  },
  methods: {
    startGrabbingArrow () {
      this.isGrabbing = this.isInteractive
    },
    stopGrabbingArrow () {
      this.isGrabbing = false
    },
    grabArrow (evt: any) {
      if (this.isGrabbing) {
        const origin = this.$refs.origin as HTMLDivElement
        const originClientRect = origin.getBoundingClientRect()
        this.center = new Point(originClientRect.x, originClientRect.y)

        const dragPosition = new Point(evt.x, evt.y)
        const vector = dragPosition.subtract(this.center)
        const vectorUnit = vector.unitVector

        this.internalAmplitude.phase = (Math.atan2(vectorUnit.x, vectorUnit.y) * 180 / Math.PI) - 90
        if (this.internalAmplitude.phase < 0) {
          this.internalAmplitude.phase += 360
        }
        this.internalAmplitude.magnitude = Math.max(Math.min(vector.length / 50, 1), 0)
        this.$emit('updateAmplitude', this.internalAmplitude)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/colors.scss';

.amplitude-arrow {
  transform: translate(-50%, -50%) rotate(calc(var(--phase, 30) * -1deg)) translate(50%, 0);
  width: calc(var(--magnitude, 1) * 50%);
  height: 0px;
  pointer-events: none;

  &__line {
    position: absolute;
    width: calc(100% - 5px);
    height: calc(var(--arrow-thickness, 1) * 1px);
    top: calc(var(--arrow-thickness, 1) * -0.5px);
    background-color: $block-border-color;
    transition: all 0.2s ease-in;
  }
  &__head {
    position: absolute;
    right: -1.5rem;
    top: 50%;
    width: 3rem;
    height: 3rem;
    transform: translate(0%, -50%);

    &::after {
      content: "";
      display: block;
      position: absolute;
      transform: translate(0%, -2.5px);
      top: 50%;
      right: 50%;
      width: 0;
      height: 0;

      transition: all 0.2s ease-in;
      border-top: 2.5px solid transparent;
      border-bottom: 2.5px solid transparent;

      border-left: 6px solid $block-border-color;
    }

    &__grabbable {
      cursor: grab;
      pointer-events: auto;
      touch-action: none;

      &:hover::after {
        transform: translate(4px, -6px);
        border-top-width: 6.5px;
        border-bottom-width: 6.5px;

        border-left-width: 14px;
      }
    }

    &__grabbing {
      cursor: grabbing;
    }
  }
  &__origin-reference {
    width: 0;
    height: 0;
    position: absolute;
    display: block;
    left: 0;
    top: 50%;
  }
}
</style>
