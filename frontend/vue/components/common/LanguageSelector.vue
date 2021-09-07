<template>
  <div class="language-selector">
    <bx-dropdown
      class="language-selector__dropdown"
      :trigger-content="currentCountryLabel"
      :value="currentCountryCode"
      @bx-dropdown-beingselected="useSelectedLanguage($event)"
      data-test="language-selector"
    >
      <bx-dropdown-item
        v-for="language in allLocales"
        :key="language.key"
        class="language-selector__item"
        :class="{ 'language-selector__item-disabled': !isAvailable(language.id) }"
        :data-test="`language-select-${language.id}`"
        :value="language.id"
      >
        <CvTooltip v-if="!isAvailable(language.id)"
          class="language-selector__item-tooltip"
          alignment="center" direction="left"
          :tip="$translate('Language not yet available')"
          data-test="language-select-tooltip"
        >
          <InformationFilled16 />
        </CvTooltip> 
        <span>{{ language.key }}</span>
      </bx-dropdown-item>
    </bx-dropdown>
  </div>
</template>

<script lang="ts">
import { Options, Vue, prop } from 'vue-class-component'
import 'carbon-web-components/es/components/dropdown/dropdown.js'
import 'carbon-web-components/es/components/dropdown/dropdown-item.js'
import InformationFilled16 from '@carbon/icons-vue/lib/information--filled/16'
import CvTooltip from '@carbon/vue/src/components/cv-tooltip/cv-tooltip.vue'

class Props {
  localesAll = prop({})
  localesAvailable = prop({})
}

@Options({
  components: {
    InformationFilled16,
    CvTooltip
  },
  computed: {
    allLocales () {
      return JSON.parse(this.localesAll)
    },
    availableLocales () {
      return JSON.parse(this.localesAvailable)
    }
  }
})

export default class LanguageSelector extends Vue.with(Props) {
  currentCountryCode = ''
  currentCountryLabel = 'English'
  allLocales: any
  availableLocales: any

  isAvailable (locale: string) {
    return this.availableLocales.indexOf(locale) > -1
  }

  useSelectedLanguage (event: any) {
    const currentHostname = window.location.host
    const newLanguageCode = event.detail.item.value

    if (!this.isAvailable(newLanguageCode)) {
      event.preventDefault()
    } else {
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

  setLanguage (lang: string) {
    const result = this.allLocales.filter((item: { id: string }) => {
      return item.id === lang
    })

    this.currentCountryCode = result[0].id
    this.currentCountryLabel = result[0].key
  }

  mounted () {
    const courseLang = document.getElementsByTagName('html')[0].getAttribute('lang') || ''
    this.allLocales = this.localesAll
    this.setLanguage(courseLang)
  }
}
</script>

<style lang="scss" scoped>
@import '../../../scss/variables/colors.scss';
@import 'carbon-components/scss/globals/scss/layout';
.language-selector {
  &__item {
    text-align: left;
    // padding-left: 1rem;
    background-color: $background-color-lighter;

    &:hover {
      background-color: $background-color-light;
    }

    &-disabled {
      color: $text-color-lighter-3;
      background-color: $background-color-lighter;

      &:hover {
        background-color: $background-color-lighter;
        color: $text-color-lighter-3;
        cursor: not-allowed;
      }
    }

    .language-selector__item-tooltip {
      position: absolute;
      right: $spacing-05;
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
