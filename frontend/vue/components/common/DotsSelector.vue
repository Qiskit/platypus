<template>
  <nav class="dot-selector">
    <button
      class="dot-selector__arrow dot-selector__arrow--back"
      :class="{
        'dot-selector__arrow-disabled' : selected == 0
      }"
      :disabled="disableArrows || selected == 0"
      @click="prevDot()"
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 16L20 6L21.4 7.40002L12.8 16L21.4 24.6L20 26L10 16Z" />
      </svg>
    </button>
    <ul class="dot-selector__dot-list">
      <li v-for="n in count" :key="n - 1" class="dot-selector__dot-item">
        <label class="dot-selector__dot-item__label">
          <input
            v-model="selected"
            class="dot-selector__dot-item__input"
            :class="{
              'dot-selector__dot-item__input--visited' : (n - 1) < selected
            }"
            type="radio"
            :value="n - 1"
          >
          <span class="dot-selector__dot-item__circle" />
        </label>
      </li>
    </ul>
    <button
      class="dot-selector__arrow dot-selector__arrow--forward"
      :disabled="disableArrows || selected == count - 1"
      @click="nextDot()"
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.0001 16L12.0001 26L10.6001 24.6L19.2001 16L10.6001 7.40002L12.0001 6L22.0001 16Z" />
      </svg>
    </button>
  </nav>
</template>

<script lang="ts">
import { Options, prop, Vue } from 'vue-class-component'

class Props {
  count = prop<number>({ default: 0, required: true })
  uid = prop<string>({ required: true })
  disableArrows = prop<boolean>({ default: false, required: true })
}

@Options({
  watch: {
    selected (val: string) {
      this.$emit('onSelectedChange', parseInt(val))
    }
  }
})
export default class DotsSelector extends Vue.with(Props) {
  count!: number
  name!: string
  selected = '0'

  nextDot () {
    this.selected = ((parseInt(this.selected) + 1) % this.count) + ''
  }

  prevDot () {
    this.selected = ((parseInt(this.selected) - 1) % this.count) + ''
  }
}
</script>

<style scoped lang="scss">
@import '~/../scss/variables/colors.scss';

.dot-selector {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  &__dot-list {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    margin: 0;
    padding: 0;
    min-width: 250px;

    list-style: none;
  }

  &__dot-item {

    &__label {
      position: relative;
      width: 10px;
    }

    &__input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    &__circle {
      display: block;
      width: 10px;
      height: 10px;
      border-radius: 5px;
      background-color: $background-color-white;
      border: 1px solid $border-color-dark;
      cursor: pointer;
    }

    &__input--visited ~ #{&}__circle {
      background-color: $blue-40;
    }

    &__input:checked ~ #{&}__circle {
      background-color: $purple-60;
    }
  }

  &__arrow {
    border: none;
    background: none;
    cursor: pointer;

    &:disabled {
      opacity: 0;
    }

    svg > path {
      fill: $active-color-dark;
    }
  }
}
</style>
