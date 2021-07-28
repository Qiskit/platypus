<template>
  <div class="language-selector">
    <bx-dropdown
      class=""
      :trigger-content="`English`"
      :open="true"
    >
      <bx-dropdown-item class="language-selector__item" value="test">English</bx-dropdown-item>
      <bx-dropdown-item class="language-selector__item" value="test">Japanese</bx-dropdown-item>
      <bx-dropdown-item class="language-selector__item language-selector__item-disabled" value="test">Japanese disabled</bx-dropdown-item>
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
  border-top: 1px solid #dde1e6;
  border-bottom:1px solid #dde1e6;
  &__item {
    text-align: left;
    padding-left: 1rem;
    background-color: $border-color-light;

    &-disabled {
      color: $border-color;
    }
  }

}
</style>

<style lang="scss">
@import '../../../scss/variables/colors.scss';
@import 'carbon-components/scss/globals/scss/typography';
// @import '~/../scss/variables/mq.scss';
// @import '~/../scss/mixins/mixins.scss';
// @import '~/../scss/variables/colors.scss';
// overrides
q-language-selector {
  width: 100%;
}

.language-selector {
  // component overrides
  // selecting within the shadow
  bx-dropdown::part(trigger-button) {
    background-color: $background-color-lighter;
    justify-content: flex-end;
    display: flex;
    padding-left: $spacing-07;
  }

  bx-dropdown::part(menu-body) {
    bottom: 2.5rem;
    top: initial;
  }

}
</style>
