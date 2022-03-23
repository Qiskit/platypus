<template>
  <div class="syllabus-card">
    <div class="syllabus-card__image" :style="`background-image: url('${image}')`" />
    <div class="syllabus-card__name">
      {{ syllabus.name }}
    </div>
    <SyllabusGeneralInformation class="syllabus-card__data" :syllabus="syllabus" />
    <div class="syllabus-card__actions">
      <AppCta
        class="syllabus-card__actions__enter"
        :url="`/syllabus/${syllabus.id}`"
        kind="ghost"
        label="Go to this learning course"
      />
      <!-- TODO: Edit url not created yet -->
      <AppCta
        class="syllabus-card__actions__edit"
        :url="`/syllabus/edit/${syllabus.id}`"
        kind="ghost"
        label="Edit Syllabus"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import AppCta from '../common/AppCta.vue'
import SyllabusGeneralInformation from '../Syllabus/SyllabusGeneralInformation.vue'

export default defineComponent({
  name: 'SyllabusCard',
  components: {
    AppCta,
    SyllabusGeneralInformation
  },
  props: {
    syllabus: {
      type: Object,
      required: false,
      default: ''
    },
    image: {
      type: String,
      required: false,
      default: ''
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/mq.scss';
@import '~/../scss/variables/colors.scss';

.syllabus-card {
  display: grid;
  grid-template-columns: 10rem 1fr;
  grid-template-rows: auto;
  grid-template-areas:
    "image name"
    "image data"
    "image actions";
  padding: $spacing-06 $spacing-06 $spacing-03 $spacing-06;
  gap: $spacing-07;
  background-color: $background-color-lighter;

  @include mq($until: medium) {
    grid-template-columns: auto;
    grid-template-rows: min(60vw, 15rem) repeat(3, auto);
    grid-template-areas:
      "image"
      "name"
      "data"
      "actions";
  }

  &__name {
    @include type-style('productive-heading-01', $fluid: true);
    grid-area: name;
  }

  &__image {
    grid-area: image;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  &__data {
    grid-area: data;
  }

  &__actions {
    grid-area: actions;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    gap: $spacing-06;

    @include mq($until: large) {
      grid-template-columns: auto;
      gap: $spacing-02;
    }
  }
}

</style>
