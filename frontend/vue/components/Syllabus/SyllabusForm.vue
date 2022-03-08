<template>
  <section class="syllabus-form">
    <bx-tabs :value="defaultActiveTab">
      <bx-tab id="tab-write" class="syllabus-form__tab" target="panel-write" value="write">
        {{ $translate('Write') }}
      </bx-tab>
      <bx-tab id="tab-preview" class="syllabus-form__tab" target="panel-preview" value="preview">
        {{ $translate('Preview') }}
      </bx-tab>
    </bx-tabs>
    <div id="panel-write" class="syllabus-form__tab-panel" role="tabpanel" aria-labelledby="tab-write">
      <section class="syllabus-form__section">
        <div class="syllabus-form__row">
          <bx-input
            class="syllabus-form__input-field"
            name="name"
            placeholder="Please enter the syllabus name"
            label-text="Syllabus name"
            color-scheme="light"
            :required="true"
          />
        </div>
        <div class="syllabus-form__row">
          <bx-input
            class="syllabus-form__input-field"
            name="instructor"
            placeholder="Instructor’s name"
            label-text="Instructor"
            color-scheme="light"
            :required="true"
          />
          <bx-input
            class="syllabus-form__input-field"
            name="location"
            placeholder="Enter the location"
            label-text="Location"
            color-scheme="light"
            :required="true"
          />
        </div>
        <div class="syllabus-form__row">
          <bx-input
            class="syllabus-form__input-field"
            name="university"
            placeholder="University name"
            label-text="University"
            color-scheme="light"
            :required="true"
          />
          <bx-input
            class="syllabus-form__input-field"
            name="office-hours"
            placeholder="Enter the course office hours"
            label-text="Office hours"
            color-scheme="light"
            :required="true"
          />
        </div>
        <div class="syllabus-form__row">
          <bx-input
            class="syllabus-form__input-field"
            name="class-hours"
            placeholder="Enter the class hours"
            label-text="Class hours"
            color-scheme="light"
            :required="true"
          />
          <bx-input
            class="syllabus-form__input-field"
            name="email"
            type="email"
            placeholder="Enter the contact email"
            label-text="Email"
            color-scheme="light"
            :required="true"
          />
        </div>
      </section>
      <section class="syllabus-form__section">
        <div class="syllabus-form__row">
          <bx-input
            class="syllabus-form__input-field"
            name="module-title"
            placeholder="Enter the module title"
            label-text="Content - Use this section to write in content. You can then add Qiskit chapters that correlate, and add more text below."
            color-scheme="light"
            :required="true"
          />
        </div>
        <div class="syllabus-form__row">
          <bx-textarea
            class="syllabus-form__textarea"
            color-scheme="light"
            placeholder="Enter content"
          />
        </div>
      </section>
    </div>
    <div id="panel-preview" class="syllabus-form__tab-panel" role="tabpanel" aria-labelledby="tab-preview">
      <!-- TODO: Update with syllabus preview content -->
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import 'carbon-web-components/es/components/tabs/tabs.js'
import 'carbon-web-components/es/components/tabs/tab.js'
import 'carbon-web-components/es/components/input/input.js'
import 'carbon-web-components/es/components/textarea/textarea.js'

export default defineComponent({
  name: 'SyllabusForm',
  data () {
    return {
      defaultActiveTab: 'write'
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/mq.scss';
@import '~/../scss/mixins/mixins.scss';

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
    @include mq($until: medium) {
      flex-direction: column;
    }
  }

  &__input-field,
  &__textarea {
    padding-right: $spacing-07;
    padding-bottom: $spacing-05;
    @include mq($until: medium) {
      padding-right: initial;
    }
  }

  &__textarea {
    width: 100%;
  }
}
</style>
