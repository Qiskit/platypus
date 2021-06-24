<template>
  <div>
    <AppMegaDropdownMenu
      :content="dropdownMenuContent"
      segment-component-name="Textbook mega menu"
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { TEXTBOOK_DEMO_MEGA_MENU } from '../constants/megaMenuLinks'
import AppMegaDropdownMenu from './AppMegaDropdownMenu.vue'

@Options({
  components: {
    AppMegaDropdownMenu
  }
})
export default class ContentMenu extends Vue {
  dropdownMenuContent = TEXTBOOK_DEMO_MEGA_MENU
}
</script>

<style lang="scss" scoped>
@import '~@carbon/colors/scss/colors';

// Qiskit variables
$background-color-lighter: $cool-gray-10;
$border-color: $cool-gray-20;

.content-menu-section {
  background: $background-color-lighter;
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
}
</style>
