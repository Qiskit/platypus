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

  updateUserLang (language: string) {
    window.localStorage.setItem('qv-settings_language', language)
    console.log(window.localStorage, "localStorage")
  }

  useSelectedLanguage (event: any) {
    const currentUrl = window.location.pathname
    const newLanguageCode = event.detail.item.value
    const newUrl = currentUrl + `?hl=${newLanguageCode}`

    this.updateUserLang(newLanguageCode)
    // redirect
    window.location.pathname = newUrl
  }

  mounted() {
    // check if language is set
    // if no language is set, do nothing
    // if lang is set, set trigger-content
    if(window.localStorage['qv-settings_language']) {
    }
    //
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
// @import '~/../scss/variables/mq.scss';
// @import '~/../scss/mixins/mixins.scss';
// @import '~/../scss/variables/colors.scss';
// overrides
// q-language-selector {
//   width: 100%;
// }

.language-selector {
  // component overrides
  // selecting within the shadow
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
