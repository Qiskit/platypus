<template>
  <clipboard-copy
    :value="text"
    class="code-mirror-clipboard-copy"
    @clipboard-copy="handleClick"
  >
    <div class="label" v-text="$translate(label)" />
    <CopyIcon class="copy-icon" />
  </clipboard-copy>
</template>

<script lang="ts">
import { Options, prop, Vue } from 'vue-class-component'
import CopyIcon from '@carbon/icons-vue/lib/copy/20'
import '@github/clipboard-copy-element'

class Props {
  text = prop({ type: String, required: true });
}

const LABEL = {
  COPIED: 'Copied!',
  COPY: 'Copy'
}

@Options({
  components: {
    CopyIcon
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
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/colors.scss';

.code-mirror-clipboard-copy {
  align-items: center;
  display: flex;
  font-size: 0.875rem;
  position: relative;
  z-index: 100;
  padding: $spacing-03;

  &:focus,
  &:hover {
    color: $active-color;
    cursor: pointer;

    .label {
      display: block;
      transition: display 0s ease-out 0.2s;
      opacity: 1;
    }
  }
}

.label {
  background: $background-color-light;
  opacity: 0;
  padding-left: 10px;
  padding-right: 10px;
  right: calc(20px + #{$spacing-03} * 2);
  transition: opacity 0.2s ease-out;
  display: none;
  position: absolute;
  pointer-events: none;
}
</style>
