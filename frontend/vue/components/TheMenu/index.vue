<template>
  <qiskit-ui-shell @on-click="onClick" />
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import '@qiskit/web-components/components/ui-shell'

export default class TheMenu extends Vue {
  onClick (e: CustomEvent) {
    const windowInstance = (window as any)
    windowInstance.textbook.trackClickEvent(`${e.detail.label?.toLowerCase()}`, 'menu')
  }
}
</script>
