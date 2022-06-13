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
    <section class="classroom__content">
      <h1 class="classroom__content__title">
        {{ $translate("Active Syllabi") }}
      </h1>
      <p class="classroom__content__description">
        {{
          $translate(
            "Here are your active syllabi. You can edit, publish, and share them with your students"
          )
        }}
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
import { defineComponent } from "vue-demi";
import AppCta from "../common/AppCta.vue";
import { getSyllabi, Syllabus } from "../../../ts/syllabus";
import UserAccountSectionHeader from "./UserAccountSectionHeader.vue";
import SyllabusCard from "./SyllabusCard.vue";

export default defineComponent({
  name: "ClassRoomSection",
  components: {
    UserAccountSectionHeader,
    AppCta,
    SyllabusCard,
  },
  data() {
    return {
      syllabi: [] as Syllabus[],
      createSyllabusCTA: {
        label: this.$translate("Create a Syllabus"),
        url: "/syllabus/create",
        segment: {
          cta: "syllabus-create",
          location: "user-account-classroom",
        },
      },
    };
  },
  mounted() {
    getSyllabi().then((syllabi: Syllabus[]) => {
      this.syllabi = syllabi;
    });
  },
});
</script>

<style lang="scss" scoped>
@import "carbon-components/scss/globals/scss/typography";
@import "~/../scss/variables/mq.scss";
@import "~/../scss/variables/colors.scss";
@import "~/../scss/mixins/mixins.scss";

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
      @include type-style("body-long-01");
    }
  }

  &__content {
    padding: $spacing-07 0;

    &__title {
      @include type-style("expressive-heading-04", $fluid: true);
      margin-bottom: $spacing-05;
    }

    &__description {
      @include type-style("body-long-01");
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
