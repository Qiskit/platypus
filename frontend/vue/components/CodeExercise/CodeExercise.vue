<template>
  <div class="code-exercise">
    <CodeEditor class="code-exercise__editor" @codeChanged="codeChanged" />
    <ExerciseActionsBar class="code-exercise__actions-bar" @run="run" @grade="grade" />
    <ExerciseResult class="code-exercise__result" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import CodeEditor from './CodeEditor.vue'
import ExerciseActionsBar from './ExerciseActionsBar.vue'
import ExerciseResult from './ExerciseResult.vue'

const serverOptions = {
  bootstrap: false,
  preRenderHook: false,
  stripPrompts: false,
  requestKernel: true,
  predefinedOutput: true,
  mountStatusWidget: true,
  mountActivateWidget: true,
  mathjaxUrl: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js',
  mathjaxConfig: 'TeX-AMS_CHTML-full,Safe',
  selector: '[data-executable]',
  outputSelector: '[data-executable-output]',
  mountRunButton: true,
  mountRestartButton: true,
  mountRestartallButton: true,
  binderOptions: {
    repo: 'qiskit-community/platypus',
    ref: 'binder-env',
    binderUrl: 'https://mybinder.org',
    savedSession: {
      enabled: true,
      maxAge: 86400,
      storagePrefix: 'thebe-binder-'
    }
  },
  codeMirrorconfig: {
    lineWrapping: false
  },
  codeMirrorConfig: {
    theme: 'abcdef',
    mode: 'python'
  },
  kernelOptions: {
    kernelName: 'python3',
    path: '.',
    serverSettings: {
      appendToken: true
    }
  }
}

export default defineComponent({
  name: 'CodeExercise',
  components: {
    CodeEditor,
    ExerciseActionsBar,
    ExerciseResult
  },
  props: {
    code: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    run () {
      console.log('run from exercise')
    },
    grade () {
      console.log('grade from exercise')
    },
    codeChanged () {
      console.log('codeChanged from exercise')
    }
  }
})
</script>

<style lang="scss" scoped>
.code-exercise {
}
</style>
