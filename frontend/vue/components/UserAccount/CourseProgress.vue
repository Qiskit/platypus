<template>
  <div class="course-progress">
    <h5 class="course-progress__title">
      {{ course.title }}
    </h5>
    <div
      class="course-progress__chapter-list"
      :style="`--row-count-l: ${Math.ceil(course.sections.length / 3)}; --row-count-m: ${Math.ceil(course.sections.length / 2)}; --row-count-s: ${course.sections.length};`"
    >
      <ChapterProgress
        v-for="(chapter, index) in course.sections"
        :key="index"
        class="course-progress__chapter"
        :chapter="chapter"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import ChapterProgress from './ChapterProgress.vue'

export default defineComponent({
  name: 'CourseProgress',
  components: {
    ChapterProgress
  },
  props: {
    course: {
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

.course-progress {

  &__title {
    @include type-style('expressive-heading-01');
    padding: $spacing-04 0;
  }

  &__chapter-list {
    --column-count:3;
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(var(--column-count), 1fr);
    grid-template-rows: repeat(var(--row-count-l, 3), max-content);
    gap: $spacing-06 $spacing-10;
    padding: $spacing-04 $spacing-06 $spacing-04 0;

    @include mq($from: medium, $until: large) {
      --column-count:2;
      grid-template-rows: repeat(var(--row-count-m, 5), max-content);
    }
    @include mq($until: medium) {
      --column-count:1;
      grid-template-rows: repeat(var(--row-count-s, 9), max-content);
    }
  }
}
</style>
