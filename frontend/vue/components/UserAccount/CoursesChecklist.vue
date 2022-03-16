<template>
  <bx-checkbox :label-text="section.title" />
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import 'carbon-web-components/es/components/checkbox/checkbox.js'

export default defineComponent({
  name: 'CoursesChecklist',
  props: {
    section: {
      type: Object,
      required: false,
      default: () => {}
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/colors.scss';

.courses-checklist {
  @include type-style('body-long-01');
  display: flex;
  align-items: flex-start;
  color: $text-color-black;

  &:hover {
    color: $text-active-color;
  }
}

</style>
