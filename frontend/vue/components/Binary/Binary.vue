<template>
  <div class="binary-demo">
    <div class="binary-demo__header">
      <h4 class="binary-demo__label">
        Binary
      </h4>
      <h4 class="binary-demo__label">
        Decimal
      </h4>
    </div>
    <div class="binary-demo__container">
      <div v-for="tile in initialTileData" :key="tile.index" class="binary-demo__block">
        <BinaryTile :num="0" :val="tile.value" :active="tile.isActive" @click="calculateTotal" />
      </div>
      <div class="binary-demo__block">
        =
      </div>
      <div class="binary-demo__block">
        {{ displayTotal }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import BinaryTile from './BinaryTile.vue'

@Options({
  components: {
    BinaryTile
  }
})

export default class Binary extends Vue {
  displayTotal = 0;
  initialTileData = [
    { value: 32, isActive: false },
    { value: 16, isActive: true },
    { value: 8, isActive: true },
    { value: 4, isActive: false },
    { value: 2, isActive: false },
    { value: 1, isActive: true }
  ]

  calculateTotal () {
    const binaryTiles = document.querySelectorAll('[data-tile-active="true"]')
    const binaryTitlesList = Array.from(binaryTiles)
    let dynamicTotal = 0

    binaryTitlesList.forEach((item) => {
      const val = item.getAttribute('data-val')
      if(val) {
        dynamicTotal += parseInt(val)
      }
    })
    this.displayTotal = dynamicTotal
    return dynamicTotal
  }

  mounted () {
    this.calculateTotal()
  }
}
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/colors.scss';
@import '~/../scss/variables/settings.scss';
@import '~/../scss/variables/mq.scss';

.binary-demo {
  margin: 8rem 0;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 32rem;
  }

  &__block {
    @include type-style('expressive-heading-05');
    color: $black-100;

    &:not(:last-child) {
      margin-right: $spacing-05;
    }
  }

  &__container {
    display: flex;
  }
}
</style>
