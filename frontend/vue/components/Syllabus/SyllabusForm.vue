<template>
  <section class="syllabus-form">
    <bx-tabs :value="defaultActiveTab">
      <bx-tab id="tab-write" class="syllabus-form__tab" target="panel-write" value="write">
        {{ $translate('Write') }}
      </bx-tab>
    </bx-tabs>
    <div id="panel-write" class="syllabus-form__tab-panel" role="tabpanel" aria-labelledby="tab-write">
      <section class="syllabus-form__section">
        <div class="syllabus-form__row">
          <bx-input
            v-model="courseName"
            class="syllabus-form__input-field"
            name="name"
            placeholder="Please enter the syllabus name"
            label-text="Syllabus name"
            color-scheme="light"
            :required="true"
            @input="updateFormInfo"
          />
        </div>
        <div class="syllabus-form__row">
          <bx-input
            v-model="courseInstructor"
            class="syllabus-form__input-field"
            name="instructor"
            placeholder="Instructor’s name"
            label-text="Instructor"
            color-scheme="light"
            :required="true"
            @input="updateFormInfo"
          />
          <bx-input
            v-model="courseLocation"
            class="syllabus-form__input-field"
            name="location"
            placeholder="Enter the location"
            label-text="Location"
            color-scheme="light"
            :required="true"
            @input="updateFormInfo"
          />
        </div>
        <div class="syllabus-form__row">
          <bx-input
            v-model="courseUniversity"
            class="syllabus-form__input-field"
            name="university"
            placeholder="University name"
            label-text="University"
            color-scheme="light"
            :required="true"
            @input="updateFormInfo"
          />
          <bx-input
            v-model="courseOfficeHours"
            class="syllabus-form__input-field"
            name="courseOfficeHours"
            placeholder="Enter the course office hours"
            label-text="Office hours"
            color-scheme="light"
            :required="true"
            @input="updateFormInfo"
          />
        </div>
        <div class="syllabus-form__row">
          <bx-input
            v-model="courseHours"
            class="syllabus-form__input-field"
            name="courseHours"
            placeholder="Enter the class hours"
            label-text="Class hours"
            color-scheme="light"
            :required="true"
            @input="updateFormInfo"
          />
          <bx-input
            v-model="courseEmail"
            class="syllabus-form__input-field"
            name="email"
            type="email"
            placeholder="Enter the contact email"
            label-text="Email"
            color-scheme="light"
            :required="true"
            @input="updateFormInfo"
          />
        </div>
        <div class="syllabus-form__row syllabus-form__row__save">
          <BasicLink class="syllabus-form__link" v-bind="saveSyllabusInfoLink" @click="saveInfoAction">
            {{ $translate(saveSyllabusInfoLink.label) }}
          </BasicLink>
        </div>
      </section>
      <section class="syllabus-form__section">
        <div class="syllabus-form__row">
          <bx-input
            v-model="moduleTitle"
            class="syllabus-form__input-field"
            name="moduleTitle"
            placeholder="Enter the module title"
            label-text="Content - Use this section to write in content. You can then add Qiskit chapters that correlate, and add more text below."
            color-scheme="light"
            :required="true"
            @input="updateFormContent"
          />
        </div>
        <div class="syllabus-form__row">
          <bx-textarea
            v-model="moduleContent"
            class="syllabus-form__textarea"
            name="moduleContent"
            color-scheme="light"
            placeholder="Enter content"
            @input="updateFormContent"
          />
        </div>
        <div class="syllabus-form__row syllabus-form__row__save">
          <BasicLink class="syllabus-form__link" v-bind="saveSyllabusModuleLink" @click="saveModuleAction">
            {{ $translate(saveSyllabusModuleLink.label) }}
          </BasicLink>
        </div>
      </section>
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

export default defineComponent({
  name: 'SyllabusForm',
  components: {
    BasicLink
  },
  data () {
    return {
      defaultActiveTab: 'write',
      saveSyllabusInfoLink: {
        label: 'Save to syllabus',
        url: '#'
      },
      saveSyllabusModuleLink: {
        label: 'Save content',
        url: '#'
      },
      courseName: '',
      courseInstructor: '',
      courseLocation: '',
      courseUniversity: '',
      courseOfficeHours: '',
      courseHours: '',
      courseEmail: '',
      moduleTitle: '',
      moduleContent: ''
    }
  },
  methods: {
    saveInfoAction () {
      this.saveSyllabusInfoLink.label = 'Saved'
    },
    saveModuleAction () {
      this.saveSyllabusModuleLink.label = 'Saved'
    },
    updateFormInfo () {
      this.saveSyllabusInfoLink.label = 'Save to syllabus'
    },
    updateFormContent () {
      this.saveSyllabusModuleLink.label = 'Save to syllabus'
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
    margin-bottom: $spacing-07;
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

  &__input-field,
  &__textarea {
    padding-bottom: $spacing-05;

    &:not(:last-child) {
      padding-right: $spacing-07;

      @include mq($until: medium) {
        padding-right: initial;
      }
    }
  }

  &__textarea {
    width: 100%;
  }

  &__link {
    color: $text-active-color;
  }
}
</style>
