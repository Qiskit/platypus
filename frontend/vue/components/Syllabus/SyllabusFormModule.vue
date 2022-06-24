<template>
  <section class="syllabus-form-course">
    <bx-btn
      v-if="showCloseButton"
      class="syllabus-form-course__delete"
      kind="ghost"
      @click="removeFormModule(courseId)"
    >
      <Close16 class="syllabus-form-course__delete__icon" />
    </bx-btn>
    <div class="syllabus-form-course__row">
      <bx-input
        :value="course.title"
        class="syllabus-form-course__input-field"
        name="courseTitle"
        placeholder="Enter the section title"
        label-text="Content - Use this section to write in content. You can then add Qiskit chapters that correlate, and add more text below."
        color-scheme="light"
        :required="true"
        @input="updateFormTitle"
      />
    </div>
    <div class="syllabus-form-course__row">
      <ckeditor
        v-model="editorData"
        :editor="editor"
        :config="editorConfig"
        @input="updateFormDescription"
        @ready="onEditorReady(course.description)"
      />
    </div>
    <div class="syllabus-form-course__row">
      <label class="syllabus-form-course__label">
        Chapters - Click to add qiskit chapters you want show in this section.
      </label>
    </div>
    <div class="syllabus-form-course__row syllabus-form-course__units__container">
      <div v-for="course in courseList" :key="course.id">
        <h4 class="syllabus-form-course__units__header">
          {{ course.title }}
        </h4>
        <ColumnFlowGrid class="syllabus-form-course__units__list" :elements="course.sections">
          <template #default="slotProps">
            <bx-checkbox
              :checked="containsUnitID(slotProps.element.uuid)"
              :label-text="slotProps.element.title"
              @bx-checkbox-changed="ev => updateFormModuleUnit(slotProps.element.uuid, ev)"
            />
          </template>
        </ColumnFlowGrid>
      </div>
    </div>
    <div class="syllabus-form-course__row syllabus-form-course__row__save">
      <BasicLink
        class="syllabus-form-course__link"
        :class="{'syllabus-form-course__link__disabled': syllabusSaved}"
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
import BXTextarea from 'carbon-web-components/es/components/textarea/textarea.js'
import BXCheckbox from 'carbon-web-components/es/components/checkbox/checkbox.js'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import CKEditor from '@ckeditor/ckeditor5-vue'
import { getCourseList, Course } from '../../../ts/courses'
import BasicLink from '../common/BasicLink.vue'
import ColumnFlowGrid from '../common/ColumnFlowGrid.vue'
import 'carbon-web-components/es/components/button/button.js'
import 'carbon-web-components/es/components/input/input.js'
import { SyllabusCourse } from '../../../ts/syllabus'

export default defineComponent({
  name: 'SyllabusFormModule',
  components: {
    BasicLink,
    ColumnFlowGrid,
    Close16,
    ckeditor: CKEditor.component
  },
  props: {
    course: {
      type: Object,
      default: () => ({} as SyllabusCourse),
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
      editor: ClassicEditor,
      editorData: '<p>this is the editor data</p>',
      editorConfig: {
        toolbar: ['bold', 'italic', 'link', 'undo', 'redo', 'numberedList', 'bulletedList'],
        placeholder: 'Enter content',
        style: {
          height: '400px'
        }
      }
    }
  },
  mounted () {
    getCourseList().then((courses) => {
      this.courseList = courses.filter(course => course.type !== 'docs')
    })
  },
  methods: {
    containsUnitID (uuid: string) {
      return this.course.unitList.includes(uuid)
    },
    saveModuleAction () {
      // TODO: Add proper functionality for persisting course data
      this.saveSyllabusModuleLink.label = 'Saved'
      this.syllabusSaved = true
    },
    updateFormTitle (event: InputEvent) {
      this.saveSyllabusModuleLink.label = 'Save content'
      this.syllabusSaved = false

      const newData = {
        ...this.course,
        ...{ title: (event.target as BXTextarea).value }
      }

      this.$emit('change', newData)
    },
    updateFormDescription (event: InputEvent) {
      this.saveSyllabusModuleLink.label = 'Save content'
      this.syllabusSaved = false

      const newData = {
        ...this.course,
        ...{ description: this.editorData }
      }

      this.$emit('change', newData)
    },
    onEditorReady (event: any) {
      this.editorData = event
    },
    updateFormModuleUnit (uuid: string, event: Event) {
      if ((event.target as BXCheckbox).checked) {
        this.course.unitList.push(uuid)
      } else {
        const idx = this.course.unitList.indexOf(uuid)
        if (idx >= 0) {
          this.course.unitList.splice(idx, 1)
        }
      }

      this.$emit('change', this.course)
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

$min-editor-height: 10rem;

.syllabus-form-course {
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

  &__editor {
    width: 100%;
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

  &__units {
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

  // CKEditor overrides
  :deep(.ck.ck-editor) {
    width: 100%;

    p, a, ol, ul {
      @include type-style('body-long-01');
    }

    i {
      font-style: italic;
    }

    ol {
      list-style: decimal;
      margin-left: $spacing-05;
    }

    ul {
      list-style: disc;
      margin-left: $spacing-05;
    }
  }

  :deep(.ck-editor__editable) {
    min-height: $min-editor-height;
  }
}
</style>
