<template>
  <div class="exercise-actions-bar">
    <button @click="run">
      Run
    </button>
    <button @click="grade">
      Grade
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'

export default defineComponent({
  name: 'ExerciseActionsBar',
  components: {
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
