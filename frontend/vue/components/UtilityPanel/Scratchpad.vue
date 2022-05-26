<template>
  <div class="scratchpad">
    <p class="scratchpad__description">
      {{ $translate('This is your Python Scratchpad. Use this however you like while you work or copy the code over from the chapter.') }}
    </p>
    <p class="scratchpad__description">
      <strong>{{ $translate('Note') }}: </strong>{{ $translate('Code in the scratchpad will not be saved.') }}
    </p>
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
