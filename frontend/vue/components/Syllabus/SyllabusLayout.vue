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
              {
                id: '',
                name: 'Why quantum computing?',
                url: '/course/introduction/why-quantum-computing'
              },
              {
                id: '',
                name: 'The atoms of computation',
                url: '/course/introduction/the-atoms-of-computation'
              },
              {
                id: '',
                name: 'What is quantum?',
                url: '/course/introduction/what-is-quantum'
              }
            ]
          },
          {
            title: 'Week 2',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula tellus non ligula hendrerit interdum. Suspendisse sit amet erat vitae urna mattis sodales. Nullam consequat sagittis tellus. In et justo ex. Suspendisse tempor auctor blandit. Sed vel est eu felis vehicula varius id non ante. Morbi lacinia dolor ac nunc malesuada, dictum imperdiet ligula pellentesque.',
            unitList: [
              {
                id: '',
                name: 'Why quantum computing?',
                url: '/course/introduction/why-quantum-computing'
              },
              {
                name: 'The atoms of computation',
                url: '/course/introduction/the-atoms-of-computation'
              },
              {
                name: 'What is quantum?',
                url: '/course/introduction/what-is-quantum'
              }
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
