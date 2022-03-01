<template>
  <div class="syllabus">
    <section class="syllabus__title-container">
      <!-- TODO: provide translations for all strings -->
      <h1 class="syllabus__title">
        Classroom
      </h1>
      <!-- TODO: update section subtitle -->
      <p class="syllabus__subtitle">
        Create a customizable syllabus and share it with your students.
      </p>
    </section>
    <section class="syllabus__content">
      <!-- TODO: update section description -->
      <h3 class="syllabus__description">
        Create a syllabus
      </h3>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'

export default defineComponent({
  name: 'SyllabusLayout'
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/colors.scss';
@import '~/../scss/variables/mq.scss';
@import '~/../scss/mixins/mixins.scss';

.syllabus {
  @include contained();
  padding-top: $spacing-07;
  padding-bottom: $spacing-07;

  &__title {
    @include type-style('expressive-heading-05', $fluid: true);
    margin-bottom: $spacing-05;
    color: $text-active-color;
  }

  &__subtitle {
    @include type-style('body-long-01');
    padding-bottom: $spacing-07;
  }

  &__description {
    @include type-style('body-long-01');
  }

  &__content {
    padding: $spacing-07 0;
    border-top: 2px solid $border-color-light-2;
  }
}
</style>
