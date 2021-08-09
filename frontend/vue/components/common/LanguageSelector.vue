<template>
  <div class="language-selector">
    <bx-dropdown
      class="language-selector__dropdown"
      :trigger-content="currentCountryLabel"
      @bx-dropdown-selected="useSelectedLanguage($event)"
    >
      <bx-dropdown-item
        v-for="language in availableLocales"
        :key="language.key"
        class="language-selector__item"
        :value="language.id"
      >
        {{ language.key }}
      </bx-dropdown-item>
    </bx-dropdown>
  </div>
</template>

<script lang="ts">
import { Options, Vue, prop } from 'vue-class-component'
import 'carbon-web-components/es/components/dropdown/dropdown.js'

class Props {
  localesData = prop({})
}

@Options({
  computed: {
    availableLocales () {
      return JSON.parse(this.localesData)
    }
  }
})

export default class LanguageSelector extends Vue.with(Props) {
  currentCountryCode = ''
  currentCountryLabel = 'English'


  useSelectedLanguage (event: any) {
    const currentHostname = window.location.host
    const newLanguageCode = event.detail.item.value

    // remove subdomain
    const originalHostName = currentHostname.split('.')[0].length === 2 && isNaN(+currentHostname.split('.')[0])
      ? currentHostname.slice(3)
      : currentHostname

    if (originalHostName === 'learn.qiskit.org') {
      window.location.host = `${newLanguageCode === 'en' ? '' : newLanguageCode + '.'}${originalHostName}`
    } else {
      window.location.search = newLanguageCode === 'en' ? '' : '?hl=' + newLanguageCode
    }
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
