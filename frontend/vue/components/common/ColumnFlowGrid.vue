<template>
  <component
    :is="tag"
    class="column-flow-grid"
    :style="`--row-count-l: ${Math.ceil(elements.length / 3)}; --row-count-m: ${Math.ceil(elements.length / 2)}; --row-count-s: ${elements.length};`"
  >
    <slot
      v-for="( element, index ) in elements"
      :key="index"
      :element="element"
    />
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'

export default defineComponent({
  name: 'ColumnFlowGrid',
  props: {
    elements: { type: Array, required: false, default: () => [] },
    tag: { type: String, required: false, default: 'div' }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/layout';
@import '~/../scss/variables/mq.scss';

.column-flow-grid {
  --column-count: 3;
  --row-count: var(--row-count-l, 3);
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(var(--column-count), 1fr);
  grid-template-rows: repeat(var(--row-count), max-content);
  gap: $spacing-06 $spacing-10;
  padding: $spacing-04 $spacing-06 $spacing-04 0;
  @include mq($from: medium, $until: large) {
    --column-count:2;
    --row-count: var(--row-count-m, 5);
  }
  @include mq($until: medium) {
    --column-count:1;
    --row-count: var(--row-count-s, 9);
  }
}
</style>
