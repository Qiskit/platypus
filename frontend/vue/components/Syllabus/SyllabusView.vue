<template>
  <section class="syllabus-view">
    <h1 class="syllabus-view__title">
      {{ syllabusData.title }}
    </h1>
    <h2 class="syllabus-view__section-title">
      General Information
    </h2>
    <SyllabusGeneralInformation class="syllabus-view__general-information" :syllabus="syllabusData" />
    <div
      v-for="(module, idx) in syllabusData.module"
      :key="`${idx}-${module.title}`"
      class="syllabus-view__module"
    >
      <div class="syllabus-view__module__title">
        {{ module.title }}
      </div>
      <p class="syllabus-view__module__description">
        {{ module.description }}
      </p>
      <div class="syllabus-view__module__chapters-title">
        <!-- TODO replace with translation on final design -->
        Chapters
      </div>
      <ColumnFlowGrid
        tag="ul"
        class="syllabus-view__module__chapter-list"
        :elements="module.chapterList"
      >
        <template #default="slotProps">
          <li class="syllabus-view__module__chapter-list__item">
            <BasicLink class="syllabus-view__module__chapter-list__chapter" :url="slotProps.element.url">
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
  props: {
    syllabusData: {
      type: Object,
      required: true
    }
  },
  mounted () {
    console.log(this.syllabusData, 'syllabusDataInView')
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

  &__module {
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
