<template>
  <div class="content-menu">
    <qiskit-mega-menu-dropdown
      data-test="content-menu-dropdown"
      :content.prop="dropdownMenuContent"
      :placeholder="$translate('Browse all content')"
      @performedSearch="trackPerformedSearch"
    />
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import '@qiskit/web-components/components/mega-menu-dropdown'
import { LEARN_MEGA_MENU } from '../constants/megaMenuLinks'

export default class ContentMenu extends Vue {
  dropdownMenuContent = LEARN_MEGA_MENU

  trackPerformedSearch (textOnTheFilter: string) {
    const windowInstance = (window as any)
    windowInstance.textbook.trackPerformedSearch('Textbook mega menu', textOnTheFilter)
  }
}
</script>

<style lang="scss" scoped>
@import '~@carbon/colors/scss/colors';

.content-menu {
  --qiskit-color-input-background: $cool-gray-10;
}
</style>
