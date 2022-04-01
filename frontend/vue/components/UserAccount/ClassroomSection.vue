<template>
  <section class="classroom">
    <UserAccountSectionHeader>
      <template #title>
        {{ $translate("Classroom") }}
      </template>
      <template #description>
        {{ $translate("This page shows your classroom activities in the Qiskit Textbook.") }}
      </template>
    </UserAccountSectionHeader>
    <div class="classroom__create-syllabus">
      <AppCta
        class="classroom__create-syllabus__button"
        :label="$translate('Create a Syllabus')"
        url="/syllabus/create"
      />
      <p class="classroom__create-syllabus__description">
        <!-- TODO: update with final string and provide translation -->
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </div>
    <section class="classroom__content">
      <h1 class="classroom__content__title">
        {{ $translate("Active Syllabi") }}
      </h1>
      <p class="classroom__content__description">
        <!-- TODO: update with final string and provide translation -->
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <div class="classroom__content__syllabi-list">
        <SyllabusCard
          v-for="syllabus in syllabi"
          :key="syllabus.id"
          image="/images/header.png"
          :syllabus="syllabus"
        />
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import AppCta from '../common/AppCta.vue'
import UserAccountSectionHeader from './UserAccountSectionHeader.vue'
import SyllabusCard from './SyllabusCard.vue'
import { getSyllabi, Syllabus } from '../../../ts/syllabus'

export default defineComponent({
  name: 'ClassRoomSection',
  components: {
    UserAccountSectionHeader,
    AppCta,
    SyllabusCard
  },
  data () {
    return {
      // TODO: REPLACE MOCK DATA
      syllabi: ([] as  Syllabus[])
    }
  },
  mounted() {
    getSyllabi().then((syllabi: Syllabus[]) => {
      this.syllabi = syllabi
    })
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

  &__create-syllabus {
    padding: $spacing-07 0;
    border-bottom: 2px solid $border-color-light-2;

    &__button {
      margin-bottom: $spacing-05;
    }

    &__description {
      @include type-style('body-long-01');
    }
  }

  &__content {
    padding: $spacing-07 0;

    &__title {
      @include type-style('expressive-heading-04', $fluid: true);
      margin-bottom: $spacing-05;
    }

    &__description {
      @include type-style('body-long-01');
      margin-bottom: $spacing-07;
    }

    &__syllabi-list {
      display: flex;
      flex-direction: column;
      gap: $spacing-08;
    }
  }
}
</style>
