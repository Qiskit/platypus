<template>
  <div class="scratchpad">
    <p class="scratchpad__description">This is your python scratchpad. Use this however you like while you work or copy the code over from the chapter.</p>
    <p class="scratchpad__description"><strong>Note:</strong> Code in the scratchpad will not be saved.</p>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})

export default class Scratchpad extends Vue {}
</script>

<style scoped lang="scss">
@import 'carbon-components/scss/globals/scss/typography';

.scratchpad {
  &__description {
    @include type-style('body-short-01');
    margin-bottom: $spacing-05;
  }
}
</style>
