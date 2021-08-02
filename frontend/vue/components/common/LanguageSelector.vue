<template>
  <div class="language-selector">
    <bx-dropdown
      class=""
      :trigger-content="defaultLanguage"
    >
      <bx-dropdown-item
        v-for="language in translatedLanguagesList"
        :key="language.index"
        class="language-selector__item"
        :value="language.countryCode"
      >
        {{ language.label }}
      </bx-dropdown-item>
    </bx-dropdown>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import 'carbon-web-components/es/components/dropdown/dropdown.js'

@Options({})
export default class LanguageSelector extends Vue {
  defaultLanguage = 'English'
  translatedLanguagesList = [
    {
      label: 'English',
      countryCode: 'en'
    },
    {
      label: 'Japanese',
      countryCode: 'ja'
    }
  ]

  // details / data
  // props
  // array of options
  // label / url / segment
  // Trigger content
  // link to subdomain or query param
  // separate out links or language array

  mounted () {
    const currentUrl = window.location.pathname
    const newUrl = currentUrl + '?hl=ja'
  }
}

</script>

<style lang="scss" scoped>
@import '../../../scss/variables/colors.scss';

.language-selector {
  border-top: 1px solid #dde1e6;
  border-bottom:1px solid #dde1e6;
  &__item {
    text-align: left;
    padding-left: 1rem;
    background-color: $background-color-lighter;

    &-disabled {
      color: $border-color;
    }

    &:hover {
      background-color: $background-color-light;
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

    &:focus{
      outline: 2px solid $border-color-secondary;
    }
  }

  bx-dropdown::part(menu-body) {
    bottom: 2.5rem;
    top: initial;
  }

}
</style>
