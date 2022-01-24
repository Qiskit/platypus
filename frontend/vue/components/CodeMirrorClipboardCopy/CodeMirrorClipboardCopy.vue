<template>
  <clipboard-copy
    :value="text"
    class="code-mirror-clipboard-copy"
    @clipboard-copy="handleClick"
  >
    <bx-tooltip-icon aligment="center" direction="top" :body-text="$translate(label)">
      <CopyIcon class="code-mirror-clipboard-copy__icon" />
    </bx-tooltip-icon>
  </clipboard-copy>
</template>

<script lang="ts">
import { Options, prop, Vue } from 'vue-class-component'
import CopyIcon from '@carbon/icons-vue/lib/copy/20'
import 'carbon-web-components/es/components/tooltip/tooltip-icon'
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
  padding: $spacing-03;

  &__icon {
    color: $text-color-light;
  }

  &:focus #{&}__icon ,
  &:hover #{&}__icon  {
    color: $active-color;
  }
}
</style>
