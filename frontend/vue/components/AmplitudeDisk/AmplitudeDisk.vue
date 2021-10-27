<template>
  <div
    class="amplitude-disk"
    :style="`--magnitude: ${internalMagnitude}; --phase: ${internalPhase}`"
    @pointerout="stopGrabbingArrow"
  >
    <div class="amplitude-disk__magnitude-disk" />
    <div class="amplitude-disk__arrows">
      <div class="amplitude-disk__arrows__main">
        <div ref="origin" class="amplitude-disk__arrows__main__origin-reference" />
        <div class="amplitude-disk__arrows__main__line" />
        <div
          class="amplitude-disk__arrows__main__head"
          :class="{
            'amplitude-disk__arrows__main__head__grabbable': isInteractive,
            'amplitude-disk__arrows__main__head__grabbing': isGrabbing
          }"
          @pointerdown="startGrabbingArrow"
          @pointerup="stopGrabbingArrow"
          @pointermove="grabArrow"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { Point } from '@mathigon/euclid'

export default defineComponent({
  name: 'AmplitudeDisk',
  components: {
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
    this.internalPhase = this.phase
    this.internalMagnitude = this.magnitude
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

        this.internalPhase = (Math.atan2(vectorUnit.x, vectorUnit.y) * 180 / Math.PI) - 90
        this.internalMagnitude = Math.max(Math.min(vector.length / 50, 1), 0)
      }
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
      transform: translate(-50%, -50%) rotate(calc(var(--phase, 30) * -1deg)) translate(50%, 0);
      width: calc(var(--magnitude, 1) * 50%);
      height: 0px;

      &__line {
        position: absolute;
        width: calc(100% - 6px);
        height: 1px;

        background-color: $block-border-color;
      }
      &__head {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(0%, -3px);

        transition: all 0.2s ease-in;
        width: 0;
        height: 0;
        border-top: 3.5px solid transparent;
        border-bottom: 3.5px solid transparent;

        border-left: 7px solid $block-border-color;
        &__grabbable {
          cursor: grab;

          &:hover {
            transform: translate(4px, -6px);
            border-top: 6.5px solid transparent;
            border-bottom: 6.5px solid transparent;

            border-left: 14px solid $block-border-color;
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
  }
}
</style>
