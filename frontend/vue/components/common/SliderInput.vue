<template>
  <div class="slider-input">
    <span class="slider-input__min">{{ internal_min }}</span>
    <input
      type="range"
      class="slider-input__range"
      :max="internal_max"
      :min="internal_min"
      :step="internal_step"
      :value="internal_value"
      :style="`--fill-percentage:${fillPercentage}`"
      @input="valueChange"
    >
    <span class="slider-input__max">{{ internal_max }}</span>
    <input
      type="number"
      class="slider-input__number"
      :max="internal_max"
      :min="internal_min"
      :step="internal_step"
      :value="internal_value"
      @input="valueChange"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'

export default defineComponent({
  name: 'SliderInput',
  components: {
  },
  props: {
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
      internal_value: 0,
      internal_min: 0,
      internal_max: 0,
      internal_step: 0
    }
  },
  computed: {
    range (): number {
      return this.internal_max - this.internal_min
    },
    fillPercentage (): number {
      return (this.internal_value - this.internal_min) * 100 / this.range
    }
  },
  watch: {
    value (newVal) {
      this.internal_value = newVal
    },
    min (newVal) {
      this.internal_min = newVal
    },
    max (newVal) {
      this.internal_max = newVal
    },
    step (newVal) {
      this.internal_step = newVal
    }
  },
  mounted () {
    this.internal_value = this.value
    this.internal_min = this.min
    this.internal_max = this.max
    this.internal_step = this.step
  },
  methods: {
    valueChange (evt: CustomEvent) {
      const input = evt.target as HTMLInputElement
      const newValue = Number(input.value)
      this.internal_value = Math.min(Math.max(newValue, this.min), this.max)
      this.$emit('valueChanged', this.internal_value)
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/colors.scss';

.slider-input {
  display: grid;
  grid-template-columns: min-content auto min-content min-content;
  align-items: center;
  height: 2.5rem;
  gap: $spacing-05;

  &__range {
    outline: none;
    -webkit-appearance: none;
    appearance: none;
    height: 2px;
    background: $background-color-light-2;
    background: linear-gradient(90deg, $background-color-dark 0%, $background-color-dark calc(var(--fill-percentage, 0) * 1%), $background-color-light-2 calc(var(--fill-percentage, 0) * 1% + 1%), $background-color-light-2 100%);

    @mixin thumbStyle {
      -webkit-appearance: none;
      appearance: none;
      outline: none;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      border: none;
      background: $background-color-dark;
      cursor: pointer;
    }

    &::-webkit-slider-thumb {
      @include thumbStyle;
    }
    &::-moz-range-thumb {
      @include thumbStyle;
    }
    &::-ms-thumb {
      @include thumbStyle;
    }
  }

  &__min,
  &__max {
    @include type-style('code-02');
  }

  &__number {
    @include type-style('code-02');
    width: 4rem;
    height: 2.5rem;
    background-color: $background-color-white;
    border-bottom: 1px solid $border-color-secondary;
    text-align: center;
  }
}
</style>
