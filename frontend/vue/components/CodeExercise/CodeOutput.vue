<template>
  <div ref="outputDiv" class="code-output">
    <div>
      <div v-if="!kernel && !error" class="code-output__state-info">
        <bx-loading class="code-output__state-info__icon" assistive-text="Connecting to the server" type="small" />
        {{ $translate('Connecting to the server') }}
      </div>
      <div v-if="error !== ''" class="code-output__state-info">
        <p>{{ $translate('Failed to execute. Please refresh the page.') }}</p>
        {{ error }}
      </div>
    </div>
    <div ref="outputDiv" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { getQiskitUser } from '../../../ts/qiskitUser'
import { OutputArea, IOutputShellFuture, createOutputArea } from './OutputRenderer'
import { requestBinderKernel, IKernelConnection, IStreamMsg } from './KernelManager'
import 'carbon-web-components/es/components/loading/loading'

declare global {
  interface Window {
    textbook: any
  }
}

const pageRoute = window.location.pathname

export default defineComponent({
  name: 'CodeOutput',
  data () {
    return {
      kernelPromise: undefined as Promise<IKernelConnection> | undefined,
      kernel: undefined as IKernelConnection | undefined,
      outputArea: undefined as OutputArea | undefined,
      error: '',
      apiTokenPromise: undefined as Promise<string | undefined> | undefined
    }
  },
  mounted () {
    this.$emit('loadingKernel')
    const outputDivRef = (this.$refs.outputDiv as HTMLDivElement)

    this.kernelPromise = requestBinderKernel()

    this.kernelPromise.then((kernel: IKernelConnection) => {
      this.kernel = kernel
      this.$emit('kernelReady')
      this.outputArea = createOutputArea(outputDivRef)
    }, (error: Error) => {
      this.error = error.message
    })

    this.apiTokenPromise = getQiskitUser().then(user => user?.apiToken)
  },
  methods: {
    needsApiToken (code: string) {
      return this.apiTokenPromise!.then((apiToken?: string) => {
        return this.isBackendExecution(code) && !apiToken
      })
    },
    isBackendExecution (code: string) {
      return code.includes('IBMQ.')
    },
    requestExecute (code: string) {
      if (this.isBackendExecution(code)) {
        this._executeFromBackend(code)
      } else {
        this._executeCode(code)
      }
    },
    _executeFromBackend (code: string) {
      this.error = ''
      this.apiTokenPromise!.then((apiToken: string | undefined) => {
        const accountLoadingCode = `
        from qiskit import IBMQ
        try:
          IBMQ.disable_account()
        except:
          pass

        IBMQ.enable_account('${apiToken}')
        `
        const codeWithAccount = `${accountLoadingCode}${code}`

        this._executeCode(codeWithAccount)
      })
    },
    _executeCode (code: string) {
      this.error = ''
      this.outputArea!.setHidden(true)
      this.kernelPromise!.then((kernel: IKernelConnection) => {
        this.$emit('running')
        try {
          const requestFuture = kernel.requestExecute({ code })
          this.setOutputFuture(requestFuture)
          requestFuture.done.then(() => {
            this.$emit('finished')
            this.outputArea!.setHidden(false)
          })
          requestFuture.registerMessageHook((msgContainer) => {
            const message = (msgContainer as IStreamMsg)?.content?.text
            if (message && message.includes('Your answer is correct')) {
              this.$emit('correctAnswer')
            }
            return true
          })
        } catch (error: any) {
          this.error = error as string
          this.outputArea!.setHidden(false)
        }
      })
    },
    setOutputFuture (future : IOutputShellFuture) {
      this.outputArea!.future = future
    },
    clearOutput () {
      window.textbook.trackClickEvent('Reset', `Scratchpad code cell, ${pageRoute}`)
      this.outputArea!.setHidden(true)
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/spacing';
@import '~/../scss/variables/colors.scss';

.code-output {
  &__state-info {
    padding: $spacing-07;
    display: flex;
    align-items: center;
    gap: $spacing-05;

    &__icon {
      display: block;
      width: 1.5rem;
      height: 1.5rem;
      --cds-interactive-04: #{$border-color-tertiary};
    }
  }
}
</style>
