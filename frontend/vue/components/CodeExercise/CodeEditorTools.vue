<template>
  <div class="code-editors-tools">
    <button v-if="resetEnabled" class="code-editors-tools__button" @click="reset">
      <bx-tooltip-icon aligment="center" direction="top" body-text="Reset cell to initial content">
        <ResetIcon class="code-editors-tools__button__icon" />
      </bx-tooltip-icon>
    </button>
    <button v-if="notebookEnabled" class="code-editors-tools__button" @click="notebook">
      <bx-tooltip-icon aligment="center" direction="top" body-text="Copy to notebook notes">
        <NotebookIcon class="code-editors-tools__button__icon" />
      </bx-tooltip-icon>
    </button>
    <CodeMirrorClipboardCopy :text="copyText" />
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
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/colors.scss';

.code-editors-tools {
  display: flex;
  justify-content: flex-end;
  padding: $spacing-02 0;

  &__button {
    padding: $spacing-03;

    &__icon {
      color: $text-color-light;
    }

    &:focus #{&}__icon ,
    &:hover #{&}__icon  {
      color: $active-color;
    }
  }
}
</style>
