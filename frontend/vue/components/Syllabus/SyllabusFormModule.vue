<template>
  <section class="syllabus-form-module">
    <bx-btn
      v-if="showCloseButton"
      class="syllabus-form-module__delete"
      kind="ghost"
      @click="removeFormModule(moduleId)"
    >
      <Close16 class="syllabus-form-module__delete__icon" />
    </bx-btn>
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
    <div class="syllabus-form-module__row">
      <label class="syllabus-form-module__label">
        Chapters - Click to add qiskit chapters you want show in this section.
      </label>
    </div>
    <div class="syllabus-form-module__row syllabus-form-module__courses__container">
      <div v-for="course in courseList" :key="course.id">
        <h4 class="syllabus-form-module__courses__header">
          {{ course.title }}
        </h4>
        <ColumnFlowGrid class="syllabus-form-module__courses__list" :elements="course.sections">
          <template #default="slotProps">
            <bx-checkbox :label-text="slotProps.element.title" @input="updateFormModule" />
          </template>
        </ColumnFlowGrid>
      </div>
    </div>
    <div class="syllabus-form-module__row syllabus-form-module__row__save">
      <BasicLink
        class="syllabus-form-module__link"
        :class="{'syllabus-form-module__link__disabled': syllabusSaved}"
        v-bind="saveSyllabusModuleLink"
        @click="saveModuleAction"
      >
        {{ $translate(saveSyllabusModuleLink.label) }}
      </BasicLink>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import Close16 from '@carbon/icons-vue/es/close/16'
import { getCourseList, Course } from '../../../ts/courses'
import BasicLink from '../common/BasicLink.vue'
import ColumnFlowGrid from '../common/ColumnFlowGrid.vue'
import 'carbon-web-components/es/components/button/button.js'
import 'carbon-web-components/es/components/input/input.js'
import 'carbon-web-components/es/components/textarea/textarea.js'
import 'carbon-web-components/es/components/checkbox/checkbox.js'

export default defineComponent({
  name: 'SyllabusFormModule',
  components: {
    BasicLink,
    ColumnFlowGrid,
    Close16
  },
  props: {
    moduleId: {
      type: Number,
      default: undefined,
      required: true
    },
    showCloseButton: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data () {
    return {
      courseList: [] as Course[],
      saveSyllabusModuleLink: {
        label: 'Save content',
        url: '#'
      },
      syllabusSaved: false,
      moduleTitle: '',
      moduleContent: ''
    }
  },
  mounted () {
    getCourseList().then((courses) => {
      this.courseList = courses.filter(course => course.type === 'learning-path')
    })
  },
  methods: {
    saveModuleAction () {
      // TODO: Add proper functionality for persisting module data
      this.saveSyllabusModuleLink.label = 'Saved'
      this.syllabusSaved = true
    },
    updateFormModule () {
      // TODO: Add proper functionality for updating module data
      this.saveSyllabusModuleLink.label = 'Save content'
      this.syllabusSaved = false
    },
    removeFormModule () {
      this.$emit('removeModuleAction')
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
  position: relative;
  margin-top: $spacing-06;
  padding: $spacing-07 $spacing-05;
  margin-bottom: $spacing-05;
  background-color: $background-color-lighter;

  &__delete {
    position: absolute;
    top: 0;
    right: 0;

    &__icon {
      fill: $text-color-dark;
    }
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
    margin-bottom: 0;
  }

  &__textarea {
    width: 100%;
    padding-bottom: $spacing-05;
  }

  &__label {
    @include type-style('label-01');
    margin: $spacing-05 0;
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

  &__courses {
    &__container {
      background-color: $white-0;
      padding: $spacing-05;
      margin-bottom: $spacing-05;
      margin-right: $spacing-05;
      flex-direction: column;
      max-height: 16rem;
      overflow-y: scroll;
    }

    &__list {
      margin-bottom: $spacing-05;
      padding: $spacing-05 0;
      gap: $spacing-05 $spacing-10;
    }

    &__header {
      @include type-style('productive-heading-01');
    }
  }
}
</style>
