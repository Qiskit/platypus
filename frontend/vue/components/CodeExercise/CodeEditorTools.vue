<template>
  <div class="code-editors-tools">
    <button v-if="resetEnabled" class="code-editors-tools__button" @click="reset">
      <ResetIcon />
    </button>
    <button v-if="notebookEnabled" class="code-editors-tools__button" @click="notebook">
      <NotebookIcon />
    </button>
    <CodeMirrorClipboardCopy :text="copyText" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
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

.code-editors-tools {
  display: flex;
  justify-content: flex-end;
  padding: $spacing-02 0;

  &__button {
    padding: $spacing-03;
  }
}
</style>
