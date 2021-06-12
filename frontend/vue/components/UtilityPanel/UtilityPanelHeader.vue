<template>
  <div class="utility-panel-header">
    <UtilityPanelDropdown @updatedPanelSelection="getUpdatedPanelSelection" :value="selectedPanel"/>
    <AppCta
      class="utility-panel-header__toggle"
      v-bind="link"
      kind="ghost"
      :label="label"
      @click="togglePanel()"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'
import AppCta from '../common/AppCta.vue'
import UtilityPanelDropdown from './UtilityPanelDropdown.vue'

class Props {
  label = prop({ type: String, default: '' })
  selectedPanel = prop({})
}



@Options({
  components: { AppCta, UtilityPanelDropdown },
  watch: {
    isPanelOpen(val: boolean) {
      this.$emit('updatePanelStatus', val)
    },
    selectedPanel(val: string) {
      this.$emit('selectedPanelTitle', val)
    }
  }
})

export default class UtilityPanelHeader extends Vue.with(Props) {
  selectedPanel:string = ''
  link = {
    url: '/#',
    segment: {
      action: 'Right side panel > Toggle panel'
    }
  }

  isPanelOpen = true;

  togglePanel() {
    const showPanel = this.isPanelOpen
    this.isPanelOpen = !showPanel
    return this.isPanelOpen
  }

  detectSmallScreen() {
    if(window.innerWidth <= 800){
      this.isPanelOpen = false
    }
  }

  mounted() {
    this.$emit('selectedPanelTitle', this.selectedPanel)
    this.detectSmallScreen()
  }

  getUpdatedPanelSelection(val:any) {
    this.selectedPanel = val
  }
}
</script>


<style lang="scss">
@import 'carbon-components/scss/globals/scss/typography';
@import '../../../scss/variables/colors.scss';
@import '../../../scss/variables/mq.scss';

.utility-panel-header {
  background-color: $background-color-lighter;
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 1;

  // override
  .app-cta {
    justify-content: flex-end;
    padding: $spacing-03 $spacing-05;
    display: flex;
    background-color: $background-color-lighter;
    min-width: 9rem;

    @include mq($until: medium) {
      min-width: initial;
    }
  }
}
</style>
