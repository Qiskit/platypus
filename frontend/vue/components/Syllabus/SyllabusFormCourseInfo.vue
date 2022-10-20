<template>
  <section class="syllabus-form-course-info__section">
    <div class="syllabus-form-course-info__row">
      <bx-input
        ref="nameInput"
        :value="syllabus.name"
        class="syllabus-form-course-info__input-field"
        name="name"
        placeholder="Please enter the syllabus name"
        label-text="Syllabus name *"
        color-scheme="light"
        :required="true"
        @input="updateFormInfo"
      />
    </div>
    <div class="syllabus-form-course-info__row">
      <bx-input
        ref="instructorInput"
        :value="syllabus.instructor"
        class="syllabus-form-course-info__input-field"
        name="instructor"
        placeholder="Instructor’s name"
        label-text="Instructor *"
        color-scheme="light"
        :required="true"
        @input="updateFormInfo"
      />
      <bx-input
        ref="locationInput"
        :value="syllabus.location"
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
        ref="institutionInput"
        :value="syllabus.institution"
        class="syllabus-form-course-info__input-field"
        name="university"
        placeholder="University name"
        label-text="University"
        color-scheme="light"
        :required="true"
        @input="updateFormInfo"
      />
      <bx-input
        ref="officeHoursInput"
        :value="syllabus.officeHours"
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
        ref="classHoursInput"
        :value="syllabus.classHours"
        class="syllabus-form-course-info__input-field"
        name="courseHours"
        placeholder="Enter the class hours"
        label-text="Class hours"
        color-scheme="light"
        :required="true"
        @input="updateFormInfo"
      />
      <bx-input
        ref="emailInput"
        :value="syllabus.email"
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
import BXInput from 'carbon-web-components/es/components/input/input.js'
import BasicLink from '../common/BasicLink.vue'
import { Syllabus } from '../../../ts/syllabus'

export default defineComponent({
  name: 'SyllabusFormCourseInfo',
  components: {
    BasicLink
  },
  props: {
    syllabus: {
      type: Object,
      default: () => ({} as Syllabus),
      required: false
    }
  },
  data () {
    return {
      defaultActiveTab: 'write',
      saveSyllabusInfoLink: {
        label: 'Save to syllabus',
        url: '#'
      },
      syllabusSaved: false,
      nameInputIsPristine: true,
      instructorIsPristine: true
    }
  },
  methods: {
    updatePristineStatus () {
      if (this.nameInputIsPristine) {
        this.nameInputIsPristine = (this.$refs.nameInput as BXInput).value.length === 0
      }
      if (this.instructorIsPristine) {
        this.instructorIsPristine = (this.$refs.instructorInput as BXInput).value.length === 0
      }
    },
    isValid (skipPrestineCheck?: boolean) {
      let hasName = false
      let hasInstructor = false

      this.updatePristineStatus()

      if (skipPrestineCheck || !this.nameInputIsPristine) {
        hasName = (this.$refs.nameInput as BXInput).checkValidity()
      }
      if (skipPrestineCheck || !this.instructorIsPristine) {
        hasInstructor = (this.$refs.instructorInput as BXInput).checkValidity()
      }

      return hasName && hasInstructor
    },
    saveInfoAction () {
      if (this.isValid(true)) {
        this.saveSyllabusInfoLink.label = 'Saved'
        this.syllabusSaved = true
      }
    },
    updateFormInfo () {
      this.saveSyllabusInfoLink.label = 'Save to syllabus'
      this.syllabusSaved = false

      this.isValid()

      const updatedData = {
        name: (this.$refs.nameInput as BXInput).value,
        instructor: (this.$refs.instructorInput as BXInput).value,
        location: (this.$refs.locationInput as BXInput).value,
        institution: (this.$refs.institutionInput as BXInput).value,
        officeHours: (this.$refs.officeHoursInput as BXInput).value,
        classHours: (this.$refs.classHoursInput as BXInput).value,
        email: (this.$refs.emailInput as BXInput).value
      }

      const mergedObject = {
        ...this.syllabus,
        ...updatedData
      }

      this.$emit('change', mergedObject)
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
    --cds-interactive-01: #{$border-color-secondary};
    max-width: 6rem;
  }

  &__section {
    padding: $spacing-07 $spacing-05;
    margin-bottom: $spacing-05;
    background-color: $background-color-lighter;
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
    --cds-focus: #{$border-color-secondary};
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
