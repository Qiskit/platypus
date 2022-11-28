<template>
  <section class="syllabus-view">
    <bx-btn
      class="syllabus-view__duplicate"
      :disabled="!userIsLoggedIn"
      kind="ghost"
      @click="copySyllabus"
    >
      <span class="syllabus-view__duplicate__label">Duplicate syllabus</span>
      <bx-tooltip-icon
        v-if="!userIsLoggedIn"
        alignment="end"
        direction="bottom"
        body-text="Please log in to duplicate this syllabus"
      >
        <Download16 />
      </bx-tooltip-icon>
      <Download16 v-else class="syllabus-view__duplicate__icon" />
    </bx-btn>
    <h2 class="syllabus-view__general-info-title">
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
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="syllabus-view__course__description" v-html="course.description" />
      <div v-if="course.unitList.length > 0" class="syllabus-view__course__units-title">
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
            <BasicLink class="syllabus-view__course__unit-list__unit" :url="getUrlById(slotProps.element)">
              {{ getNameById(slotProps.element) }}
            </BasicLink>
          </li>
        </template>
      </ColumnFlowGrid>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import Download16 from '@carbon/icons-vue/es/download/16'
import 'carbon-web-components/es/components/tooltip/tooltip-icon'
import BasicLink from '../common/BasicLink.vue'
import ColumnFlowGrid from '../common/ColumnFlowGrid.vue'
import { Syllabus } from '../../../ts/syllabus'
import { getCourseList, Section, Course } from '../../../ts/courses'
import SyllabusGeneralInformation from './SyllabusGeneralInformation.vue'

declare global {
  interface Window {
    textbook: any
  }
}

export default defineComponent({
  name: 'SyllabusView',
  components: {
    SyllabusGeneralInformation,
    BasicLink,
    ColumnFlowGrid,
    Download16
  },
  props: {
    syllabus: {
      type: Object,
      default: () => ({} as Syllabus),
      required: true
    },
    userIsLoggedIn: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data () {
    return {
      sectionList: [] as Section[]
    }
  },
  mounted () {
    getCourseList().then((courses) => {
      const availableCourses = courses.filter(course => course.type !== 'docs')
      this.sectionList = availableCourses.reduce((sectionList: Section[], course: Course) => {
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
    },
    copySyllabus () {
      const duplicatedSyllabus = this.syllabus
      duplicatedSyllabus.id = ''
      duplicatedSyllabus.code = ''
      duplicatedSyllabus.name = `Copy of ${this.syllabus.name}`

      window.textbook.trackClickEvent('syllabus', `Duplicate syllabus: ${this.syllabus.name}`)

      const url = '/syllabus'
      const csrfToken = { _csrf: window.csrfToken }
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...csrfToken,
          ...duplicatedSyllabus
        })
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((jsonResult: Syllabus) => {
            window.location.href = `/syllabus/edit/${jsonResult.code}`
          })
        } else {
          // TODO: Manage this error (and improve backend feedback)
          console.error(res)
        }
      })
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/mq.scss';
@import '~/../scss/variables/colors.scss';

.syllabus-view {
  position: relative;
  background-color: $background-color-lighter;
  padding: $spacing-05;
  user-select: text;
  cursor: auto;
  @include mq($until: medium) {
    padding: $spacing-10 $spacing-05 $spacing-06 $spacing-05;
  }

  &__duplicate {
    position: absolute;
    top: 0;
    right: 0;

    @include mq($until: medium) {
      right: initial;
      left: 0;
    }

    &::part(button) {
      --cds-link-01: #{$purple-70};
      --cds-hover-primary-text: #{$purple-70};
      &:focus,
      &:hover {
        background-color: $cool-gray-20;
      }
    }

    &__label {
      display: block;
      padding-right: $spacing-05;
    }
  }

  &__general-info-title {
    @include type-style('expressive-heading-03', $fluid: true);
    margin-bottom: $spacing-05;
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

    &__units-title,
    &__title {
      @include type-style('expressive-heading-03', $fluid: true);
      margin: $spacing-05 0;
    }
    &__description {
      margin-bottom: $spacing-07;
      :deep(p, a) {
        @include type-style("body-long-01");
      }
      :deep(i) {
        font-style: italic;
      }
      :deep(ol) {
        list-style: decimal;
        margin: 0 0 $spacing-05 $spacing-05;
        li {
          @include type-style("body-long-01");
          margin-bottom: $spacing-03;
        }
      }
      :deep(ul) {
        list-style: disc;
        margin: 0 0 $spacing-05 $spacing-05;
        li {
          @include type-style("body-long-01");
          margin-bottom: $spacing-03;
        }
      }
      :deep(ul li) {
        list-style-position: outside;
      }
    }
    &__unit-list {
      &__item {
        list-style-position: outside;
        list-style-type: disc;
        margin-left: $spacing-06;

        &::marker {
          color: $text-color-lighter;
          font-size: 1.25rem;
        }
      }
      &__unit {
        color: $block-link-color-tertiary;
      }
    }
  }
}
</style>
