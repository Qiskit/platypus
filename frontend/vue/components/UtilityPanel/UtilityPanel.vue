<template>
  <section class="utility-panel" :class="{ 'utility-panel_open': isVisible, 'utility-panel_closed': !isVisible }">
    <UtilityPanelHeader :label="getLabel()" @updatePanelStatus="togglePanel" ref="panelHeader" @selectedPanelTitle="getSelectedPanelTitle" />
    <UtilityPanelContent :selection="selectedPanelTitle" ref="panelContent" @emptyStateRedirect="redirectToPanel" />
  </section>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import UtilityPanelHeader from './UtilityPanelHeader.vue';
import UtilityPanelContent from './UtilityPanelContent.vue'

@Options({
  components: { UtilityPanelHeader, UtilityPanelContent},
})

export default class UtilityPanel extends Vue {
  isVisible = true;
  selectedPanelTitle:string = ''
  isMobile = false;

  mounted(){
    this.detectSmallScreen()
  }

  detectSmallScreen() {
    if(window.innerWidth <= 800){
      this.isVisible = false
      this.isMobile = true
    }
  }

  togglePanel(val: boolean) {
    this.isVisible = val;
  }

  getLabel() {
    if(this.isVisible) {
      return "Hide"
    } else {
      return "Open panel"
    }
  }

  getSelectedPanelTitle(val: any) {
    const refPanelContent: any = this.$refs.panelContent
    this.selectedPanelTitle = val
    refPanelContent.chooseTitle(val)
  }

  redirectToPanel(e:string){
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

  @include mq($until: small) {
    top: 6rem;
  }

  &_open {
    width: 100%;
    border-left: 1px solid $border-color;
    max-width: $right-sidebar-width;
    min-height: 100vh;

    @include mq($from: max-size) {
      max-width: $right-sidebar-width;
    }

    @include mq($from: medium, $until: max-size) {
      max-width: $right-sidebar-width - $spacing-13;
    }

    @include mq($from: small, $until: medium) {
      max-width: $right-sidebar-width / 2;

      .app-cta__content {
        display: none;
      }

      .app-cta {
        width: 3.25rem;
      }
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
  }

}
</style>
