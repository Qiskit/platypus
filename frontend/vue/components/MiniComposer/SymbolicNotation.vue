<template>
  <div
    ref="outputRef"
    class="symbolic-notation"
  >
    <!--VueMathjax :formula="'$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$'" /-->
  </div>
</template>

<script lang="ts">
import { ref } from '@vue/reactivity'
import { Vue } from 'vue-class-component'
import 'mathjax-full/es5/tex-chtml.js'

declare global {
  interface Window {
    MathJax: any
  }
}

export default class SymbolicNotation extends Vue {
  outputRef = ref<HTMLDivElement | null>(null)
  get output () { return (this.outputRef as unknown as HTMLDivElement) }

  mounted () {
    const MathJax = window.MathJax
    const output = this.output

    MathJax.startup.promise.then(() => {
      MathJax.texReset()
      const options = MathJax.getMetricsFor(output)
      options.display = true
      MathJax
        .tex2chtmlPromise('x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}', options)
        .then((node: any) => {
          console.log('NODE: ', node)
          //
          //  The promise returns the typeset node, which we add to the output
          //  Then update the document to include the adjusted CSS for the
          //    content of the new equation.
          //
          output.appendChild(node)
          MathJax.startup.document.clear()
          MathJax.startup.document.updateDocument()
        }).catch((err: Error) => {
          //
          //  If there was an error, put the message into the output instead
          //
          output.appendChild(document.createElement('pre')).appendChild(document.createTextNode(err.message))
        })
    })
  }
}
</script>
