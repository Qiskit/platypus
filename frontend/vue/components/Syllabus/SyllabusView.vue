<template>
  <section class="syllabus-view">
    <h1 class="syllabus-view__title">
      {{ syllabus.title }}
    </h1>
    <h2 class="syllabus-view__section-title">
      General Information
    </h2>
    <SyllabusGeneralInformation class="syllabus-view__general-information" :syllabus="syllabus" />
    <div
      v-for="(course, idx) in syllabus.courseList"
      :key="`${idx}-${course.title}`"
      class="syllabus-view__course"
    >
      <div class="syllabus-view__course__title">
        {{ course.title }}
      </div>
      <p class="syllabus-view__course__description">
        {{ course.description }}
      </p>
      <div class="syllabus-view__course__units-title">
        <!-- TODO replace with translation on final design -->
        Chapters
      </div>
      <ColumnFlowGrid
        tag="ul"
        class="syllabus-view__course__unit-list"
        :elements="course.unitList"
      >
        <template #default="slotProps">
          <li class="syllabus-view__course__unit-list__item">
            <BasicLink class="syllabus-view__course__unit-list__unit" :url="getUrlById(slotProps.element.id)">
              {{ getNameById(slotProps.element.id) }}
            </BasicLink>
          </li>
        </template>
      </ColumnFlowGrid>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import BasicLink from '../common/BasicLink.vue'
import ColumnFlowGrid from '../common/ColumnFlowGrid.vue'
import SyllabusGeneralInformation from './SyllabusGeneralInformation.vue'
import { Syllabus } from '../../../ts/syllabus'
import { getCourseList, Section, Course } from '../../../ts/courses'

export default defineComponent({
  name: 'SyllabusView',
  components: {
    SyllabusGeneralInformation,
    BasicLink,
    ColumnFlowGrid
  },
  props: {
    syllabus: {
      type: Object,
      default: () => ({} as Syllabus),
      required: true
    }
  },
  data () {
    return {
      sectionList: [] as Section[],
    }
  },
  mounted () {
    getCourseList().then((courses) => {
      const learningPathCourses = courses.filter(course => course.type === 'learning-path')
      this.sectionList = learningPathCourses.reduce((sectionList: Section[], course: Course) => {
          return sectionList.concat(course.sections)
        }, [] as Section[])
    })
  },
  methods: {
    getUrlById (id: string) {
      return this.sectionList.find((section: Section) => section.uuid === id)?.pageUrl
    },
    getNameById (id: string) {
      return this.sectionList.find((section: Section) => section.uuid === id)?.title
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/mq.scss';
@import '~/../scss/variables/colors.scss';

.syllabus-view {
  background-color: $background-color-lighter;
  padding: $spacing-06 $spacing-05;
  user-select: text;
  cursor: auto;

  &__title {
    @include type-style('expressive-heading-04', $fluid: true);
  }

  &__section-title {
    @include type-style('expressive-heading-03', $fluid: true);
    margin: $spacing-05 0;
  }

  &__general-information {
    padding-bottom: $spacing-06;
  }

  &__course {
    border-top: 2px solid $border-color-light-2;
    padding-bottom: $spacing-05;

    &__chapters-title,
    &__title {
      @include type-style('expressive-heading-03', $fluid: true);
      margin: $spacing-05 0;
    }
    &__description {
      @include type-style("body-long-01");
      margin: $spacing-05 0;
    }
    &__chapter-list {
      &__item {
        list-style-position: outside;
        list-style-type: disc;
        margin-left: $spacing-06;

        &::marker {
          color: $text-color-lighter;
          font-size: 1.25rem;
        }
      }
      &__chapter {
        color: $block-link-color-tertiary;
      }
    }
  }
}
</style>
