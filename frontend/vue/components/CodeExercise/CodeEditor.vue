<template>
  <div class="code-editor">
    <CodeEditorTools class="code-editor__tools" @copy="copy" @reset="reset" />
    <textarea ref="textArea" v-model="internalCode" class="code-editor__text-area" @input="textChanged" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import CodeEditorTools from './CodeEditorTools.vue'

export default defineComponent({
  name: 'CodeExercise',
  components: {
    CodeEditorTools
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
  mounted () {
    this.internalCode = this.code
  },
  methods: {
    copy () {
      console.log('copy from editor')
    },
    reset () {
      console.log('reset from reset')
    },
    textChanged () {
      this.$emit('codeChanged', this.internalCode)
    }
  }
})
</script>

<style lang="scss" scoped>
.code-editor {
  &__text-area {
    width: 100%;
    height: 8rem;
  }
}
</style>
