<template>
  <clipboard-copy
    :value="text"
    class="code-mirror-clipboard-copy"
    :aria-label="$translate(label)"
    @clipboard-copy="handleClick"
  >
    <CopyIcon class="code-mirror-clipboard-copy__icon" />
    <div class="code-mirror-clipboard-copy__tooltip">
      {{ $translate(label) }}
    </div>
  </clipboard-copy>
</template>

<script lang="ts">
import { Options, prop, Vue } from 'vue-class-component'
import CopyIcon from '@carbon/icons-vue/lib/copy/20'
import 'carbon-web-components/es/components/tooltip/tooltip-icon'
import '@github/clipboard-copy-element'

class Props {
  text = prop({ type: String, required: true })
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
@import 'carbon-components/scss/globals/scss/spacing';
@import '~/../scss/variables/colors.scss';

.code-mirror-clipboard-copy {
  align-items: center;
  display: flex;
  font-size: 0.875rem;
  position: relative;

  &__tooltip {
    box-shadow: 0 2px 6px var(--cds-shadow, rgba($block-color-secondary, 0.3));
    position: absolute;
    left: 50%;
    top: 0;
    z-index: 6000;
    transform: translate(-50%, -100%) translate(0, -#{$spacing-04});
    display: none;
    padding: 0 $spacing-04;
    background: $background-color-dark;
    border-radius: $spacing-01;
    color: $text-color-white;
    overflow-wrap: break-word;

    &::after {
      position: absolute;
      bottom: calc(-0.429688rem + 1px);
      right: 0px;
      left: 0px;
      width: 0px;
      height: 0px;
      border-right: 0.429688rem solid transparent;
      border-top: 0.429688rem solid var(--cds-inverse-02, $background-color-dark);
      border-left: 0.429688rem solid transparent;
      margin: 0px auto;
      content: "";
    }
  }

  &:hover #{&}__tooltip {
    display: block;
  }

  &__icon {
    color: $text-color-light;
  }

  &:focus #{&}__icon ,
  &:hover #{&}__icon  {
    color: $active-color;
  }
}
</style>
