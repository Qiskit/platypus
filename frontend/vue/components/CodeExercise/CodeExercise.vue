<template>
  <div class="code-exercise">
    <div ref="initialCodeElement" class="code-exercise__initial-code">
      <slot />
    </div>
    <div class="code-exercise__editor-block">
      <CodeEditor
        class="code-exercise__editor-block__editor"
        :code="code"
        @codeChanged="codeChanged"
        @notebookCopyRequest="notebookCopyRequest"
      />
      <ExerciseActionsBar
        class="code-exercise__editor-block__actions-bar"
        :is-running="isKernelBusy"
        :run-enabled="isKernelReady"
        :grade-enabled="isKernelReady"
        @run="run"
        @grade="grade"
      />
    </div>
    <CodeOutput
      ref="output"
      class="code-exercise__output"
      @running="kernelRunning"
      @finished="kernelFinished"
      @kernelReady="kernelReady"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import CodeEditor from './CodeEditor.vue'
import ExerciseActionsBar from './ExerciseActionsBar.vue'
import CodeOutput from './CodeOutput.vue'

export default defineComponent({
  name: 'CodeExercise',
  components: {
    CodeEditor,
    ExerciseActionsBar,
    CodeOutput
  },
  props: {},
  data () {
    return {
      code: '',
      isKernelBusy: false,
      isKernelReady: false
    }
  },
  mounted () {
    this.code = (this.$refs.initialCodeElement as HTMLDivElement)?.textContent?.trim() ?? ''
  },
  methods: {
    run () {
      const codeOutput: any = this.$refs.output
      codeOutput.requestExecute(this.code)
    },
    grade () {
      /* TBD */
      console.log(`NOT IMPLEMENTED: Grade request from exercise with code: ${this.code}`)
    },
    codeChanged (code: string) {
      this.code = code
    },
    notebookCopyRequest (code: string) {
      /* TBD */
      console.log(`NOT IMPLEMENTED: Requested a notebook copy of code: ${code}`)
    },
    kernelRunning () {
      this.isKernelBusy = true
    },
    kernelFinished () {
      this.isKernelBusy = false
    },
    kernelReady () {
      this.isKernelReady = true
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/colors.scss';

.code-exercise {
  border: 1px solid $border-color;

  &__initial-code {
    display: none;
  }

  &__editor-block {
    background-color: $background-color-lighter;
    position: relative;
    height: 13rem;

    &__tooltip {
      position: relative;
    }

    &__editor {
      height: 100%;
    }
    &__actions-bar {
      position: absolute;
      right: 0;
      bottom: 0;
      z-index: 3;
    }
  }
}
</style>
