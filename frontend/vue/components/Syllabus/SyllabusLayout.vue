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
    <SyllabusView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import UserAccountSectionHeader from '../UserAccount/UserAccountSectionHeader.vue'
import SyllabusView from './SyllabusView.vue'

export default defineComponent({
  name: 'SyllabusLayout',
  components: {
    UserAccountSectionHeader,
    SyllabusView
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
}
</style>
