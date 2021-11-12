<template>
  <div
    class="amplitude-addition-widget"
  >
    <AmplitudeDiskWithValues
      class="amplitude-addition-widget__disk amplitude-addition-widget__disk_a"
      :magnitude="internalAmplitudeA.magnitude"
      :phase="internalAmplitudeA.phase"
      :is-interactive="true"
      @updateAmplitude="updateInternalAmplitudeA"
    />
    <span class="amplitude-addition-widget__math-sign">+</span>
    <AmplitudeDiskWithValues
      class="amplitude-addition-widget__disk amplitude-addition-widget__disk_b"
      :magnitude="internalAmplitudeB.magnitude"
      :phase="internalAmplitudeB.phase"
      :is-interactive="true"
      @updateAmplitude="updateInternalAmplitudeB"
    />
    <span class="amplitude-addition-widget__math-sign">=</span>
    <AmplitudeAdditionDiskWithValues
      class="amplitude-addition-widget__disk amplitude-addition-widget__disk_result"
      :class="{
        'amplitude-addition-widget__disk_result_highlight-a': highlightedA,
        'amplitude-addition-widget__disk_result_highlight-b': highlightedB
      }"
      :magnitude-a="internalAmplitudeA.magnitude"
      :phase-a="internalAmplitudeA.phase"
      :magnitude-b="internalAmplitudeB.magnitude"
      :phase-b="internalAmplitudeB.phase"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import AmplitudeDiskWithValues from './AmplitudeDiskWithValues.vue'
import AmplitudeAdditionDiskWithValues from './AmplitudeAdditionDiskWithValues.vue'
import { Amplitude } from './amplitude'

export default defineComponent({
  name: 'AmplitudeAdditionDisk',
  components: {
    AmplitudeAdditionDiskWithValues,
    AmplitudeDiskWithValues
  },
  props: {
    magnitudeA: {
      type: Number,
      required: false,
      default: 0.8
    },
    phaseA: {
      type: Number,
      required: false,
      default: 30
    },
    magnitudeB: {
      type: Number,
      required: false,
      default: 0.6
    },
    phaseB: {
      type: Number,
      required: false,
      default: 190
    }
  },
  data () {
    return {
      internalAmplitudeA: { phase: 30, magnitude: 1 },
      internalAmplitudeB: { phase: 30, magnitude: 1 },
      highlightTimeoutA: undefined as undefined | ReturnType<typeof setTimeout>,
      highlightTimeoutB: undefined as undefined | ReturnType<typeof setTimeout>,
      highlightedA: false,
      highlightedB: false
    }
  },
  mounted () {
    this.updateInternalAmplitudeA({ phase: this.phaseA, magnitude: this.magnitudeA } as Amplitude)
    this.updateInternalAmplitudeB({ phase: this.phaseB, magnitude: this.magnitudeB } as Amplitude)
    this.highlightedA = false
    this.highlightedB = false
  },
  methods: {
    updateInternalAmplitudeA (amplitude: Amplitude) {
      if (this.highlightTimeoutA) {
        clearTimeout(this.highlightTimeoutA)
      }
      this.highlightedA = true
      this.highlightTimeoutA = setTimeout(this.removeHighlightA, 1000)
      this.internalAmplitudeA = { phase: amplitude.phase, magnitude: Math.min(amplitude.magnitude, 1.1) }
    },
    updateInternalAmplitudeB (amplitude: Amplitude) {
      if (this.highlightTimeoutB) {
        clearTimeout(this.highlightTimeoutB)
      }
      this.highlightedB = true
      this.highlightTimeoutB = setTimeout(this.removeHighlightB, 1000)
      this.internalAmplitudeB = { phase: amplitude.phase, magnitude: Math.min(amplitude.magnitude, 1.1) }
    },
    removeHighlightA () {
      this.highlightedA = false
    },
    removeHighlightB () {
      this.highlightedB = false
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/colors.scss';
@import '~/../scss/variables/mq.scss';

.amplitude-addition-widget {
  display: flex;
  flex-flow: row;
  gap: $spacing-04;

  @include mq($until: medium) {
    flex-flow: column;
  }

  &__math-sign {
    @include type-style('expressive-heading-06');
    display: flex;
    align-items: center;
    height: 100px;
    margin-top: $spacing-05;

    @include mq($until: medium) {
      display: block;
      margin-top: 0;
      height: auto;
      width: 100px;
      margin-left: $spacing-05;
      text-align: center;
    }
  }

  &__disk {
    @include mq($until: medium) {
      --display-direction: row;
    }

    &_result {
      &_highlight-a :deep(.amplitude-addition-disk__summands-arrows__A),
      &_highlight-b :deep(.amplitude-addition-disk__summands-arrows__B){
        --arrow-thickness: 2;
        opacity: 1;
        transition: opacity 0.2s ease-in;
      }
    }
  }
}

</style>
