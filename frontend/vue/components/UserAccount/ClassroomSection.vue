<template>
  <section class="classroom">
    <UserAccountSectionHeader>
      <template #title>
        {{ $translate("Classroom") }}
      </template>
      <template #description>
        {{
          $translate(
            "This page shows your classroom activities in the Qiskit Textbook."
          )
        }}
      </template>
    </UserAccountSectionHeader>
    <div class="classroom__create-syllabus">
      <AppCta
        class="classroom__create-syllabus__button"
        :label="createSyllabusCTA.label"
        :url="createSyllabusCTA.url"
        :segment="createSyllabusCTA.segment"
      />
      <p class="classroom__create-syllabus__description">
        {{
          $translate(
            "Create a curated learning path for your students, using Qiskit Textbook Chapters, Labs, and Summer Schools"
          )
        }}
      </p>
    </div>
    <section class="classroom__section">
      <h1 class="classroom__section__title">
        {{ $translate("My Syllabi") }}
      </h1>
      <p class="classroom__section__description">
        {{
          $translate(
            "The syllabi below are ones that have been published and shared."
          )
        }}
      </p>
      <div class="classroom__section__syllabi-list">
        <SyllabusCard
          v-for="syllabus in syllabi"
          :key="syllabus.id"
          :syllabus="syllabus"
        />
      </div>
    </section>
    <section class="classroom__section">
      <h1 class="classroom__section__title">
        {{ $translate("Community Syllabi") }}
      </h1>
      <p class="classroom__section__description">
        {{
          $translate(
            "You can add these curated syllabi to your personal classroom in order to edit and customize them."
          )
        }}
      </p>
      <div class="classroom__section__syllabi-list">
        <SyllabusCard
          v-for="syllabus in communitySyllabi"
          :key="syllabus.id"
          :syllabus="syllabus"
        />
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import AppCta from '../common/AppCta.vue'
import { getSyllabi, Syllabus } from '../../../ts/syllabus'
import UserAccountSectionHeader from './UserAccountSectionHeader.vue'
import SyllabusCard from './SyllabusCard.vue'

export default defineComponent({
  name: 'ClassRoomSection',
  components: {
    UserAccountSectionHeader,
    AppCta,
    SyllabusCard
  },
  data () {
    return {
      syllabi: [] as Syllabus[],
      createSyllabusCTA: {
        label: this.$translate('Create a Syllabus'),
        url: '/syllabus/create',
        segment: {
          cta: 'syllabus-create',
          location: 'user-account-classroom'
        }
      },
      communitySyllabi: [
        {
          name: 'Quantum Computing with Superconducting Qubits',
          instructor: 'Jay Gambetta',
          institution: 'IBM Quantum',
        },
        {
          name: 'Introduction to Quantum Algorithms',
          instructor: 'Peter Shor',
          institution: 'Masachussetts Institute of Technology',
          code: 'CFH-KBT'
        },
        {
          name: 'Preparing for the Qiskit developer certification exam',
          instructor: 'James L. Weaver',
          institution: 'IBM Quantum',
          code: 'S9P-7GP'
        }
      ]
    }
  },

  mounted () {
    getSyllabi().then((syllabi: Syllabus[]) => {
      this.syllabi = syllabi
    })
  }
})
</script>

<style lang="scss" scoped>
@import "carbon-components/scss/globals/scss/typography";
@import "~/../scss/variables/mq.scss";
@import "~/../scss/variables/colors.scss";
@import "~/../scss/mixins/mixins.scss";

.classroom {
  @include contained();
  max-width: initial;
  margin-left: 0;
  padding-top: $spacing-07;
  padding-bottom: $spacing-07;

  @include mq($from: max-size) {
    padding: $spacing-07;
  }

  &__create-syllabus {
    padding: $spacing-07 0;
    border-bottom: 2px solid $border-color-light-2;

    &__button {
      margin-bottom: $spacing-05;
    }

    &__description {
      @include type-style("body-long-01");
    }
  }

  &__section {
    padding: $spacing-07 0;
    &:not(:last-child) {
      border-bottom: 2px solid $border-color-light-2;
    }

    &__title {
      @include type-style("expressive-heading-04", $fluid: true);
      margin-bottom: $spacing-05;
    }

    &__description {
      @include type-style("body-long-01");
      margin-bottom: $spacing-07;
    }

    &__syllabi-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: $spacing-07;

      @include mq($until: large) {
        grid-template-columns: initial;
      }
    }
  }
}
</style>
