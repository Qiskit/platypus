<template>
  <div class="course-progress">
    <h5 class="course-progress__title">
      {{ course.title }}
    </h5>
    <div
      class="course-progress__chapter-list"
      :style="`--row-count-l: ${Math.ceil(course.chapters.length / 3)}; --row-count-m: ${Math.ceil(course.chapters.length / 2)}; --row-count-s: ${course.chapters.length};`"
    >
      <BasicLink
        v-for="(chapter, index) in course.chapters"
        :key="index"
        class="course-progress__chapter"
        :url="chapter.url"
      >
        <x-progress
          class="course-progress__chapter__progress"
          r="8"
          :p="chapter.progress"
        />
        <span>{{ chapter.title }}</span>
      </BasicLink>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import BasicLink from '../common/BasicLink.vue'

export default defineComponent({
  name: 'CourseProgress',
  components: {
    BasicLink
  },
  props: {
    course: {
      type: Object,
      required: false,
      default: () => {
        return {
          title: 'Prerequisites',
          chapters: [
            {
              title: '1. Setting Up Your Environment',
              url: '/course/introduction/why-quantum-computing',
              progress: 1
            },
            {
              title: '2. Setting Up Your Environment',
              url: '/course/introduction/why-quantum-computing',
              progress: 1
            },
            {
              title: '3. Setting Up Your Environment',
              url: '/course/introduction/why-quantum-computing',
              progress: 0.75
            },
            {
              title: '4. Setting Up Your Environment',
              url: '/course/introduction/why-quantum-computing',
              progress: 0.3
            }
          ]
        }
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

  &__chapter {
    @include type-style('body-long-01');
    padding: $spacing-04 $spacing-04 $spacing-04 0;
    display: flex;
    align-items: center;
    // this is to make x-progress render properly
    z-index: 0;
    color: $text-color-black;

    &:hover {
      color: $text-active-color;
    }

    &-list {
      --column-count:3;
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: repeat(var(--column-count), 1fr);
      grid-template-rows: repeat(var(--row-count-l, 3), 1fr);

      @include mq($from: medium, $until: large) {
        --column-count:2;
        grid-template-rows: repeat(var(--row-count-m, 5), 1fr);
      }
      @include mq($until: medium) {
        --column-count:1;
        grid-template-rows: repeat(var(--row-count-s, 9), 1fr);
      }
    }
    &__progress {
      margin-right: $spacing-03;
    }
  }
}
</style>
