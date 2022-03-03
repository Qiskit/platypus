<template>
  <section class="classroom">
    <UserAccountSectionHeader
      :title="$translate('Classroom')"
      :description="$translate('This page shows your classroom activities in the Qiskit Textbook.')"
    />
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
import UserAccountSectionHeader from './UserAccountSectionHeader.vue'

export default defineComponent({
  name: 'ClassRoomSection',
  components: {
    BasicLink, UserAccountSectionHeader
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
@import '~/../scss/mixins/mixins.scss';

.classroom {
  @include contained();
  margin-left: 0;
  padding-top: $spacing-07;
  padding-bottom: $spacing-07;

  &__content {
    padding: $spacing-07 0;
  }

  // TODO: remove when no longer needed
  &__syllabus-link {
    display: block;
    padding-bottom: $spacing-05;
  }
}
</style>
