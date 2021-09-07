<template>
  <div class="utility-panel-header">
    <UtilityPanelDropdown :value="selectedPanel" @updatedPanelSelection="getUpdatedPanelSelection" />
    <BasicLink
      class="utility-panel-header__toggle"
      :url="link.url"
      :segment="link.segment"
      :is-static="true"
      @click="togglePanel($event)"
      data-test="utility-panel-header-toggle"
    >
      {{ $translate(ctaLabel) }}
      <OpenPanelRight16 class="utility-panel-header__icon" />
    </BasicLink>
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'
import OpenPanelRight16 from '@carbon/icons-vue/lib/open-panel--right/16'
import BasicLink from '../common/BasicLink.vue'
import UtilityPanelDropdown from './UtilityPanelDropdown.vue'

class Props {
  label = prop({ type: String, default: '' })
  selectedPanel = prop({})
}

@Options({
  components: { BasicLink, UtilityPanelDropdown, OpenPanelRight16 },
  watch: {
    isPanelOpen (val: boolean) {
      this.$emit('updatePanelStatus', val)
    },
    selectedPanel (val: string) {
      this.$emit('selectedPanelTitle', val)
    }
  }
})

export default class UtilityPanelHeader extends Vue.with(Props) {
  selectedPanel:string = ''
  link = {
    url: '#',
    segment: {
      cta: 'toggle-panel',
      location: 'chapter-details-panel'
    }
  }

  ctaLabel = 'Hide details'

  isPanelOpen = true;

  togglePanel (e:any) {
    e.preventDefault()
    const showPanel = this.isPanelOpen
    const panelDOMElement = document.getElementById('utility-panel')
    const contentDOMElement = document.getElementsByTagName('x-course')[0]

    panelDOMElement?.classList.toggle('c-textbook__utility_panel-open')
    contentDOMElement?.classList.toggle('qv-layout__utility_panel-closed')

    this.isPanelOpen = !showPanel
    if (!this.isPanelOpen) {
      this.ctaLabel = 'Show details'
    } else {
      this.ctaLabel = 'Hide details'
    }
    return this.isPanelOpen
  }

  detectSmallScreen () {
    const rootComponent = this
    window.addEventListener('load', function () {
      const HTMLFrame = document.getElementsByTagName('html')[0]
      const mobileDetected = HTMLFrame.classList.contains('is-mobile')

      if (window.innerWidth <= 672 || mobileDetected) {
        rootComponent.isPanelOpen = false
        rootComponent.ctaLabel = 'Show details'
      }
      // handling tablet use case
      if (window.innerWidth >= 672 && window.innerWidth <= 1056) {
        rootComponent.$emit('updatePanelStatus', true)
        rootComponent.isPanelOpen = true
        rootComponent.ctaLabel = 'Hide details'
      }
    })
  }

  mounted () {
    this.$emit('selectedPanelTitle', this.selectedPanel)
    this.detectSmallScreen()
  }

  getUpdatedPanelSelection (val:any) {
    this.selectedPanel = val
  }
}
</script>

<style lang="scss">
@import 'carbon-components/scss/globals/scss/typography';
@import '../../../scss/variables/colors.scss';
@import '../../../scss/variables/mq.scss';

.utility-panel-header {
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 1;

  &__toggle {
    @include type-style('body-short-01');
    justify-content: space-between;
    padding: $spacing-03 $spacing-05;
    display: flex;
    background-color: $background-color-lighter;
    align-items: center;
    min-width: 9rem;
    height: 40px;
    color: $purple-70;

    @include mq($until: medium) {
      width: 100%;
      min-width: initial;
      justify-content: space-between;
    }
  }

  &__icon {
    fill: $purple-70;
  }

  // override
  .app-cta {
    justify-content: flex-end;
    padding: $spacing-03 $spacing-05;
    display: flex;
    background-color: $background-color-lighter;
    min-width: 9rem;

    @include mq($until: medium) {
      min-width: initial;
      justify-content: space-between;
    }
  }
}
</style>
