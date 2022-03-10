<template>
  <div class="syllabus-general-information">
    <div class="syllabus-general-information__item">
      <span class="syllabus-general-information__item__heading">Instructor:</span> <slot name="instructor" />
    </div>
    <div class="syllabus-general-information__item">
      <span class="syllabus-general-information__item__heading">Location:</span> <slot name="location" />
    </div>
    <div class="syllabus-general-information__item">
      <span class="syllabus-general-information__item__heading">University:</span> <slot name="university" />
    </div>
    <div class="syllabus-general-information__item">
      <span class="syllabus-general-information__item__heading">Office Hours:</span> <slot name="office-hours" />
    </div>
    <div class="syllabus-general-information__item">
      <span class="syllabus-general-information__item__heading">Class Hours:</span> <slot name="class-hours" />
    </div>
    <div class="syllabus-general-information__item">
      <span class="syllabus-general-information__item__heading">Email:</span> <slot name="email" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'

export default defineComponent({
  name: 'SyllabusGeneralInformation'
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
