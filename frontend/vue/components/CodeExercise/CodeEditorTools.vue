<template>
  <div class="code-editors-tools">
    <button @click="copy">
      Copy
    </button>
    <button @click="reset">
      Reset
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'

export default defineComponent({
  name: 'CodeEditorTools',
  components: {
  },
  methods: {
    copy () {
      console.log('copy')
      this.$emit('copy')
    },
    reset () {
      console.log('reset')
      this.$emit('reset')
    }
  }
})
</script>

<style lang="scss" scoped>
.code-exercise {
}
</style>
