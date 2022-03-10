<template>
  <section class="syllabus-view">
    <h1 class="syllabus-view__title">
      {{ syllabus.title }}
    </h1>
    <h2 class="syllabus-view__section-title">
      General Information
    </h2>
    <SyllabusGeneralInformation class="syllabus-view__general-information">
      <template #instructor>
        {{ syllabus.instructor }}
      </template>
      <template #location>
        {{ syllabus.location }}
      </template>
      <template #university>
        {{ syllabus.university }}
      </template>
      <template #office-hours>
        {{ syllabus.officeHours }}
      </template>
      <template #class-hours>
        {{ syllabus.classHours }}
      </template>
      <template #email>
        {{ syllabus.email }}
      </template>
    </SyllabusGeneralInformation>
    <div
      v-for="(workPackage, idx) in syllabus.workPackages"
      :key="`${idx}-${workPackage.title}`"
      class="syllabus-view__work-package"
    >
      <div class="syllabus-view__work-package__title">
        {{ workPackage.title }}
      </div>
      <p class="syllabus-view__work-package__description">
        {{ workPackage.description }}
      </p>
      <div class="syllabus-view__work-package__chapters-title">
        <!-- TODO replace with translation on final design -->
        Chapters
      </div>
      <ColumnFlowGrid
        tag="ul"
        class="syllabus-view__work-package__chapter-list"
        :elements="workPackage.chapterList"
      >
        <template #default="slotProps">
          <li class="syllabus-view__work-package__chapter-list__item">
            <BasicLink class="syllabus-view__work-package__chapter-list__chapter" :url="slotProps.element.url">
              {{ slotProps.element.name }}
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

export default defineComponent({
  name: 'SyllabusView',
  components: {
    SyllabusGeneralInformation,
    BasicLink,
    ColumnFlowGrid
  },
  data () {
    return {
      // TODO mock data
      syllabus: {
        title: 'PHYS 332: Quantum Mechanics II (Spring, 2022)',
        instructor: 'instructor name',
        location: 'Madrid',
        university: 'UCM',
        officeHours: '10:00 to 13:00',
        classHours: '15:00 to 18:00',
        email: 'none@none.never',
        workPackages: [
          {
            title: 'Week 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula tellus non ligula hendrerit interdum. Suspendisse sit amet erat vitae urna mattis sodales. Nullam consequat sagittis tellus. In et justo ex. Suspendisse tempor auctor blandit. Sed vel est eu felis vehicula varius id non ante. Morbi lacinia dolor ac nunc malesuada, dictum imperdiet ligula pellentesque.',
            chapterList: [
              {
                name: 'Why quantum computing?',
                url: 'course/introduction/why-quantum-computing'
              },
              {
                name: 'The atoms of computation',
                url: 'course/introduction/the-atoms-of-computation'
              },
              {
                name: 'What is quantum?',
                url: 'course/introduction/what-is-quantum'
              }
            ]
          },
          {
            title: 'Week 2',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula tellus non ligula hendrerit interdum. Suspendisse sit amet erat vitae urna mattis sodales. Nullam consequat sagittis tellus. In et justo ex. Suspendisse tempor auctor blandit. Sed vel est eu felis vehicula varius id non ante. Morbi lacinia dolor ac nunc malesuada, dictum imperdiet ligula pellentesque.',
            chapterList: [
              {
                name: 'Why quantum computing?',
                url: 'course/introduction/why-quantum-computing'
              },
              {
                name: 'The atoms of computation',
                url: 'course/introduction/the-atoms-of-computation'
              },
              {
                name: 'What is quantum?',
                url: 'course/introduction/what-is-quantum'
              }
            ]
          }
        ]
      }
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

  &__work-package {
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
