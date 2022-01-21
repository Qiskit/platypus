<template>
  <div ref="outputDiv" class="code-output">
    <div class="code-output__state-info">
      <div v-if="!kernel" class="code-output__state-info__connecting-kernel">
        Connecting to the server
      </div>
      <div v-if="running" class="code-output__state-info__running-code">
        Running code
      </div>
      <div v-if="error !== ''" class="code-output__state-info__running-code">
        Failed to execute. {{ error }} Please refresh the page.
      </div>
    </div>
    <div ref="outputDiv" class="code-output__output-renderer" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { OutputArea, IOutputShellFuture, createOutputArea } from './OutputRenderer'
import { requestBinderKernel, IKernelConnection } from './KernelManager'

export default defineComponent({
  name: 'CodeOutput',
  data () {
    return {
      kernelPromise: undefined as Promise<IKernelConnection> | undefined,
      kernel: undefined as IKernelConnection | undefined,
      outputArea: undefined as OutputArea | undefined,
      error: '',
      running: false
    }
  },
  mounted () {
    this.kernelPromise = requestBinderKernel()

    this.kernelPromise.then((kernel: IKernelConnection) => {
      this.kernel = kernel
    })

    const outputDivRef = (this.$refs.outputDiv as HTMLDivElement)

    this.outputArea = createOutputArea(outputDivRef)
  },
  methods: {
    requestExecute (code: string) {
      this.error = ''
      this.kernelPromise!.then((kernel: IKernelConnection) => {
        this.running = true
        try {
          const requestFuture = kernel.requestExecute({ code })
          this.setOutputFuture(requestFuture)
        } catch (error) {
          this.error = error
          this.running = false
          this.outputArea!.model.clear()
        }
      })
    },
    setOutputFuture (future : IOutputShellFuture) {
      this.outputArea!.future = future
      this.outputArea!.future.done.then(() => { this.running = false })
    }
  }
})
</script>

<style lang="scss" scoped>
.code-output {
}
</style>
