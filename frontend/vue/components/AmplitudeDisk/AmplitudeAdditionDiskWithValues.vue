<template>
  <div class="amplitude-disk-with-values">
    <AmplitudeAdditionDisk
      ref="disk"
      :magnitude-a="magnitudeA"
      :phase-a="phaseA"
      :magnitude-b="magnitudeB"
      :phase-b="phaseB"
    />
    <AmplitudeValues
      :magnitude="amplitudeResult.magnitude"
      :phase="amplitudeResult.phase"
      :is-interactive="false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import AmplitudeValues from './AmplitudeValues.vue'
import AmplitudeAdditionDisk from './AmplitudeAdditionDisk.vue'

export default defineComponent({
  name: 'AmplitudeDiskWithValues',
  components: {
    AmplitudeAdditionDisk,
    AmplitudeValues
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
  data () {
    return {
      amplitudeResult: { phase: 0, magnitude: 1 }
    }
  },
  updated () {
    this.updateAmplitudeResult()
  },
  methods: {
    updateAmplitudeResult () {
      const diskRef = (this.$refs.disk as any)
      if (diskRef) {
        this.amplitudeResult = diskRef.amplitudeResult
      }
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
}
</style>
