<template>
  <div
    class="binary-tile"
    :class="{ 'binary-tile_active' : initialTileState }"
  >
    <button class="binary-tile__num" @click="test">
      {{ dynamicValue }}
    </button>
    <div class="binary-tile__val">
      {{ val }}
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, prop } from 'vue-class-component'

class Props {
  num = prop<number>({ default: 0, required: true })
  val = prop<number>({ default: 0, required: true })
  active = prop<boolean>({ default: true, required: true })
}

@Options({
  computed: {
    tileState (): boolean {
      return this.active
    },
    dynamicValue (): number {
      const tileValue = this.initialTileState
      return tileValue ? 1 : 0
    }
  }
})

export default class BinaryTile extends Vue.with(Props) {
  initialTileState = this.active
  test () {
    this.initialTileState = !this.initialTileState
  }
}
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/colors.scss';
@import '~/../scss/variables/settings.scss';
@import '~/../scss/variables/mq.scss';

.binary-tile {
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 3.25rem;

  &__num {
    @include type-style('expressive-heading-05');
    background-color: $cool-gray-20;
    display: flex;
    color: $black-100;
    height: 3.125rem;
    width: 3.25rem;
    margin-bottom: $spacing-03;
    align-items: center;
    justify-content: center;
  }

  &__val {
    color: $black-100;
    opacity: .3;
  }

  &_active {
    .binary-tile__num {
      background-color: $purple-90;
      color: $white-0;
    }

    .binary-tile__val {
      opacity: 1;
    }
  }
}
</style>
