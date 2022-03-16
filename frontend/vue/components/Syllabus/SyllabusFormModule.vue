<template>
  <section class="syllabus-form-module">
    <div class="syllabus-form-module__row">
      <bx-input
        v-model="moduleTitle"
        class="syllabus-form-module__input-field"
        name="moduleTitle"
        placeholder="Enter the module title"
        label-text="Content - Use this section to write in content. You can then add Qiskit chapters that correlate, and add more text below."
        color-scheme="light"
        :required="true"
        @input="updateFormModule"
      />
    </div>
    <div class="syllabus-form-module__row">
      <bx-textarea
        v-model="moduleContent"
        class="syllabus-form-module__textarea"
        name="moduleContent"
        color-scheme="light"
        placeholder="Enter content"
        @input="updateFormModule"
      />
    </div>
    <div class="syllabus-form-module__row syllabus-form-module__row__save">
      <BasicLink
        class="syllabus-form-module__link"
        :class="{'syllabus-form-module__link__disabled': syllabusSaved}"
        v-bind="saveSyllabusModuleLink"
        @click="saveModuleAction">
        {{ $translate(saveSyllabusModuleLink.label) }}
      </BasicLink>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import 'carbon-web-components/es/components/input/input.js'
import 'carbon-web-components/es/components/textarea/textarea.js'
import BasicLink from '../common/BasicLink.vue'

export default defineComponent({
  name: 'SyllabusFormModule',
  components: {
    BasicLink
  },
  data () {
    return {
      saveSyllabusModuleLink: {
        label: 'Save content',
        url: '#'
      },
      syllabusSaved: false,
      moduleTitle: '',
      moduleContent: ''
    }
  },
  methods: {
    saveModuleAction () {
      this.saveSyllabusModuleLink.label = 'Saved'
      this.syllabusSaved = true
    },
    updateFormModule () {
      this.saveSyllabusModuleLink.label = 'Save to syllabus'
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

.syllabus-form-module {
  margin-top: $spacing-06;
  padding: $spacing-07 $spacing-05;
  margin-bottom: $spacing-07;
  background-color: $cool-gray-10;

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
