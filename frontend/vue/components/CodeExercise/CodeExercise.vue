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
