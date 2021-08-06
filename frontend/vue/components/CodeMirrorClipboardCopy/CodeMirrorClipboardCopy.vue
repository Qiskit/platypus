<template>
  <clipboard-copy
    :for="targetId"
    class="code-mirror-clipboard-copy"
    @clipboard-copy="handleClick"
  >
    <div class="label" v-text="label" />
    <Copy32 class="copy-icon" />
  </clipboard-copy>
</template>

<script lang="ts">
import { Options, prop, Vue } from 'vue-class-component'
import Copy32 from '@carbon/icons-vue/lib/copy/32'
import '@github/clipboard-copy-element'

class Props {
  targetId = prop({ type: String, required: true });
}

const LABEL = {
  COPIED: 'Copied!',
  COPY: 'Copy'
}

@Options({
  components: {
    Copy32
  }
})
export default class CodeMirrorClipboardCopy extends Vue.with(Props) {
  label = LABEL.COPY
  labelTimeout = null as unknown as NodeJS.Timeout

  handleClick () {
    this.label = LABEL.COPIED

    clearTimeout(this.labelTimeout)
    this.labelTimeout = null as unknown as NodeJS.Timeout

    this.labelTimeout = setTimeout(() => {
      this.label = LABEL.COPY
    }, 3000)
  }
}
</script>

<style lang="scss" scoped>
@import '~/../scss/variables/colors.scss';

.code-mirror-clipboard-copy {
  align-items: center;
  display: flex;
  font-size: 0.875rem;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 100;

  &:focus,
  &:hover {
    color: $active-color;
    cursor: pointer;

    .label {
      opacity: 1;
    }
  }
}

.copy-icon {
  height: 15px;
  margin-bottom: 10px;
  margin-left: 5px;
  margin-right: 10px;
  margin-top: 10px;
  width: 100%;
}

.label {
  background: $background-color-light;
  opacity: 0;
  padding-left: 10px;
  padding-right: 10px;
  transition: opacity 0.2s ease-out;
}
</style>
