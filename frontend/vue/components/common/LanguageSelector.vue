<template>
  <div class="language-selector">
    <bx-dropdown
      :trigger-content="currentCountryLabel"
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
  currentCountryCode = ''
  currentCountryLabel = 'English'
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

  // get lang value from DOM
  // set language in LanguageSelector
  setLanguage (lang: string) {
    const result = this.translatedLanguagesList.filter(item => {
      return item.countryCode === lang
    })

    this.currentCountryCode = result[0].countryCode
    this.currentCountryLabel = result[0].label
  }

  mounted (){
    const courseLang = document.getElementsByTagName("html")[0].getAttribute("lang") || ""
    this.setLanguage(courseLang)
  }

  useSelectedLanguage (event: any) {
    const currentHostname = window.location.host
    const currentPathname = window.location.pathname
    const currentProtocol = window.location.protocol
    const newLanguageCode = event.detail.item.value

    let newUrl = ''



    // detect if URL has subdomain already
    if(!currentHostname.startsWith('localhost') && !currentHostname.startsWith('learn.qiskit.org')) {
      // subdomain exists
      const originalHostName = currentHostname.slice(3)
      if(newLanguageCode == 'en') {
        newUrl = `${currentProtocol}//${originalHostName}${currentPathname}`
      } else {
        newUrl = `${currentProtocol}//${newLanguageCode}.${originalHostName}${currentPathname}`
      }

    } else {
      // subdomains don't exist
      if(newLanguageCode == 'en') {
        newUrl = `${currentProtocol}//${currentHostname}${currentPathname}`
      } else {
        newUrl = `${currentProtocol}//${newLanguageCode}.${currentHostname}${currentPathname}`
      }
    }
    window.location.href = newUrl
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



