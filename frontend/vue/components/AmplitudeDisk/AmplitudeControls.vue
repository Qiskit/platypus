<template>
  <div class="amplitude-controls">
    <NumberInput
      :label="'Magnitude:'"
      :value="magnitude"
      :min="0"
      :max="1"
      :step="0.05"
    />
    <NumberInput
      :label="'Phase:'"
      :value="phase"
      :min="0"
      :max="360"
      :step="1"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import NumberInput from '../common/NumberInput.vue'

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
