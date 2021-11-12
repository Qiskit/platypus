<template>
  <div
    class="amplitude-addition-disk"
  >
    <AmplitudeDisk
      class="amplitude-addition-disk__result"
      :magnitude="amplitudeResult.magnitude"
      :phase="amplitudeResult.phase"
    />
    <div class="amplitude-addition-disk__summands-arrows">
      <AmplitudeArrow
        class="amplitude-addition-disk__summands-arrows__A"
        :amplitude="amplitudeA"
        :is-interactive="false"
        @updateAmplitude="updateInternalAmplitude"
      />
      <div
        class="amplitude-addition-disk__summands-arrows__B__wrapper"
        :style="`--phase-offset: ${phaseA}; --magnitude-offset:${magnitudeA};`"
      >
        <AmplitudeArrow
          class="amplitude-addition-disk__summands-arrows__B"
          :amplitude="amplitudeB"
          :is-interactive="false"
          @updateAmplitude="updateInternalAmplitude"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { Point, toDeg, toRad } from '@mathigon/euclid'
import AmplitudeArrow from './AmplitudeArrow.vue'
import AmplitudeDisk from './AmplitudeDisk.vue'
import { Amplitude } from './amplitude'

export default defineComponent({
  name: 'AmplitudeAdditionDisk',
  components: {
    AmplitudeArrow,
    AmplitudeDisk
  },
  props: {
    magnitudeA: {
      type: Number,
      required: false,
      default: 0.7071
    },
    phaseA: {
      type: Number,
      required: false,
      default: 30
    },
    magnitudeB: {
      type: Number,
      required: false,
      default: 0.7071
    },
    phaseB: {
      type: Number,
      required: false,
      default: 30
    }
  },
  computed: {
    amplitudeA (): Amplitude {
      return { phase: this.phaseA, magnitude: this.magnitudeA }
    },
    amplitudeB (): Amplitude {
      return { phase: this.phaseB, magnitude: this.magnitudeB }
    },
    amplitudeResult (): Amplitude {
      const vectorA = Point.fromPolar(toRad(this.phaseA), this.magnitudeA)
      const vectorB = Point.fromPolar(toRad(this.phaseB), this.magnitudeB)
      const vectorResult = vectorA.add(vectorB)
      const vectorResultUnit = vectorResult.unitVector

      const phaseResult = toDeg(Math.atan2(vectorResultUnit.y, vectorResultUnit.x))
      const magnitudeResult = vectorResult.length

      return { phase: phaseResult, magnitude: magnitudeResult }
    },
    amplitudeOverflow (): boolean {
      return this.amplitudeResult.magnitude > 1
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/colors.scss';

.amplitude-addition-disk {
  position: relative;
  width: 100px;
  height: 100px;
  margin: $spacing-05;

  &__result {
    position: relative;
    top: 0;
    left: 0;
    margin: 0;
  }
  &__summands-arrows {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &__A {
      position: absolute;
      left: 50%;
      top: 50%;
      opacity: 0.5;
    }
    &__B {
      position: absolute;
      left: 50%;
      top: 50%;
      opacity: 0.5;

      &__wrapper {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        pointer-events: none;
        transform: rotate(calc(var(--phase-offset, 30) * -1deg)) translate(calc(var(--magnitude-offset, 1) * 50%), 0)  rotate(calc(var(--phase-offset, 30) * 1deg));
      }
    }
  }
}

</style>
