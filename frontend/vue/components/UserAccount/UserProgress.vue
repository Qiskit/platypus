<template>
  <section class="user-progress">
    <UserAccountSectionHeader>
      <template #title>
        {{ $translate("Learning") }}
      </template>
      <template #description>
        {{ $translate("This page shows your progress in the Qiskit Textbook. Checkmarks appear next to section that you have completed.") }}
      </template>
    </UserAccountSectionHeader>
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
import UserAccountSectionHeader from '../UserAccount/UserAccountSectionHeader.vue'
import CourseProgress from './CourseProgress.vue'

export default defineComponent({
  name: 'UserProgress',
  components: {
    CourseProgress, UserAccountSectionHeader
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

  &__course {
    padding: $spacing-04 0;
    &:not(:last-child) {
      border-bottom: 2px solid $border-color-light-2;
    }
  }
}
</style>
