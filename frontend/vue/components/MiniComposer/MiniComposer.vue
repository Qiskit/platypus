<template>
  <section class="mini-composer">
    <Carousel class="mini-composer__exercise-text" @onSelectedChange="selectedExerciseChange">
      <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id elementum ligula, pulvinar viverra augue. Nunc nec varius sapien. </p>
      <p> Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris porta volutpat turpis. </p>
      <p> Curabitur id hendrerit augue, ac congue massa. Vivamus aliquet molestie purus. Nunc ante lectus, pharetra vel ex non, hendrerit ullamcorper justo. </p>
      <p> Donec sodales, mauris in faucibus maximus, velit velit malesuada sem, a convallis ante risus volutpat ligula. </p>
    </Carousel>
    <div class="mini-composer__gates">
      <h1 class="mini-composer__gates__title">Gates</h1>
      <div class="mini-composer__gates__pool">
        <Gate class="mini-composer__gates__pool__gate" :name="`${gateName.H}`" />
        <Gate class="mini-composer__gates__pool__gate" :name="`${gateName.MEASURE_Z}`" />
      </div>
    </div>
    <div class="mini-composer__circuit">
      <h1 class="mini-composer__circuit__title">Circuit</h1>
      <div class="mini-composer__circuit__line">
        <KetCircuitLine :line-lenght="230" />
      </div>
    </div>
    <div class="mini-composer__probability-chart" />
    <div class="mini-composer__results" />
    <div class="mini-composer__info" />
    <div class="mini-composer__next-button" />
  </section>
</template>

<script lang="ts">
import { Options, Vue, prop } from 'vue-class-component'
import Carousel from '../Carousel/Carousel.vue'
import KetCircuitLine from '../Sketch/KetCircuitLine.vue'
import Gate, { GateName } from './Gate.vue'

class Props {
  goal = prop<String>({ default: 'minicomposer', required: true });
}

@Options({
  components: {
    Carousel,
    KetCircuitLine,
    Gate
  }
})
export default class MiniComposer extends Vue.with(Props) {
  gateName = GateName

  selectedExerciseChange (value :number) {
    console.log(value)
  }
}
</script>
<style scoped lang="scss">
@import 'carbon-components/scss/globals/scss/typography';
@import 'carbon-components/scss/globals/scss/layout';
@import '../../../scss/variables/colors.scss';
@import '~/../scss/variables/mq.scss';

.mini-composer {
  display: grid;
  grid-template-columns: 320px 1fr 160px;
  grid-template-rows: auto;
  grid-template-areas:
    "text text text"
    "gates results results"
    "circuit results results"
    "chart results results"
    "info info next-button";

  &__exercise-text {
    grid-area: text;
    border-bottom: 1px solid black;
    background-color: #FFFFCC;

    ::v-deep(.carousel__selector) {
      margin-top: 0;
    }
  }
  &__gates {
    background-color: #CCFFCC;
    grid-area: gates;
    border-bottom: 1px solid black;
    padding: 0 $spacing-05 $spacing-05 $spacing-05;
    &__title {
      margin: $spacing-03 0 $spacing-05 0;
      @include type-style('heading-01');
    }
    &__pool {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      &__gate {
        margin-right: $spacing-03;
      }
    }
  }
  &__circuit {
    background-color: #FFCCCC;
    grid-area: circuit;
    padding: 0 $spacing-04;
    &__title {
      margin-top: $spacing-03;
      @include type-style('heading-01');
    }
  }
  &__probability-chart {
    grid-area: chart;
    height: 250px;
    background-color: #CCCCFF;
  }
  &__results {
    grid-area: results;
    border-left: 1px solid black;
    background-color: #FFAAFF;
  }
  &__info {
    grid-area: info;
    height: 50px;
    background-color: #CCCCCC;
  }
  &__next-button {
    grid-area: next-button;
    height: 50px;
    background-color: #6929C4;
  }
}
</style>
