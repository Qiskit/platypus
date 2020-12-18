<template>
  <nav class="dot-selector">
    <button
      class="dot-selector__arrow dot-selector__back-arrow"
      :class="{
        'dot-selector__arrow-disabled' : selected == 0
      }"
      @click="prevDot()"
      :disabled="selected == 0"
    >
      &lt;
    </button>
    <ul class="dot-selector__dot-list">
      <li class="dot-selector__dot-item" v-for="n in count" :key="n - 1">
        <input
          class="dot-selector__dot-radio"
          type="radio"
          :value="n - 1"
          v-model="selected"
        />
      </li>
    </ul>
    <button
      class="dot-selector__arrow dot-selector__forward-arrow"
      :class="{
        'dot-selector__arrow-disabled' : selected == count - 1
      }"
      @click="nextDot()"
      :disabled="selected == count - 1"
    >
      &gt;
    </button>
  </nav>
</template>

<script lang="ts">
import { Options, prop, Vue } from "vue-class-component"

class Props {
  count = prop<number>({ default: 0 })
  uid = prop<string>({ required: true })
}

@Options({
  watch: {
    selected(val: string) {
      this.$emit("onSelectedChange", val)
    }
  }
})
export default class DotsSelector extends Vue.with(Props) {
  count!: number
  name!: string
  selected = "0"

  nextDot() {
    this.selected = ((parseInt(this.selected) + 1) % this.count) + ""
  }
  prevDot() {
    this.selected = ((parseInt(this.selected) - 1) % this.count) + ""
  }
}
</script>

<style scoped lang="scss">
.dot-selector {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &__dot-list {
    display: flex;
    flex-direction: row;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__dot-item {
    margin: 0 2rem;
  }
}
</style>
