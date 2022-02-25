<template>
  <div class="code-editors-tools">
    <div v-if="resetEnabled" class="code-editors-tools__button">
      <bx-tooltip-icon
        class="code-editors-tools__button__tooltip"
        aligment="center"
        direction="top"
        :body-text="$translate('Reset cell to initial content')"
        @click="reset"
      >
        <ResetIcon class="code-editors-tools__button__icon" />
      </bx-tooltip-icon>
    </div>
    <div v-if="notebookEnabled" class="code-editors-tools__button">
      <bx-tooltip-icon
        class="code-editors-tools__button__tooltip"
        aligment="center"
        direction="top"
        :body-text="$translate('Copy to notebook notes')"
        @click="notebook"
      >
        <NotebookIcon class="code-editors-tools__button__icon" />
      </bx-tooltip-icon>
    </div>
    <CodeMirrorClipboardCopy class="code-editors-tools__button" :text="copyText" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import 'carbon-web-components/es/components/tooltip/tooltip-icon'
import ResetIcon from '@carbon/icons-vue/lib/reset/20'
import NotebookIcon from '@carbon/icons-vue/lib/notebook/20'
import CodeMirrorClipboardCopy from '../CodeMirrorClipboardCopy/CodeMirrorClipboardCopy.vue'

export default defineComponent({
  name: 'CodeEditorTools',
  components: {
    ResetIcon,
    CodeMirrorClipboardCopy,
    NotebookIcon
  },
  props: {
    copyText: {
      type: String,
      required: false,
      default: ''
    },
    copyEnabled: {
      type: Boolean,
      required: false,
      default: true
    },
    resetEnabled: {
      type: Boolean,
      required: false,
      default: true
    },
    notebookEnabled: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  methods: {
    reset () {
      this.$emit('reset')
    },
    notebook () {
      this.$emit('notebook')
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/spacing';
@import '~/../scss/variables/colors.scss';

.code-editors-tools {
  display: flex;
  justify-content: flex-end;
  padding: $spacing-02;
  background-color: rgba($background-color-lighter, 0.75);

  &__button {
    padding: $spacing-02;
    margin: $spacing-02;
    cursor: pointer;

    &__tooltip {
      display: flex;
    }

    &__icon {
      color: $text-color-light;
    }

    &:hover {
      background-color: rgba($background-color-light-2, 0.75);
    }
    &:hover #{&}__icon  {
      color: $active-color;
    }
  }
}
</style>
