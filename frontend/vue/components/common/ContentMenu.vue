<template>
  <div>
    <QiskitMegaMenuDropdown
      class="content-menu__mega-menu-dropdown"
      data-test="content-menu-dropdown"
      :content="dropdownMenuContent"
      segment-component-name="Textbook mega menu"
      :track-performed-search="trackPerformedSearch"
      :placeholder="$translate('Browse all content')"
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { QiskitMegaMenuDropdown } from '@qiskit-community/qiskit-vue'
import { TEXTBOOK_DEMO_MEGA_MENU } from '../constants/megaMenuLinks'

@Options({
  components: {
    QiskitMegaMenuDropdown
  }
})
export default class ContentMenu extends Vue {
  dropdownMenuContent = TEXTBOOK_DEMO_MEGA_MENU

  trackPerformedSearch (...params: Array<[string, string]>) {
    const windowInstance = (window as any)
    this.trackPerformedSearch = windowInstance.textbook.trackPerformedSearch(...params)
  }
}
</script>

<style lang="scss">
@import '~@carbon/colors/scss/colors';
:root {
  --content-menu--color-background: #{$cool-gray-10};
}

html.dark-theme {
  --content-menu--color-background: #{$cool-gray-90};
}
</style>

<style lang="scss" scoped>
.content-menu {
  &__mega-menu-dropdown {
    background: var(--content-menu--color-background);
  }
}

:deep(.app-mega-dropdown__filter-wrapper) {
  padding-left: 24px;
}
</style>
