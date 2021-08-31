<template>
  <div class="binary-demo">
    <section class="binary-demo__section">
      <h4 class="binary-demo__input__title">
        Binary
      </h4>
      <div class="binary-demo__container">
        <div class="binary-demo__input">
          <BinaryTile
            v-for="tile in initialTileData"
            :key="tile.index"
            :num="0"
            :val="tile.value"
            :active="tile.isActive"
            @click="calculateTotal"
            @handleToggle="updateTileStatus($event)"
          />
          <div class="binary-demo__block">
            =
          </div>
        </div>
      </div>
    </section>

    <section class="binary-demo__section" data-test="binary-demo-total">
      <h4 class="binary-demo__output__title">
        Decimal
      </h4>
      <div class="binary-demo__output">
        <div class="binary-demo__block">
          {{ decimalTotal }}
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import BinaryTile from './BinaryTile.vue'

@Options({
  components: {
    BinaryTile
  },
  computed: {
    decimalTotal ():number {
      let updatedTotal = 0

      this.initialTileData.forEach((item: { value: number, isActive: boolean }) => {
        const val = item.value
        const isActive = item.isActive
        if (val && isActive) {
          updatedTotal += val
        }
      })
      this.displayTotal = updatedTotal
      return updatedTotal
    }
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

  updateTileStatus (e:any) {
    this.initialTileData.forEach((tile) => {
      if (tile.value === e.tileVal) {
        tile.isActive = e.newTileState
      }
    })
  }

  calculateTotal () {
    const binaryTiles = document.querySelectorAll('[data-tile-active="true"]')
    const binaryTitlesList = Array.from(binaryTiles)
    let dynamicTotal = 0

    binaryTitlesList.forEach((item) => {
      const val = item.getAttribute('data-val')
      if (val) {
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
  display: flex;

  @include mq($until: x-large) {
    flex-direction: column;
  }

  &__section {
    display: flex;
    flex-direction: column;
  }

  &__block {
    @include type-style('expressive-heading-05');
    min-width: 3.25rem;
    color: $black-100;
    text-align: center;
    display: flex;
    height: 100%;

    @include mq($until: x-large) {
      min-width: 2rem;
      display: flex;
      height: 100%;
    }
  }

  &__container {
    display: flex;
  }

  &__input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__title {
      @include type-style('expressive-heading-01');
      margin-bottom: $spacing-02;
      margin-top: 0;

      @include mq($until: x-large) {
        margin-bottom: $spacing-05;
      }
    }
  }

  &__output {
    display: flex;

    &__title {
      @include type-style('expressive-heading-01');
      margin-bottom: $spacing-02;
      margin-top: 0;
      @include mq($until: x-large) {
        margin-top: $spacing-07;
      }
    }
  }
}
</style>

<style lang="scss">
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/settings.scss';
@import '~/../scss/variables/mq.scss';

.binary-demo {
  & .binary-tile {
    padding-right: $spacing-05;

    @include mq($until: large) {
      padding-right: $spacing-03;
    }
  }
}
</style>
