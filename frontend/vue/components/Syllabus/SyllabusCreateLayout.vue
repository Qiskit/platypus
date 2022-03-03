<template>
  <section class="syllabus-create">
    <UserAccountSectionHeader>
      <template #title>
        {{ $translate("Syllabus") }}
      </template>
      <template #description>
        {{ $translate("Create a customizable syllabus and share it with your students.") }}
      </template>
    </UserAccountSectionHeader>
    <div class="syllabus-create__content">
      <h3>
        {{ $translate("Create a syllabus") }}
      </h3>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import UserAccountSectionHeader from '../UserAccount/UserAccountSectionHeader.vue'

export default defineComponent({
  name: 'SyllabusCreateLayout',
  components: {
    UserAccountSectionHeader
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/mq.scss';
@import '~/../scss/mixins/mixins.scss';

.syllabus-create {
  @include contained();
  padding-top: $spacing-07;
  padding-bottom: $spacing-07;

  &__content {
    padding: $spacing-07 0;
  }
}
</style>
