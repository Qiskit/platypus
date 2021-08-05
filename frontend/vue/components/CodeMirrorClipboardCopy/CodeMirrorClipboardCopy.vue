<template>
  <div>
    <clipboard-copy :for="targetId" class="btn">
      Copy to clipboard
    </clipboard-copy>
  </div>
</template>

<script lang="ts">
import { prop, Vue } from 'vue-class-component'
import '@github/clipboard-copy-element'

class Props {
  targetId = prop({ type: String, required: true });
}

export default class CodeMirrorClipboardCopy extends Vue.with(Props) {}
</script>
