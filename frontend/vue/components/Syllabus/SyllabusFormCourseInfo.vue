<template>
  <section class="syllabus-form-course-info__section">
    <div class="syllabus-form-course-info__row">
      <bx-input
        v-model="courseName"
        class="syllabus-form-course-info__input-field"
        name="name"
        placeholder="Please enter the syllabus name"
        label-text="Syllabus name"
        color-scheme="light"
        :required="true"
        @input="updateFormInfo"
      />
    </div>
    <div class="syllabus-form-course-info__row">
      <bx-input
        v-model="courseInstructor"
        class="syllabus-form-course-info__input-field"
        name="instructor"
        placeholder="Instructor’s name"
        label-text="Instructor"
        color-scheme="light"
        :required="true"
        @input="updateFormInfo"
      />
      <bx-input
        v-model="courseLocation"
        class="syllabus-form-course-info__input-field"
        name="location"
        placeholder="Enter the location"
        label-text="Location"
        color-scheme="light"
        :required="true"
        @input="updateFormInfo"
      />
    </div>
    <div class="syllabus-form-course-info__row">
      <bx-input
        v-model="courseUniversity"
        class="syllabus-form-course-info__input-field"
        name="university"
        placeholder="University name"
        label-text="University"
        color-scheme="light"
        :required="true"
        @input="updateFormInfo"
      />
      <bx-input
        v-model="courseOfficeHours"
        class="syllabus-form-course-info__input-field"
        name="courseOfficeHours"
        placeholder="Enter the course office hours"
        label-text="Office hours"
        color-scheme="light"
        :required="true"
        @input="updateFormInfo"
      />
    </div>
    <div class="syllabus-form-course-info__row">
      <bx-input
        v-model="courseHours"
        class="syllabus-form-course-info__input-field"
        name="courseHours"
        placeholder="Enter the class hours"
        label-text="Class hours"
        color-scheme="light"
        :required="true"
        @input="updateFormInfo"
      />
      <bx-input
        v-model="courseEmail"
        class="syllabus-form-course-info__input-field"
        name="email"
        type="email"
        placeholder="Enter the contact email"
        label-text="Email"
        color-scheme="light"
        :required="true"
        @input="updateFormInfo"
      />
    </div>
    <div class="syllabus-form-course-info__row syllabus-form-course-info__row__save">
      <BasicLink
        class="syllabus-form-course-info__link"
        :class="{'syllabus-form-course-info__link__disabled': syllabusSaved}"
        v-bind="saveSyllabusInfoLink"
        @click="saveInfoAction"
      >
        {{ $translate(saveSyllabusInfoLink.label) }}
      </BasicLink>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import 'carbon-web-components/es/components/tabs/tabs.js'
import 'carbon-web-components/es/components/tabs/tab.js'
import 'carbon-web-components/es/components/input/input.js'
import BasicLink from '../common/BasicLink.vue'

export default defineComponent({
  name: 'SyllabusFormCourseInfo',
  components: {
    BasicLink
  },
  data () {
    return {
      defaultActiveTab: 'write',
      saveSyllabusInfoLink: {
        label: 'Save to syllabus',
        url: '#'
      },
      syllabusSaved: false,
      courseName: '',
      courseInstructor: '',
      courseLocation: '',
      courseUniversity: '',
      courseOfficeHours: '',
      courseHours: '',
      courseEmail: ''
    }
  },
  methods: {
    saveInfoAction () {
      this.saveSyllabusInfoLink.label = 'Saved'
      this.syllabusSaved = true
    },
    updateFormInfo () {
      this.saveSyllabusInfoLink.label = 'Save to syllabus'
      this.syllabusSaved = false
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/mq.scss';
@import '~/../scss/mixins/mixins.scss';
@import '~/../scss/variables/colors.scss';

.syllabus-form-course-info {
  margin-top: $spacing-06;

  &__tab {
    --cds-interactive-01: #{$purple-70};
    max-width: 6rem;
  }

  &__section {
    padding: $spacing-07 $spacing-05;
    margin-bottom: $spacing-05;
    background-color: $cool-gray-10;
  }

  &__row {
    display: flex;
    padding-right: $spacing-05;
    @include mq($until: medium) {
      flex-direction: column;
    }

    &__save {
      justify-content: flex-end;
      @include mq($until: medium) {
        flex-direction: row;
      }
    }
  }

  &__input-field {
    padding-bottom: $spacing-05;

    &:not(:last-child) {
      padding-right: $spacing-07;

      @include mq($until: medium) {
        padding-right: initial;
      }
    }
  }

  &__link {
    color: $text-active-color;
    @include type-style('body-long-01');

    &__disabled {
      color: $text-color-dark;
      pointer-events: none;
      &:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
