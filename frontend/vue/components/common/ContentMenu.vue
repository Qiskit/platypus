<template>
  <div>
    <qiskit-mega-menu-dropdown
      class="content-menu__mega-menu-dropdown"
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
import { TEXTBOOK_DEMO_MEGA_MENU } from '../constants/megaMenuLinks'

export default class ContentMenu extends Vue {
  dropdownMenuContent = TEXTBOOK_DEMO_MEGA_MENU

  trackPerformedSearch (textOnTheFilter: string) {
    const windowInstance = (window as any)
    windowInstance.textbook.trackPerformedSearch('Textbook mega menu', textOnTheFilter)
  }
}
</script>

<style lang="scss" scoped>
@import '~@carbon/colors/scss/colors';

.content-menu {
  &__mega-menu-dropdown {
    background: $cool-gray-10;
  }
}

:deep(.app-mega-dropdown__filter-wrapper) {
  padding-left: 24px;
}
</style>
