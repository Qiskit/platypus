<template>
  <section class="syllabus-create">
    <div class="syllabus-create__title-container">
      <h1 class="syllabus-create__title">
        {{ $translate("Classroom") }}
      </h1>
      <p class="syllabus-create__title-text">
        {{ $translate("Create a customizable syllabus and share it with your students.") }}
      </p>
    </div>
    <section class="syllabus-create__form">
      <h3>
        {{ $translate("Create a syllabus") }}
      </h3>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'

export default defineComponent({
  name: 'SyllabusCreateSection'
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/mq.scss';
@import '~/../scss/variables/colors.scss';
@import '~/../scss/mixins/mixins.scss';

.syllabus-create {
  @include contained();
  margin-left: 0;
  padding-top: $spacing-07;
  padding-bottom: $spacing-07;

  &__title {
    @include type-style('expressive-heading-05', $fluid: true);
    margin-bottom: $spacing-05;
    color: $text-active-color;

    &-container {
      @include type-style('body-long-01');
      padding-bottom: $spacing-05;
    }

    &-text {
      max-width: 38rem;
    }
  }

  &__form {
    padding: $spacing-07 0;
    border-top: 2px solid $border-color-light-2;
  }
}

</style>
