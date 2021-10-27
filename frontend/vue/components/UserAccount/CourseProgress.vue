<template>
  <div class="course-progress">
    <h5 class="course-progress__title">
      {{ course.title }}
    </h5>
    <ColumnFlowGrid
      class="course-progress__section-list"
      :elements="course.sections"
    >
      <template #default="slotProps">
        <SectionProgress
          class="course-progress__section"
          :section="slotProps.element"
        />
      </template>
    </ColumnFlowGrid>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import ColumnFlowGrid from '../common/ColumnFlowGrid.vue'
import SectionProgress from './SectionProgress.vue'

export default defineComponent({
  name: 'CourseProgress',
  components: {
    SectionProgress,
    ColumnFlowGrid
  },
  props: {
    course: {
      type: Object,
      required: false,
      default: () => {}
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';

.course-progress {
  &__title {
    @include type-style('expressive-heading-01');
    padding: $spacing-04 0;
  }
}

</style>
