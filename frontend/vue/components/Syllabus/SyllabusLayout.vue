<template>
  <div class="syllabus">
    <!-- TODO: update section header description and provide translation -->
    <UserAccountSectionHeader>
      <template #title>
        {{ $translate("Syllabus") }}
      </template>
      <template #description>
        {{ $translate("This is placeholder text for a page where students are viewing a syllabus.") }}
      </template>
    </UserAccountSectionHeader>
    <section class="syllabus__content">
      <!-- TODO: update section content -->
      <h3>
        You are viewing a mock syllabus for QML-100
      </h3>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import UserAccountSectionHeader from '../UserAccount/UserAccountSectionHeader.vue'

export default defineComponent({
  name: 'SyllabusLayout',
  components: {
    UserAccountSectionHeader
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/mq.scss';
@import '~/../scss/mixins/mixins.scss';

.syllabus {
  @include contained();
  padding-top: $spacing-07;
  padding-bottom: $spacing-07;

  &__content {
    padding: $spacing-07 0;
  }
}
</style>
