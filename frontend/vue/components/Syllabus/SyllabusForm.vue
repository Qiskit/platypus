<template>
  <section class="syllabus-form">
    <bx-tabs :value="defaultActiveTab">
      <bx-tab id="tab-write" class="syllabus-form__tab" target="panel-write" value="write">
        {{ $translate('Write') }}
      </bx-tab>
    </bx-tabs>
    <div id="panel-write" class="syllabus-form__tab-panel" role="tabpanel" aria-labelledby="tab-write">
      <SyllabusFormCourseInfo
        :syllabus="syllabus"
        @change="syllabusInfoChanged"
      />
      <SyllabusFormModule
        v-for="(course, index) in syllabus.courseList"
        :key="course"
        :show-close-button="syllabus.courseList.length > 1"
        :course="course"
        @removeModuleAction="removeContentBlock(course)"
        @change="newCourse => courseInfoChanged(newCourse, index)"
      />
      <div class="syllabus-form__add-content">
        <BasicLink
          class="syllabus-form__add-content__link"
          v-bind="addContentLink"
          @click="addContentBlock"
        >
          {{ addContentLink.label }}
        </BasicLink>
      </div>
      <SyllabusInlineNotification
        v-if="lastDeletedCourse"
        @on-close-notification="closeNotification"
        @undo-deletion="undoDeleteAction"
      />
      <div class="syllabus-form__actions">
        <AppCta
          class="syllabus-form__actions__cancel"
          v-bind="cancelAction"
          target="_self"
          kind="ghost"
        />
        <AppCta
          :label="submitAction.label"
          :segment="submitAction.segment"
          target="_self"
          @click="submitForm($event)"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import 'carbon-web-components/es/components/tabs/tabs.js'
import 'carbon-web-components/es/components/tabs/tab.js'
import AppCta from '../common/AppCta.vue'
import BasicLink from '../common/BasicLink.vue'
import SyllabusFormCourseInfo from './SyllabusFormCourseInfo.vue'
import SyllabusFormModule from './SyllabusFormModule.vue'
import SyllabusInlineNotification from './SyllabusInlineNotification.vue'
import { Syllabus, Unit, SyllabusCourse } from '../../../ts/syllabus'
import { getCourseList, Course, Section } from '../../../ts/courses'

interface DeletedCourse {
  index: number, 
  course: SyllabusCourse
}

export default defineComponent({
  name: 'SyllabusForm',
  components: {
    AppCta,
    BasicLink,
    SyllabusFormCourseInfo,
    SyllabusFormModule,
    SyllabusInlineNotification
  },
  data () {
    return {
      defaultActiveTab: 'write',
      lastDeletedCourse: undefined as DeletedCourse|undefined,
      addContentLink: {
        label: 'Add content',
        url: '#'
      },
      cancelAction: {
        url: '/account#Classroom',
        label: this.$translate('Cancel'),
        segment: {
          cta: 'cancel',
          location: 'create-syllabus'
        }
      },
      submitAction: {
        label: 'Publish syllabus',
        url: '#',
        segment: {
          cta: 'publish-syllabus',
          location: 'create-syllabus'
        }
      },
      sections: [] as Section[],
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
                id: 'bdb1d662-e0f6-428a-8830-befe6b47f320'
              },
              {
                id: '7c765036-aebc-11ec-b909-0242ac120002'
              },
              {
                id: '9260a554-aebc-11ec-b909-0242ac120002'
              }
            ]
          },
          {
            title: 'Week 2',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula tellus non ligula hendrerit interdum. Suspendisse sit amet erat vitae urna mattis sodales. Nullam consequat sagittis tellus. In et justo ex. Suspendisse tempor auctor blandit. Sed vel est eu felis vehicula varius id non ante. Morbi lacinia dolor ac nunc malesuada, dictum imperdiet ligula pellentesque.',
            unitList: [
              {
                id: '9e8ceb9e-aebc-11ec-b909-0242ac120002'
              },
              {
                id: 'a2e6f7a2-aebc-11ec-b909-0242ac120002'
              }
            ]
          }
        ]
      } as Syllabus
    }
  },
  methods: {
    addContentBlock () {
      this.syllabus.courseList.push({
        title: '',
        description: '',
        unitList: []
      })
    },
    removeContentBlock (course: SyllabusCourse) {
      const index = this.syllabus.courseList.indexOf(course)
      this.lastDeletedCourse = { index, course }
      this.syllabus.courseList.splice(index, 1);
    },
    closeNotification () {
      this.lastDeletedCourse = undefined
    },
    submitForm () {
      // TODO: add logic for submitting form
    },
    undoDeleteAction () {
      if (!this.lastDeletedCourse) {
        return
      }

      const index = this.lastDeletedCourse.index
      this.syllabus.courseList.splice(index, 0, this.lastDeletedCourse.course);
      this.lastDeletedCourse = undefined
    },
    syllabusInfoChanged (data: Syllabus) {
      this.syllabus = data
    },
    courseInfoChanged (data: SyllabusCourse, index: number) {
      console.log(data)
      this.syllabus.courseList[index] = data
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/mq.scss';
@import '~/../scss/mixins/mixins.scss';
@import '~/../scss/variables/colors.scss';

.syllabus-form {
  margin-top: $spacing-06;

  &__tab {
    --cds-interactive-01: #{$border-color-secondary};
    max-width: 6rem;
  }

  &__add-content {
    display: flex;
    padding: $spacing-03 $spacing-05;
    background-color: $background-color-lighter;
    margin-bottom: $spacing-05;
    &__link {
      color: $text-active-color;
      @include type-style('body-long-01');
    }
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    padding-top: $spacing-05;

    &__cancel {
      display: flex;
      justify-content: space-between;
      padding: $spacing-05;
      background-color: $background-color-lighter;
      margin-right: $spacing-05;

      :deep() > .app-cta__icon {
        transform: rotate(180deg);
      }
    }

    &__container {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding: $spacing-07 0;
    }
  }
}
</style>
