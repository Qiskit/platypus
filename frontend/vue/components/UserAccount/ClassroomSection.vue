<template>
  <section class="classroom">
    <div class="classroom__title-container">
      <h1 class="classroom__title">
        {{ $translate("Classroom") }}
      </h1>
      <p class="classroom__title-text">
        <!-- TODO: update with final string and provide translation -->
        {{ $translate("This page shows your classroom activities in the Qiskit Textbook.") }}
      </p>
    </div>
    <section class="classroom__content">
      <!-- TODO: remove mockSyllabusLink -->
      <BasicLink
        class="classroom__syllabus-link"
        :url="mockSyllabusLink"
        :is-static="true"
        target="_self"
      >
        View mock syllabus
      </BasicLink>
      <BasicLink
        class="classroom__syllabus-link"
        url="/syllabus/create"
        :is-static="true"
        target="_self"
      >
        Create a syllabus
      </BasicLink>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import BasicLink from '../common/BasicLink.vue'

export default defineComponent({
  name: 'ClassRoomSection',
  components: {
    BasicLink
  },
  data () {
    return {
      mockSyllabusLink: '/syllabus/QML-100'
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/mq.scss';
@import '~/../scss/variables/colors.scss';
@import '~/../scss/mixins/mixins.scss';

.classroom {
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

  &__content {
    padding: $spacing-07 0;
    border-top: 2px solid $border-color-light-2;
  }

  // TODO: remove when no longer needed
  &__syllabus-link {
    display: block;
    padding-bottom: $spacing-05;
  }
}
</style>
