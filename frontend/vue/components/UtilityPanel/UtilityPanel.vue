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
  width: 0;
  position: absolute;
  top: $qiskit-navbar-height;
  right: 0;
  bottom: 0;
  min-height: 100vh;
  height: fit-content;
  z-index: 1;
  border-left: 1px solid $border-color;

  &_open {
    width: 100%;
    max-width: $right-sidebar-width;
    z-index: 2;

    @include mq($until: medium) {
      max-width: initial;
    }

    @include mq($from: medium, $until: large) {
      max-width: 26rem; // avoid panel collision
    }
  }

  &_closed {
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
