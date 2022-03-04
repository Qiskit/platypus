<template>
  <div class="syllabus-card">
    <div class="syllabus-card__image" :style="`background-image: url('${image}')`" />
    <div class="syllabus-card__name">
      <slot name="name" />
    </div>
    <div class="syllabus-card__data">
      <div class="syllabus-card__data__item">
        <span class="syllabus-card__data__item__heading">Instructor:</span> <slot name="instructor" />
      </div>
      <div class="syllabus-card__data__item">
        <span class="syllabus-card__data__item__heading">Location:</span> <slot name="location" />
      </div>
      <div class="syllabus-card__data__item">
        <span class="syllabus-card__data__item__heading">University:</span> <slot name="university" />
      </div>
      <div class="syllabus-card__data__item">
        <span class="syllabus-card__data__item__heading">Office Hours:</span> <slot name="office-hours" />
      </div>
      <div class="syllabus-card__data__item">
        <span class="syllabus-card__data__item__heading">Class Hours:</span> <slot name="class-hours" />
      </div>
      <div class="syllabus-card__data__item">
        <span class="syllabus-card__data__item__heading">Email:</span> <slot name="email" />
      </div>
    </div>
    <div class="syllabus-card__actions">
      <AppCta
        class="syllabus-card__actions__enter"
        :url="`/syllabus/${syllabusId}`"
        kind="ghost"
        label="Go to this learning course"
      />
      <!-- TODO: Edit url not created yet -->
      <AppCta
        class="syllabus-card__actions__edit"
        :url="`/syllabus/edit/${syllabusId}`"
        kind="ghost"
        label="Edit Syllabus"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import AppCta from '../common/AppCta.vue'

export default defineComponent({
  name: 'SyllabusCard',
  components: {
    AppCta
  },
  props: {
    image: {
      type: String,
      required: false,
      default: ''
    },
    syllabusId: {
      type: String,
      required: false,
      default: ''
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
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
    @include type-style('body-long-01');
    grid-area: data;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    gap: $spacing-06;
    &__item {
      &__heading {
        @include type-style('productive-heading-01');
      }
    }
  }

  &__actions {
    grid-area: actions;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    gap: $spacing-06;
  }
}

</style>
