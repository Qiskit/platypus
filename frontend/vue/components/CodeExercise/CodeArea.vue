<template>
  <div ref="codeAreaWrapper" class="code-area" />
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { createEditor, getEditor } from './CodeMirrorEditor'

export default defineComponent({
  name: 'CodeArea',
  props: {
    code: {
      type: String,
      required: false,
      default: ''
    }
  },
  watch: {
    code (newVal) {
      const editor: any = getEditor(this)
      if (editor.getValue() === newVal) {
        return
      }

      editor.setValue(newVal)
    }
  },
  mounted () {
    const editor: any = createEditor(this, this.$refs.codeAreaWrapper as HTMLDivElement)

    editor.on('change', () => {
      const newCode = editor.getValue()
      this.$emit('codeChanged', newCode)
    })
  }
})
</script>

<style lang="scss" scoped>
@import '~/../scss/variables/colors.scss';

.code-area {
  & ::v-deep(.CodeMirror) {
    height: 100%;
  }

  & ::v-deep(.CodeMirror-scroll) {
    background-color: $background-color-lighter;
    &:hover .CodeMirror-gutters {
      background-color: $background-color-light;
    }
  }
  & ::v-deep(.CodeMirror-sizer) {
    height: 100%;
    padding-top: 16px;
  }
  & ::v-deep(.CodeMirror-line) {
    z-index: auto;

    &:hover {
      background-color: $background-color-light;
    }
  }
  & ::v-deep(.CodeMirror-gutters) {
    background-color: $background-color-lighter;
    border-right-color: $border-color-light-2;
  }
  & ::v-deep(.CodeMirror-hscrollbar) {
    width: calc(100% - 12rem);
  }
}
</style>
