<template>
  <div class="course-progress">
    <h5 class="course-progress__title">
      {{ course.title }}
    </h5>
    <ColumnFlowGrid
      class="course-progress__chapter-list"
      :elements="course.sections"
    >
      <template #default="slotProps">
        <ChapterProgress
          class="course-progress__chapter"
          :chapter="slotProps.element"
        />
      </template>
    </ColumnFlowGrid>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import ColumnFlowGrid from '../common/ColumnFlowGrid.vue'
import ChapterProgress from './ChapterProgress.vue'

export default defineComponent({
  name: 'CourseProgress',
  components: {
    ChapterProgress,
    ColumnFlowGrid
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

.course-progress {
  &__title {
    @include type-style('expressive-heading-01');
    padding: $spacing-04 0;
  }
}
</style>
