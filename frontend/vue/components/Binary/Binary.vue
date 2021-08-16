<template>
  <div class="binary">
    <h4 class="binary-demo">
      Binary
    </h4>
    <div class="binary-demo__container">
      <BinaryTile class="binary-demo__tile" :num="0" :val="32" />
      <BinaryTile class="binary-demo__tile" :num="1" :val="16" active />
      <BinaryTile class="binary-demo__tile" :num="1" :val="8" active />
      <BinaryTile class="binary-demo__tile" :num="0" :val="4" />
      <BinaryTile class="binary-demo__tile" :num="1" :val="2" active />
      <BinaryTile class="binary-demo__tile" :num="0" :val="1" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, prop } from 'vue-class-component'
import BinaryTile from './BinaryTile.vue'

class Props {
  total = prop<number>({ default: 0, required: true })
}

@Options({
  components: {
    BinaryTile
  }
})

export default class Binary extends Vue.with(Props) {}
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/colors.scss';
@import '~/../scss/variables/settings.scss';
@import '~/../scss/variables/mq.scss';

.binary-demo {
  width: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__tile {
    &:not(:last-child) {
      margin-right: $spacing-05;
    }
  }

  &__container {
    display: flex;
  }
}
</style>
