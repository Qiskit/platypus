<template>
  <div class="syllabus-general-information">
    <div
      class="syllabus-general-information__item"
      v-for="(field, index) in fields"
      :key="index"
    >
      <span class="syllabus-general-information__item__heading">{{ field.name }}:</span> {{ field.value }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'

interface fieldData {
  name: string,
  value: string
}

export default defineComponent({
  name: 'SyllabusGeneralInformation',
  props: {
    syllabus: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  computed: {
    fields (): fieldData[] {
      const fieldList : fieldData[] = []
      if (this.syllabus.instructor) {
        fieldList.push({
          name: this.$translate('Instructor'),
          value: this.syllabus.instructor
        });
      }
      if (this.syllabus.location) {
        fieldList.push({
          name: this.$translate('Location'),
          value: this.syllabus.location
        });
      }
      if (this.syllabus.university) {
        fieldList.push({
          name: this.$translate('University'),
          value: this.syllabus.university
        });
      }
      if (this.syllabus.officeHours) {
        fieldList.push({
          name: this.$translate('Office Hours'),
          value: this.syllabus.officeHours
        });
      }
      if (this.syllabus.classHours) {
        fieldList.push({
          name: this.$translate('Class Hours'),
          value: this.syllabus.classHours
        });
      }
      if (this.syllabus.email) {
        fieldList.push({
          name: this.$translate('Email'),
          value: this.syllabus.email
        });
      }

      return fieldList
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/mq.scss';
@import '~/../scss/mixins/mixins.scss';

.syllabus-general-information {
  @include type-style('body-long-01');
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  gap: $spacing-06;

  @include mq($until: medium) {
    grid-template-columns: auto;
  }

  &__item {
    &__heading {
      @include type-style('productive-heading-01');
    }
  }
}
</style>
