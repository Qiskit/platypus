<template>
  <div class="exercise-actions-bar">
    <!-- AppCta
      class="exercise-actions-bar__run-button"
      label="Run"
      @click="run()"
    />
    <AppCta
      class="exercise-actions-bar__grade-button"
      label="Grade"
      @click="grade()"
    /-->
    <button @click="run()">Run</button>
    <button @click="grade()">Grade</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
// import AppCta from '../common/AppCta.vue'

export default defineComponent({
  name: 'ExerciseActionsBar',
  components: {
    // AppCta
  },
  methods: {
    run () {
      console.log('run')
      this.$emit('run')
    },
    grade () {
      console.log('grade')
      this.$emit('grade')
    }
  }
})
</script>

<style lang="scss" scoped>
.code-exercise {
}
</style>
