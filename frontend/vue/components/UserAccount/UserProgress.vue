<template>
  <section class="user-progress">
    <div class="user-progress__title-container">
      <h1 class="user-progress__title">
        {{ $translate("Learning") }}
      </h1>
      <p class="user-progress__title-text">
        {{ $translate("This page shows your progress in the Qiskit Textbook. Checkmarks appear next to section that you have completed.") }}
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
import { getCourseList, Course } from '../../../ts/courses'
import CourseProgress from './CourseProgress.vue'

export default defineComponent({
  name: 'UserProgress',
  components: {
    CourseProgress
  },
  data () {
    return {
      courseList: [] as Course[]
    }
  },
  mounted () {
    getCourseList().then((courses) => {
      this.courseList = courses.filter(course => course.type === 'learning-path')
    })
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/mq.scss';
@import '~/../scss/variables/colors.scss';
@import '~/../scss/mixins/mixins.scss';

.user-progress {
  @include contained();
  margin-left: 0;
  padding-top: $spacing-07;
  padding-bottom: $spacing-07;

  &__title {
    @include type-style('expressive-heading-05', $fluid: true);
    margin-bottom: $spacing-05;
    color: $text-active-color;

    &-container {
      @include type-style('body-long-01');
      padding-bottom: $spacing-05;
    }

    &-text {
      max-width: 38rem;
    }
  }
  &__course {
    padding: $spacing-04 0;
    border-top: 2px solid $border-color-light-2;
  }
}

</style>
