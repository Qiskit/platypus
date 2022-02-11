<template>
  <div class="statevector-brackets">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'

export default defineComponent({ name: 'StatevectorBrackets' })
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/spacing';
@import '~/../scss/variables/colors.scss';

.statevector-brackets {
  position: relative;

  &::before {
    content: "";
    border: solid $border-color-dark;
    border-width: 1px 0 1px 1px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: $spacing-05;
    border-radius: 0.5rem 0 0 0.5rem;
  }

  &::after {
    content: "";
    border: solid $border-color-dark;
    border-width: 1px 1px 1px 0;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: $spacing-05;
    border-radius: 0 0.5rem 0.5rem 0;
  }
}

</style>
