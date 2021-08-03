<template>
  <div class="language-selector">
    <bx-dropdown
      :trigger-content="selectedLanguage"
      @bx-dropdown-selected="useSelectedLanguage($event)"
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
  selectedLanguage = 'English'
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

  useSelectedLanguage (event: any) {
    const currentUrl = window.location.pathname
    const newLanguageCode = event.detail.item.value
    const newUrl = currentUrl + `?hl=${newLanguageCode}`

    window.location.pathname = newUrl
  }
}

</script>

<style lang="scss" scoped>
@import '../../../scss/variables/colors.scss';
.language-selector {
  &__item {
    text-align: left;
    // padding-left: 1rem;
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
.language-selector {
  // component overrides
  bx-dropdown::part(trigger-button) {
    background-color: $background-color-lighter;
    justify-content: flex-end;
    display: flex;
    padding-left: $spacing-07;
    border-top: 2px solid $border-color-secondary;
    border-bottom:1px solid $border-color;

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
