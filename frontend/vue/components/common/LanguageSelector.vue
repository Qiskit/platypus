<template>
  <div class="language-selector">
    <bx-dropdown
      class=""
      :trigger-content="`English`"
    >
      <bx-dropdown-item class="language-selector__item" value="test">Test</bx-dropdown-item>
      <bx-dropdown-item class="language-selector__item" value="test">Test</bx-dropdown-item>
      <bx-dropdown-item class="language-selector__item" value="test">Test</bx-dropdown-item>
    </bx-dropdown>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import 'carbon-web-components/es/components/dropdown/dropdown.js'

@Options({})
export default class LanguageSelector extends Vue {}
</script>

<style lang="scss" scoped>
@import '../../../scss/variables/colors.scss';

.language-selector {
  &__item {
    text-align: left;
    padding-left: 1rem;
  }
}
</style>

<style lang="scss">
@import '../../../scss/variables/colors.scss';
// overrides
q-language-selector {
  width: 100%;
  border-top: 1px solid $border-color;
}

.language-selector {
  // component overrides
  // selecting within the shadow
  bx-dropdown::part(trigger-button) {
    background-color: $background-color-lighter;
    justify-content: flex-end;
    display: flex;
    padding-left: 2rem;
  }

  bx-dropdown::part(menu-body) {
    bottom: 2.5rem;
    top: initial;
  }

}
</style>
