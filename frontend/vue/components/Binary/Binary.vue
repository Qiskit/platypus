<template>
  <h1>Binary demo</h1>
</template>

<script lang="ts">
import { Options, Vue, prop } from 'vue-class-component'

class Props {
  total = prop<number>({ default: 0, required: true })
}

@Options({})

export default class BinaryDemo extends Vue.with(Props) {}
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/colors.scss';
@import '~/../scss/variables/settings.scss';
@import '~/../scss/variables/mq.scss';
</style>
