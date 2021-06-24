<template>
  <div
    class="probability-chart"
    :class="{ 'probability-chart_dense': isDense() }"
  >
    <div class="probability-chart__probability-axes">
      <span class="probability-chart__probability-axes__label">probabilities</span>
      <span class="probability-chart__probability-axes__value probability-chart__probability-axes__value_1">1</span>
      <span class="probability-chart__probability-axes__value probability-chart__probability-axes__value_05">0.5</span>
      <span class="probability-chart__probability-axes__value probability-chart__probability-axes__value_0">0</span>
    </div>
    <div class="probability-chart__key-axes">
      <div
        v-for="(item, index) in probabilities"
        :key="index"
        class="probability-chart__key-axes__key"
      >
        {{ item.key }}
      </div>
    </div>
    <div class="probability-chart__bars-area">
      <div class="probability-chart__bars-area__mark-05" />
      <div class="probability-chart__bars-area__mark-1" />
      <div class="probability-chart__bars-area__bars">
        <div
          v-for="(item, index) in probabilities"
          :key="index"
          class="probability-chart__bars-area__bars__element"
          :style="`--value: ${item.value}`"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, prop } from 'vue-class-component'

export interface ProbabilityState {
  key: string
  value: number
}

class Props {
  probabilities = prop<ProbabilityState[]>({
    default: [
      { key: '0', value: 1 },
      { key: '1', value: 0 }
    ],
    required: true
  });
}

export default class MiniComposer extends Vue.with(Props) {
  isDense () {
    return this.probabilities.length > 4
  }
}
</script>
<style scoped lang="scss">
@import 'carbon-components/scss/globals/scss/typography';
@import 'carbon-components/scss/globals/scss/layout';
@import '../../../scss/variables/colors.scss';
@import '~/../scss/variables/mq.scss';

.probability-chart {
  display: grid;
  grid-template-columns: 60px 1fr;
  grid-template-rows: 1fr 30px;
  grid-template-areas:
    "prob-axes bars"
    "none key-axes";

  &__probability-axes {
    position: relative;
    grid-area: prob-axes;
    &__label {
      @include type-style('body-long-01');
      position: absolute;
      left: 0;
      top: 50%;
      transform:
        translate(-50%, -50%)
        translateX(15px)
        rotate(-90deg);
    }
    &__value {
      @include type-style('caption-01');
      position: absolute;
      right: 10px;

      &_1 {
        transform: translateY(-30%);
      }
      &_05 {
        top: 50%;
        transform: translateY(-50%);
      }
      &_0 {
        bottom: 0;
      }
    }
  }
  &__key-axes {
    grid-area: key-axes;
    width: 100%;

    display: flex;
    flex-flow: row;
    align-items: flex-end;

    &__key {
      @include type-style('caption-01');
      flex: 1;
      text-align: center;
    }
  }
  &__bars-area {
    position: relative;
    grid-area: bars;
    border: 1px solid $border-color-dark;
    border-width: 0 0 1px 1px;

    &__mark-05 {
      position: absolute;
      top: 50%;
      height: 0;
      width: 100%;
      border-top: 1px solid $border-color;
    }
    &__mark-1 {
      position: absolute;
      top: 0;
      height: 0;
      width: 100%;
      border-top: 1px solid $border-color;
    }
    &__bars {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;

      display: flex;
      flex-flow: row;
      align-items: flex-end;

      &__element {
        flex: 1;
        transition: height 0.2s ease-out;
        height: calc(var(--value, 0) * 100%);

        &::after {
          content: "";
          display: block;
          width: 60%;
          max-width: 40px;
          height: 100%;
          margin: 0 auto;
          background-color: $blue-70;
        }
      }
    }
  }
  &_dense &__key-axes__key {
    transform: rotate(-60deg);
  }
}
</style>
