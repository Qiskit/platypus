<template>
  <div ref="outputDiv" class="code-output">
    <div>
      <div v-if="!kernel && !error" class="code-output__state-info">
        <bx-loading class="code-output__state-info__icon" assistive-text="Connecting to the server" type="small" />
        {{ $translate('Connecting to the server') }}
      </div>
      <div v-if="error !== ''" class="code-output__state-info">
        <div class="code-output__state-info__warning">
          <WarningIcon />
          <div>
            The kernel may have died from inactivity. Please <BasicLink class="code-output__state-info__warning-cta" @click="refreshPage">
              refresh
            </BasicLink> the page to run the code.
          </div>
        </div>
      </div>
    </div>
    <div ref="outputDiv" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import WarningIcon from '@carbon/icons-vue/lib/warning--alt/32'
import BasicLink from '../common/BasicLink.vue'
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
  components: {
    BasicLink,
    WarningIcon
  },
  data () {
    return {
      kernelPromise: undefined as Promise<IKernelConnection> | undefined,
      kernel: undefined as IKernelConnection | undefined,
      outputArea: undefined as OutputArea | undefined,
      error: ''
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
  },
  methods: {
    requestExecute (code: string) {
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
          // reset button back to 'Run' on inactive kernels
          setTimeout(() => this.$emit('finished'), 800)
        }
      })
    },
    setOutputFuture (future : IOutputShellFuture) {
      this.outputArea!.future = future
    },
    clearOutput () {
      window.textbook.trackClickEvent('Reset', `Scratchpad code cell, ${pageRoute}`)
      this.outputArea!.setHidden(true)
    },
    refreshPage () {
      window.location.reload()
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/spacing';
@import '~/../scss/variables/colors.scss';
@import 'carbon-components/scss/globals/scss/typography';

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

    &__warning {
      @include type-style('body-long-01');
      display: flex;
      flex-flow: row;
      padding: $spacing-05;
      gap: $spacing-05;
      align-items: center;
    }
  }
}
</style>
