<template>
  <BasicLink
    class="section-progress"
    :url="section.pageUrl"
  >
    <x-progress
      class="section-progress__progress-indicator"
      r="8"
      :p="section.progress"
    />
    <span>{{ section.title }}</span>
  </BasicLink>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import BasicLink from '../common/BasicLink.vue'

export default defineComponent({
  name: 'SectionProgress',
  components: {
    BasicLink
  },
  props: {
    section: {
      type: Object,
      required: false,
      default: () => {
        return { }
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/colors.scss';

.section-progress {
  @include type-style('body-long-01');
  display: flex;
  align-items: flex-start;
  // this is to make x-progress render properly
  z-index: 0;
  color: $text-color-black;

  &:hover {
    color: $text-active-color;
  }

  &__progress-indicator {
    margin-right: $spacing-03;
    margin-top: $spacing-01;
  }
}

</style>
