<template>
  <q-number-input
    class="number-input"
    :min="min"
    :max="max"
    :step="step"
    :value="value"
    :label-text="label"
    @bx-number-input="valueChange($event)"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import '../../../wc/number-input/number-input'

export default defineComponent({
  name: 'NumberInput',
  components: {
  },
  props: {
    label: {
      type: String,
      default: undefined
    },
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 10
    },
    step: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      isGrabbing: false
    }
  },
  methods: {
    valueChange (evt: CustomEvent) {
      this.$emit('onValueChange', evt.detail.value)
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/colors.scss';

.number-input {
  --cds-ui-04: #{$border-color-secondary};
  --cds-field-01: #{$background-color-white};
  --separator-color: #{$border-color-light-2};
  --cds-label-01-font-size: 0.875rem;
  --cds-text-02: $text-color-black;
}
</style>
