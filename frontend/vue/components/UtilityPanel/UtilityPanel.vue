<template>
  <section class="utility-panel" :class="{ 'utility-panel_open': isVisible, 'utility-panel_closed': !isVisible }">
    <UtilityPanelHeader ref="panelHeader" :label="getLabel()" @updatePanelStatus="togglePanel" @selectedPanelTitle="getSelectedPanelTitle" />
    <UtilityPanelContent ref="panelContent" :selection="selectedPanelTitle" @emptyStateRedirect="redirectToPanel" />
  </section>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import UtilityPanelHeader from './UtilityPanelHeader.vue'
import UtilityPanelContent from './UtilityPanelContent.vue'

@Options({
  components: { UtilityPanelHeader, UtilityPanelContent }
})

export default class UtilityPanel extends Vue {
  isVisible = true;
  selectedPanelTitle:string = ''
  isMobile = false;

  mounted () {
    this.detectSmallScreen()
  }

  detectSmallScreen () {
    const rootComponent = this
    window.addEventListener('load', function () {
      const HTMLFrame = document.getElementsByTagName('html')[0]
      const mobileDetected = HTMLFrame.classList.contains('is-mobile')

      if (window.innerWidth <= 1056 || mobileDetected) {
        rootComponent.isVisible = false
        rootComponent.isMobile = true
      }
      // handling tablet use case
      if (window.innerWidth >= 672 && window.innerWidth <= 1056) {
        rootComponent.isVisible = true
        rootComponent.isMobile = true
      }
    })
  }

  togglePanel (val: boolean) {
    this.isVisible = val
  }

  getLabel () {
    if (this.isVisible) {
      return 'Hide'
    } else {
      return 'Show details'
    }
  }

  getSelectedPanelTitle (val: any) {
    const refPanelContent: any = this.$refs.panelContent
    this.selectedPanelTitle = val
    refPanelContent.chooseTitle(val)
  }

  redirectToPanel (e:string) {
    const refPanelContent: any = this.$refs.panelContent
    const refPanelHeader: any = this.$refs.panelHeader
    this.selectedPanelTitle = e
    refPanelContent.chooseTitle(e)
    refPanelHeader.getUpdatedPanelSelection(e)
  }
}
</script>

<style lang="scss">
@import 'carbon-components/scss/globals/scss/typography';
@import '../../../scss/variables/settings.scss';
@import '../../../scss/variables/colors.scss';
@import '../../../scss/variables/mq.scss';

.utility-panel {
  background-color: $background-color-white;
  width: 100%;
  height: auto;
  user-select: text;

  @include mq($until: small) {
    top: 6rem;
  }

  &_open {
    width: 100%;
    border-left: 1px solid $border-color;
    max-width: $right-sidebar-width-xl;
    min-height: 100vh;

    @include mq($from: max-size) {
      max-width: $right-sidebar-width-xl;
    }

    @include mq($from: large, $until: max-size) {
      max-width: $right-sidebar-width-lg;
    }

    @include mq($from: medium, $until: large) {
      max-width: $right-sidebar-width-xl / 1.5;
    }

    @include mq($until: medium) {
      max-width: initial;

      .app-cta__content {
        display: none;
      }

      .app-cta {
        width: 3.25rem;
      }

      .utility-panel-header {
        border-bottom: 1px solid $border-color;
      }
    }

    p:hover {
      cursor: text;
    }
  }

  &_closed {
    width: 10rem;
    background-color: transparent;

    .utility-panel-dropdown,
    .utility-panel-content {
      display: none;
    }

    .utility-panel-header {
      justify-content: flex-end;
    }

    .app-cta__icon_arrow-right-16 {
      transform: rotate(-180deg);
    }

    @include mq($until: medium) {
      width: 100%;

      .utility-panel-header {
        border-bottom: 1px solid $border-color;
      }
    }
  }

}
</style>
