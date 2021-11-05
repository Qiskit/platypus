<template>
  <bx-number-input
    class="number-input"
    :min="min"
    :max="max"
    :step="step"
    :value="value"
    :label-text="label"
    @bx-number-input="valueChange($event)"
  />

  <!--span v-if="label" class="number-input__label"> {{ label }} </span>
  <div class="number-input__controls">
    <input
      ref="inputElement"
      class="number-input__controls__input"
      type="number"
      :min="min"
      :max="max"
      :step="step"
      :value="value"
      @change="valueChange"
    >
    <button class="number-input__controls__add" @click="stepUp"> <ChevronUp16 class="number-input__controls__add__icon" /> </button>
    <button class="number-input__controls__sub" @click="stepDown"> <ChevronDown16 class="number-input__controls__sub__icon" /> </button>
  </div-->
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import 'carbon-web-components/es/components/number-input/number-input.js'

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
  /*
  &__controls {
    display: grid;
    grid-template-areas:
      "input add"
      "input sub";
    grid-template-columns: 1fr 0.3rem;

    background-color: $background-color-white;
    border: solid $border-color-secondary;
    border-width: 2px 0 2px 0;
    padding: $spacing-01 $spacing-03;
    width: 4rem;

    &__input {
      grid-area: input;
      width: 2.15rem;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
    }
    &__add,
    &__sub {
      width: 0.3rem;
      height: 0.3rem;

      &__icon {
        width: 0.3rem;
        height: 0.3rem;

        &::v-deep(path) {
          stroke-width: 1px;
        }
      }
    }
    &__add {
      grid-area: add;
      background-color: $button-background-color-dark;
      color: $text-color-white;
      border: 1px solid $border-color-focused;
      border-radius: 50% 50% 0 0;
      align-self: end;

      &::v-deep(path) {
        stroke: $text-color-white;
      }
    }
    &__sub {
      grid-area: sub;
      background-color: $background-color-white;
      color: $text-color-dark;
      border: 1px solid $shadow-color-light;
      border-radius: 0 0 50% 50%;
      align-self: start;

      &::v-deep(path) {
        stroke: $text-color-dark;
      }
    }
  }
  */
}
</style>
