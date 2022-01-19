<template>
  <textarea v-model="internalCode" class="code-editor__text-area" @input="textChanged" />
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'

export default defineComponent({
  name: 'CodeArea',
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
  mounted () {
    this.internalCode = this.code
  },
  methods: {
    textChanged () {
      this.$emit('codeChanged', this.internalCode)
    }
  }
})
</script>
