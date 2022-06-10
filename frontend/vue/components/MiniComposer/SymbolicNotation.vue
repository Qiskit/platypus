<template>
  <div
    ref="outputRef"
    class="symbolic-notation"
  />
</template>

<script lang="ts">
import { ref } from '@vue/reactivity'
import { Vue, prop } from 'vue-class-component'

class Props {
  tex = prop<String>({ default: '', required: true })
}

declare global {
  interface Window {
    MathJax: any
  }
}

export default class SymbolicNotation extends Vue.with(Props) {
  outputRef = ref<HTMLDivElement | null>(null)
  get output () { return (this.outputRef as unknown as HTMLDivElement) }

  mounted () {
    this.renderTex()
    this.$watch('tex', () => this.renderTex())
  }

  renderTex () {
    require('mathjax-full/es5/tex-chtml.js')

    const MathJax = window.MathJax
    const output = this.output

    MathJax.startup.promise.then(() => {
      MathJax.texReset()
      const options = {
        ...MathJax.getMetricsFor(output),
        ...{ display: true }
      }
      MathJax
        .tex2chtmlPromise(this.tex, options)
        .then((node: HTMLElement) => {
          output.childNodes.forEach((child) => {
            child.remove()
          })
          output.appendChild(node)
          MathJax.startup.document.clear()
          MathJax.startup.document.updateDocument()
        }).catch((err: Error) => {
          // If there was an error, put the message into the output instead
          output.appendChild(document.createElement('pre')).appendChild(document.createTextNode(err.message))
        })
    })
  }
}
</script>

<style scoped lang="scss">
.symbolic-notation {
  width: 100%;
}
</style>
