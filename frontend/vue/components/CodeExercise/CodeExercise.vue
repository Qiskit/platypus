<template>
  <div class="code-exercise">
    <div class="code-exercise__editor-block">
      <CodeEditor
        class="code-exercise__editor-block__editor"
        :code="code"
        :initial-code="initialCode"
        :notebook-enabled="false"
        @codeChanged="codeChanged"
        @notebookCopyRequest="notebookCopyRequest"
      />
      <ExerciseActionsBar
        class="code-exercise__editor-block__actions-bar"
        :is-running="isKernelBusy"
        :run-enabled="isKernelReady"
        :grade-enabled="isKernelReady && isGradingExercise"
        @run="run"
        @grade="grade"
      />
    </div>
    <CodeOutput
      ref="output"
      @running="kernelRunning"
      @finished="kernelFinished"
      @kernelReady="kernelReady"
    />
    <div
      ref="initialCodeElement"
      class="code-exercise__initial-code"
      :class="{'code-exercise__initial-code__hidden-output': executedOnce}"
    >
      <slot />
    </div>
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
  props: {
    graderImport: {
      type: String,
      required: false,
      default: ''
    },
    graderFunction: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      code: '',
      initialCode: '',
      isKernelBusy: false,
      isKernelReady: false,
      executedOnce: false
    }
  },
  computed: {
    isGradingExercise (): boolean {
      return this.graderFunction !== '' && this.graderImport !== ''
    }
  },
  mounted () {
    const slotWrapper = (this.$refs.initialCodeElement as HTMLDivElement)
    const initialCodeElement = slotWrapper.getElementsByTagName('pre')[0]
    this.code = initialCodeElement?.textContent?.trim() ?? ''
    this.initialCode = this.code
  },
  methods: {
    run () {
      const codeOutput: any = this.$refs.output
      codeOutput.requestExecute(this.code)
    },
    grade () {
      const codeOutput: any = this.$refs.output
      const wrappedCode: string = this.graderImport + '\n' + this.code + '\n' + this.graderFunction
      codeOutput.requestExecute(wrappedCode)
    },
    codeChanged (code: string) {
      this.code = code
    },
    notebookCopyRequest (code: string) {
      /* TODO */
      console.log(`NOT IMPLEMENTED: Requested a notebook copy of code: ${code}`)
    },
    kernelRunning () {
      this.isKernelBusy = true
      this.executedOnce = true
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
@import 'carbon-components/scss/globals/scss/spacing';
@import '~/../scss/variables/colors.scss';

.code-exercise {
  border: 1px solid $border-color;
  margin: $spacing-07 0;

  &__initial-code {
    & > :deep(pre) {
      display: none;
    }

    &__hidden-output {
      & > :deep(output) {
        display: none;
      }
    }
  }

  &__editor-block {
    background-color: $background-color-lighter;
    position: relative;
    height: 13rem;

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
