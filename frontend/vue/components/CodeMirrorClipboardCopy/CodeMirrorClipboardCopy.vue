<template>
  <clipboard-copy class="code-mirror-clipboard-copy" :for="targetId">
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

@Options({
  components: {
    Copy32
  }
})
export default class CodeMirrorClipboardCopy extends Vue.with(Props) {}
</script>

<style lang="scss" scoped>
@import '~/../scss/variables/colors.scss';

.code-mirror-clipboard-copy {
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 100;

  &:hover {
    color: $active-color;
    cursor: pointer;
  }
}

.copy-icon {
  height: 15px;
  width: 100%;
}
</style>
