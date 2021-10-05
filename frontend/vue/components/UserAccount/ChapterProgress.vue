<template>
  <BasicLink
    class="chapter-progress"
    :url="chapter.url"
  >
    <x-progress
      class="chapter-progress__progress-indicator"
      r="8"
      :p="chapter.progress"
    />
    <span>{{ chapter.title }}</span>
  </BasicLink>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import BasicLink from '../common/BasicLink.vue'

export default defineComponent({
  name: 'ChapterProgress',
  components: {
    BasicLink
  },
  props: {
    chapter: {
      type: Object,
      required: false,
      default: () => {
        return { }
      }
    }
  },
  data () {
    return { }
  },
  computed: {
  },
  mounted () {
  }
})
</script>

<style lang="scss" scoped>
@import '../../../../node_modules/carbon-components/scss/globals/scss/layout';
@import '../../../../node_modules/carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/mq.scss';
@import '~/../scss/variables/colors.scss';
@import '~/../scss/variables/fonts.scss';
@import '~/../scss/mixins/mixins.scss';

.chapter-progress {
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
