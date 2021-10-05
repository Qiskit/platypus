<template>
  <section class="user-progress">
    <div class="user-progress__title-container">
      <h3 class="user-progress__title">
        Default
      </h3>
      <p class="user-progress__title-text">
        Default shows your progress in chronological order as seen in the textbook. Checkmarks appear next to section that you have completed.
      </p>
    </div>
    <CourseProgress
      v-for="(course, index) in courseList"
      :key="index"
      :course="course"
      class="user-progress__course"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { getLearningPathCourses, Course } from '../../../ts/courses'
import CourseProgress from './CourseProgress.vue'

export default defineComponent({
  name: 'UserProgress',
  components: {
    CourseProgress
  },
  props: {
    userName: { type: String, required: false, default: 'Unknown' }
  },
  data () {
    return { }
  },
  computed: {
    courseList () : Course[] {
      return getLearningPathCourses()
    }
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

.user-progress {
  @include contained();
  margin-left: 0;
  padding-top: $spacing-07;
  padding-bottom: $spacing-07;

  &__title {
    @include type-style('expressive-heading-04');
    color: $text-active-color;

    &-container {
      @include type-style('body-long-01');
      padding-bottom: $spacing-05;
    }
  }
  &__course {
    padding: $spacing-04 0;
    border-top: 2px solid $border-color-light-2;
  }
}
</style>
