<template>
  <div class="code-exercise">
    <div class="code-exercise__editor-block">
      <CodeEditor
        class="code-exercise__editor-block__editor"
        :code="code"
        :initial-code="initialCode"
        :scratchpad-enabled="true"
        @codeChanged="codeChanged"
        @scratchpadCopyRequest="scratchpadCopyRequest"
      />
      <ExerciseActionsBar
        class="code-exercise__editor-block__actions-bar"
        :is-running="isKernelBusy"
        :is-api-token-needed="isApiTokenNeeded"
        :run-enabled="isKernelReady"
        :grade-enabled="isKernelReady && isGradingExercise"
        @run="run"
        @grade="grade"
      />
    </div>
    <div v-if="isApiTokenNeeded" class="code-exercise__api-token-info">
      <WarningIcon />
      <div>
        This code is executed on real hardware using an IBM Quantum provider. Setup your API-token in
        <BasicLink url="/account/admin">
          your account
        </BasicLink>
        to execute this code cell.
      </div>
    </div>
    <CodeOutput
      ref="output"
      @running="kernelRunning"
      @finished="kernelFinished"
      @kernelReady="kernelReady"
      @correctAnswer="gradeSuccess"
    />
    <div
      ref="initialCodeElement"
      class="code-exercise__initial-code jp-OutputArea"
      :class="{'code-exercise__initial-code__hidden-output': hideInitialOutput}"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import WarningIcon from '@carbon/icons-vue/lib/warning--alt/32'
import BasicLink from '../common/BasicLink.vue'
import CodeEditor from './CodeEditor.vue'
import ExerciseActionsBar from './ExerciseActionsBar.vue'
import CodeOutput from './CodeOutput.vue'

declare global {
  interface Window {
    textbook: any
  }
}

let lastId = 1
const pageRoute = window.location.pathname

export default defineComponent({
  name: 'CodeExercise',
  components: {
    CodeEditor,
    ExerciseActionsBar,
    CodeOutput,
    BasicLink,
    WarningIcon
  },
  props: {
    goal: {
      type: String,
      required: false,
      default: ''
    },
    graderImport: {
      type: String,
      required: false,
      default: ''
    },
    graderFunction: {
      type: String,
      required: false,
      default: ''
    },
    graderId: {
      type: String,
      required: false,
      default: ''
    },
    graderAnswer: {
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
      hideInitialOutput: false,
      isApiTokenNeeded: false,
      id: 0
    }
  },
  computed: {
    isGradingExercise (): boolean {
      return (this.graderFunction !== '' && this.graderImport !== '') ||
        (this.graderId !== '' && this.graderAnswer !== '')
    }
  },
  mounted () {
    const slotWrapper = (this.$refs.initialCodeElement as HTMLDivElement)
    const initialCodeElement = slotWrapper.getElementsByTagName('pre')[0]
    const initialOutput = slotWrapper.getElementsByTagName('output')
    this.codeChanged(initialCodeElement?.textContent?.trim() ?? '')
    this.initialCode = this.code
    this.id = lastId++
    if (initialOutput.length === 0) {
      this.hideInitialOutput = true
    }
  },
  methods: {
    run (onHardware: boolean) {
      const codeOutput: any = this.$refs.output
      codeOutput.requestExecute(this.code)
      const cta = onHardware ? 'Run (Hardware)' : 'Run'
      window.textbook.trackClickEvent(cta, `Code cell #${this.id}, ${pageRoute}`)
    },
    grade () {
      const codeOutput: any = this.$refs.output
      let wrappedCode: string = this.code
      if (this.graderImport && this.graderFunction) {
        wrappedCode = this.graderImport + '\n' + this.code + '\n' + this.graderFunction
      } else if (this.graderAnswer && this.graderId.includes('/')) {
        const [challengeId, exerciseId] = this.graderId.split('/')
        wrappedCode = 'from qc_grader.grader.grade import grade\n' +
          this.code + '\n' +
          `grade(${this.graderAnswer}, '${exerciseId}', '${challengeId}')`
      }
      codeOutput.requestExecute(wrappedCode)
      window.textbook.trackClickEvent('Grade', `Code cell #${this.id}, ${this.goal}, ${pageRoute}`)
    },
    gradeSuccess () {
      if (this.goal) {
        this.$step?.score(this.goal as string)
      }
    },
    codeChanged (code: string) {
      this.code = code
      const codeOutput: any = this.$refs.output
      codeOutput.needsApiToken(this.code).then((isNeeded: boolean) => {
        this.isApiTokenNeeded = isNeeded
      })
    },
    scratchpadCopyRequest (code: string) {
      const scratchpadCopyRequestEvent = new CustomEvent('scratchpadCopyRequest', {
        bubbles: true,
        detail: { code }
      })

      window.textbook.trackClickEvent('Copy to Scratchpad', `Code cell #${this.id}, ${pageRoute}`)
      window.dispatchEvent(scratchpadCopyRequestEvent)
    },
    kernelRunning () {
      this.isKernelBusy = true
      this.hideInitialOutput = true
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
@import 'carbon-components/scss/globals/scss/typography';
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

  &__api-token-info {
    @include type-style('body-long-01');
    display: flex;
    flex-flow: row;
    padding: $spacing-05;
    gap: $spacing-05;
  }
}
</style>
