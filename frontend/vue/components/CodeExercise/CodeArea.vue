<template>
  <div ref="codeAreaWrapper" class="code-area" />
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { basicSetup } from 'codemirror'
import { EditorView, keymap } from '@codemirror/view'
import { EditorState, StateField } from '@codemirror/state'
import { defaultKeymap, indentWithTab } from '@codemirror/commands'
import { python } from '@codemirror/lang-python'

export default defineComponent({
  name: 'CodeArea',
  props: {
    code: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      editor: undefined as EditorView | undefined
    }
  },
  watch: {
    code (newVal: string) {
      const editor = this.editor! as EditorView
      const newValAsText = editor.state.toText(newVal)
      if (editor.state.doc.eq(newValAsText)) {
        return
      }

      editor.dispatch({
        changes: {
          from: 0,
          to: editor.state.doc.length,
          insert: newValAsText
        }
      })
    }
  },
  mounted () {
    const emit = this.$emit
    const parentHTMLElement = this.$refs.codeAreaWrapper as HTMLDivElement
    const docChanged = StateField.define({
      create (state) {
        return state.sliceDoc()
      },
      update (value, tr) {
        if (tr.docChanged) {
          const newCode = tr.state.sliceDoc()
          emit('codeChanged', newCode)
        }
      }
    })
    const state = EditorState.create({
      doc: this.code,
      extensions: [
        basicSetup,
        python(),
        docChanged,
        keymap.of([
          ...defaultKeymap,
          indentWithTab
        ])
      ]
    })
    this.editor = new EditorView({
      state,
      parent: parentHTMLElement
    })
  }
})
</script>

<style lang="scss">
@import 'carbon-components/scss/globals/scss/spacing';
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/colors.scss';

.code-area .cm-editor {
  .cm- {
    &scroller {
      background-color: $background-color-lighter;
      &::-webkit-scrollbar {
        width: 0.4rem;
        height: 0.4rem;
      }
    }
    &content {
      @include type-style('code-01');
      padding: $spacing-08 0;
      min-height: 6rem;
    }
    &gutters {
      @include type-style('code-01');
      background-color: $background-color-lighter;
    }
    &activeLine {
      background-color: rgba($background-color-light-2, 0.2);
    }
    &activeLineGutter {
      background-color: rgba($background-color-light-2, 0.5);
    }
    &line:hover {
      background-color: rgba($background-color-light-2, 0.5);
      cursor: text;
    }
  }

  &:hover .cm- {
    &gutters {
      background-color: $background-color-light;
    }
  }
}
</style>
