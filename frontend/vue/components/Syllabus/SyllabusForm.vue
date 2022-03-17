<template>
  <section class="syllabus-form">
    <bx-tabs :value="defaultActiveTab">
      <bx-tab id="tab-write" class="syllabus-form__tab" target="panel-write" value="write">
        {{ $translate('Write') }}
      </bx-tab>
    </bx-tabs>
    <div id="panel-write" class="syllabus-form__tab-panel" role="tabpanel" aria-labelledby="tab-write">
      <SyllabusFormCourseInfo />
      <SyllabusFormModule />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import 'carbon-web-components/es/components/tabs/tabs.js'
import 'carbon-web-components/es/components/tabs/tab.js'
import 'carbon-web-components/es/components/input/input.js'
import 'carbon-web-components/es/components/textarea/textarea.js'
import BasicLink from '../common/BasicLink.vue'
import SyllabusFormCourseInfo from './SyllabusFormCourseInfo.vue'
import SyllabusFormModule from './SyllabusFormModule.vue'

export default defineComponent({
  name: 'SyllabusForm',
  components: {
    BasicLink,
    SyllabusFormCourseInfo,
    SyllabusFormModule
  },
  data () {
    return {
      defaultActiveTab: 'write',
      saveSyllabusInfoLink: {
        label: 'Save to syllabus',
        url: '#'
      },
      syllabusSaved: false,
      courseName: '',
      courseInstructor: '',
      courseLocation: '',
      courseUniversity: '',
      courseOfficeHours: '',
      courseHours: '',
      courseEmail: ''
    }
  },
  methods: {
    saveInfoAction () {
      this.saveSyllabusInfoLink.label = 'Saved'
      this.syllabusSaved = true
    },
    updateFormInfo () {
      this.saveSyllabusInfoLink.label = 'Save to syllabus'
      this.syllabusSaved = false
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
    --cds-interactive-01: #{$purple-70};
    max-width: 6rem;
  }

  &__section {
    padding: $spacing-07 $spacing-05;
    margin-bottom: $spacing-05;
    background-color: $cool-gray-10;
  }

  &__row {
    display: flex;
    padding-right: $spacing-05;
    @include mq($until: medium) {
      flex-direction: column;
    }

    &__save {
      justify-content: flex-end;
      @include mq($until: medium) {
        flex-direction: row;
      }
    }
  }

  &__input-field {
    padding-bottom: $spacing-05;

    &:not(:last-child) {
      padding-right: $spacing-07;

      @include mq($until: medium) {
        padding-right: initial;
      }
    }
  }

  &__link {
    color: $text-active-color;
    @include type-style('body-long-01');

    &__disabled {
      color: $text-color-dark;
      pointer-events: none;
      &:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
