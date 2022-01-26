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
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/colors.scss';

.code-area {
  & :deep(.CodeMirror) {
    height: 100%;
  }

  & :deep(.CodeMirror-scroll) {
    background-color: $background-color-lighter;
    &:hover .CodeMirror-gutters {
      background-color: $background-color-light;
    }
  }
  & :deep(.CodeMirror-sizer) {
    height: 100%;
    padding-top: $spacing-05;
  }
  & :deep(.CodeMirror-line) {
    padding-left: $spacing-05;
    &:hover {
      background-color: rgba($background-color-light-2, 0.5);
    }
  }
  & :deep(.CodeMirror-linenumber) {
    padding-left: $spacing-04;
    padding-right: $spacing-04;
  }
  & :deep(.CodeMirror-gutters) {
    background-color: $background-color-lighter;
    border-right-color: $border-color-light-2;
  }
  & :deep(.CodeMirror-hscrollbar) {
    width: calc(100% - 13rem);
  }
}
</style>
