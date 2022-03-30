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
    <SyllabusView :syllabus="syllabus"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import UserAccountSectionHeader from '../UserAccount/UserAccountSectionHeader.vue'
import SyllabusView from './SyllabusView.vue'
import { Syllabus } from '../../../ts/syllabus'

export default defineComponent({
  name: 'SyllabusLayout',
  components: {
    UserAccountSectionHeader,
    SyllabusView
  },
  data () {
    return {
      // TODO replace mock data
      syllabus: {
        name: 'PHYS 332: Quantum Mechanics II (Spring, 2022)',
        instructor: 'instructor name',
        location: 'Madrid',
        institution: 'UCM',
        officeHours: '10:00 to 13:00',
        classHours: '15:00 to 18:00',
        email: 'none@none.never',
        courseList: [
          {
            title: 'Week 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula tellus non ligula hendrerit interdum. Suspendisse sit amet erat vitae urna mattis sodales. Nullam consequat sagittis tellus. In et justo ex. Suspendisse tempor auctor blandit. Sed vel est eu felis vehicula varius id non ante. Morbi lacinia dolor ac nunc malesuada, dictum imperdiet ligula pellentesque.',
            unitList: [
              'bdb1d662-e0f6-428a-8830-befe6b47f320',
              '7c765036-aebc-11ec-b909-0242ac120002',
              '9260a554-aebc-11ec-b909-0242ac120002'
            ]
          },
          {
            title: 'Week 2',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula tellus non ligula hendrerit interdum. Suspendisse sit amet erat vitae urna mattis sodales. Nullam consequat sagittis tellus. In et justo ex. Suspendisse tempor auctor blandit. Sed vel est eu felis vehicula varius id non ante. Morbi lacinia dolor ac nunc malesuada, dictum imperdiet ligula pellentesque.',
            unitList: [
              '9e8ceb9e-aebc-11ec-b909-0242ac120002',
              'a2e6f7a2-aebc-11ec-b909-0242ac120002'
            ]
          }
        ]
      } as Syllabus
    }
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
