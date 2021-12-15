<template>
  <div class="exercise-result">
    asdasd
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'

export default defineComponent({
  name: 'ExerciseResult',
  components: {
  },
  props: {
    code: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      internalCode: ''
    }
  },
  watch: {
    code (newVal) {
      this.internalCode = newVal
    }
  },
  methods: {
    textChanged () {
      console.log(this.internalCode)
      this.$emit('codeChanged', this.internalCode)
    }
  }
})
</script>

<style lang="scss" scoped>
.code-exercise {
}
</style>
