<template>
  <div class="scratchpad">
    <p class="scratchpad__description">
      {{ $translate('This is your Python Scratchpad. Use this however you like while you work or copy the code over from the chapter.') }}
    </p>
    <p class="scratchpad__description">
      <strong>{{ $translate('Note') }}: </strong>{{ $translate('Code in the scratchpad will not be saved.') }}
    </p>
    <div class="scratchpad__editor-block">
      <CodeEditor
        class="scratchpad__editor-block__editor"
        :code="code"
        :notebook-enabled="false"
        @codeChanged="codeChanged"
      />
      <ExerciseActionsBar
        class="scratchpad__editor-block__actions-bar"
        :is-running="isKernelBusy"
        :run-enabled="isKernelReady"
        :grade-enabled="isKernelReady && isGradingExercise"
        @run="run"
      />
    </div>
    <CodeOutput
      ref="output"
      @running="kernelRunning"
      @finished="kernelFinished"
      @kernelReady="kernelReady"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import CodeEditor from '../CodeExercise/CodeEditor.vue'
import ExerciseActionsBar from '../CodeExercise/ExerciseActionsBar.vue'
import CodeOutput from '../CodeExercise/CodeOutput.vue'

const INITIAL_CODE = `# This is your python scratchpad.
# Use this however you like while you work
# or copy the code over from the chapter


`

type notebookCopyRequestEvent = Event & { detail: { code: string } }

@Options({
  components: {
    CodeEditor,
    ExerciseActionsBar,
    CodeOutput
  }
})
export default class Scratchpad extends Vue {
  code = INITIAL_CODE
  isKernelBusy = false
  isKernelReady = false
  isGradingExercise = false

  mounted () {
    window.addEventListener(
      'notebookCopyRequest',
      (ev: Event) => {
        const { detail } = ev as notebookCopyRequestEvent
        const newCode = this.code === INITIAL_CODE ? `${detail.code}\n` : `${this.code}\n${detail.code}\n`
        this.codeChanged(newCode)
      }
    )
  }

  codeChanged (code: string) {
    this.code = code
  }

  run () {
    const codeOutput: any = this.$refs.output
    codeOutput.requestExecute(this.code)
  }

  kernelRunning () {
    this.isKernelBusy = true
  }

  kernelFinished () {
    this.isKernelBusy = false
  }

  kernelReady () {
    this.isKernelReady = true
  }
}
</script>

<style scoped lang="scss">
@import 'carbon-components/scss/globals/scss/typography';

.scratchpad {
  &__description {
    @include type-style('body-short-01');
    margin-bottom: $spacing-05;
  }

  &__editor-block {
    position: relative;
    &__actions-bar {
      position: absolute;
      right: 0;
      bottom: 0;
      z-index: 3;
    }
  }
}
</style>
