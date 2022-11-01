<template>
  <div class="syllabus-card">
    <div class="syllabus-card__body">
      <h4 class="syllabus-card__title">
        {{ syllabus.name }}
      </h4>
      <SyllabusGeneralInformation class="syllabus-card__data" :syllabus="syllabus" />
    </div>
    <div class="syllabus-card__footer">
      <AppCta
        v-if="userIsOwner"
        class="syllabus-card__footer__cta syllabus-card__footer__cta-edit"
        :url="`/syllabus/edit/${syllabus.code}`"
        label="Edit Syllabus"
        kind="secondary"
      />
      <AppCta
        class="syllabus-card__footer__cta"
        :url="`/syllabus/${syllabus.code}`"
        label="View Syllabus"
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
      default: () => { }
    },
    userId: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    userIsOwner ():boolean {
      const currentSyllabus = JSON.parse(JSON.stringify(this.syllabus))

      return currentSyllabus?.ownerList.includes(this.userId)
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/mq.scss';
@import '~/../scss/variables/colors.scss';

@mixin bicolor-background($colorLeft, $colorRight) {
  background-image: linear-gradient(90deg, $colorLeft 0%, $colorLeft 50%, $colorRight 50%, $colorRight 100%);
}

.syllabus-card {
  width: 100%;
  background-color: $background-color-lighter;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  &__body {
    padding: $spacing-05 $spacing-05 $spacing-07 $spacing-05;
  }

  &__title {
    @include type-style('productive-heading-01');
    margin-bottom: $spacing-06;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;

    &__cta {
      width: 100%;
      max-width: 50%;

      &-edit {
        @include bicolor-background($background-color-light-2, $background-color-light);
        color: $text-color-black;

        &:hover,
        &:focus,
        &:active {
          color: $text-color-black;
        }
      }
    }
  }
}
</style>
