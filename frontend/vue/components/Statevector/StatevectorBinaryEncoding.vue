<template>
  <StatevectorBaseWidget
    :transform-function="transformFunction"
  >
    BinaryEncoding
  </StatevectorBaseWidget>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import StatevectorBaseWidget from './StatevectorBaseWidget.vue'

export default defineComponent({
  name: 'StatevectorBinaryEncoding',
  components: {
    StatevectorBaseWidget
  },
  props: {
  },
  data () {
  },
  mounted () {
  },
  methods: {
    transformFunction (a: number) {
      return { magnitude: 1 / 4, phase: a === 0 ? 0 : 180 }
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/colors.scss';
@import '~/../scss/variables/mq.scss';

</style>
