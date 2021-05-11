<template>
  <section class="mini-composer">
    <Carousel ref="carouselRef" class="mini-composer__exercise-text" :disable-arrows="true" @onSelectedChange="selectedExerciseChange">
      <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id elementum ligula, pulvinar viverra augue. Nunc nec varius sapien. </p>
      <p> Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris porta volutpat turpis. </p>
      <p> Curabitur id hendrerit augue, ac congue massa. Vivamus aliquet molestie purus. Nunc ante lectus, pharetra vel ex non, hendrerit ullamcorper justo. </p>
      <p> Donec sodales, mauris in faucibus maximus, velit velit malesuada sem, a convallis ante risus volutpat ligula. </p>
    </Carousel>
    <div class="mini-composer__gates">
      <h1 class="mini-composer__gates__title">
        Gates
      </h1>
      <draggable
        class="mini-composer__gates__pool"
        :list="currentStepData.availableGates"
        :move="onMoveCallback"
        group="people"
        item-key="name"
        @change="log"
      >
        <template #item="{ element }">
          <Gate class="mini-composer__gates__pool__gate" :name="`${element.name}`" />
        </template>
      </draggable>
    </div>
    <div class="mini-composer__circuit-section">
      <h1 class="mini-composer__circuit-section__title">
        Circuit
      </h1>
      <div class="mini-composer__circuit-section__qubit-line">
        <KetCircuitLine :line-lenght="230" />
        <div class="mini-composer__circuit-section__qubit-line__slot-container">
          <draggable
            class="mini-composer__circuit-section__qubit-line__slot"
            :list="currentStepData.circuitState"
            group="people"
            item-key="name"
            @change="log"
          >
            <template #item="{ element }">
              <Gate
                class="mini-composer__circuit-section__qubit-line__slot__gate"
                :name="`${element.name}`"
              />
            </template>
          </draggable>
          <Gate class="mini-composer__circuit-section__qubit-line__z-gate" :name="`${measureGate}`" />
        </div>
      </div>
    </div>
    <ProbablityChart
      class="mini-composer__probability-chart"
      :probabilities="currentStepData.startProbabilities"
    />
    <div class="mini-composer__results">
      <p v-if="currentStepIdx === 0 && currentStepData.completed"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id elementum ligula, pulvinar viverra augue. Nunc nec varius sapien. </p>
      <p v-if="currentStepIdx === 1 && currentStepData.completed"> Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris porta volutpat turpis. </p>
      <p v-if="currentStepIdx === 2 && currentStepData.completed"> Curabitur id hendrerit augue, ac congue massa. Vivamus aliquet molestie purus. Nunc ante lectus, pharetra vel ex non, hendrerit ullamcorper justo. </p>
      <p v-if="currentStepIdx === 3 && currentStepData.completed"> Donec sodales, mauris in faucibus maximus, velit velit malesuada sem, a convallis ante risus volutpat ligula. </p>
    </div>
    <div class="mini-composer__footer">
      <div
        v-if="currentStepData.completed"
        class="mini-composer__footer__info"
      >
        <p v-if="currentStepIdx === 0 && currentStepData.completed"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
        <p v-if="currentStepIdx === 1 && currentStepData.completed"> Orci varius natoque penatibus et magnis  </p>
        <p v-if="currentStepIdx === 2 && currentStepData.completed"> Curabitur id hendrerit augue, ac congue massa. </p>
        <p v-if="currentStepIdx === 3 && currentStepData.completed"> Donec sodales, mauris in faucibus maximus. </p>
      </div>
      <AppCta
        v-if="currentStepData.completed"
        class="mini-composer__footer__next-button"
        label="Next"
        @click="onNextButton()"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { ref } from '@vue/reactivity'
import { Options, Vue, prop } from 'vue-class-component'
import draggable, { MoveEvent } from 'vuedraggable'
import Carousel from '../Carousel/Carousel.vue'
import KetCircuitLine from '../Sketch/KetCircuitLine.vue'
import AppCta from '../common/AppCta.vue'
import Gate, { GateName } from './Gate.vue'
import ProbablityChart, { ProbabilityState } from './ProbablityChart.vue'

class Props {
  goal = prop<String>({ default: 'minicomposer', required: true });
}

interface Added<T> {
  added: {
    element: T
    newIndex: number
  }
}
interface Removed<T> {
  removed: {
    element: T
    oldIndex: number
  }
}
interface Moved<T> {
  moved: {
    element: T
    oldIndex: number
    newIndex: number
  }
}
interface ComposerGate {
  name: GateName
  id: number
}

interface ExerciseStep {
  autoMeasureGate: boolean
  availableGates: ComposerGate[]
  circuitState: ComposerGate[]
  circuitStateGoal: ComposerGate[]
  startProbabilities: ProbabilityState[]
  endProbabilities: ProbabilityState[]
  completed: boolean
}

@Options({
  components: {
    Carousel,
    KetCircuitLine,
    Gate,
    draggable,
    ProbablityChart,
    AppCta
  }
})
export default class MiniComposer extends Vue.with(Props) {
  carouselRef = ref<Carousel | null>(null)
  get carousel () { return (this.carouselRef as unknown as Carousel) }
  measureGate = GateName.MEASURE_Z

  exerciseSteps: ExerciseStep[] = [
    {
      autoMeasureGate: true,
      availableGates: [{ name: GateName.H, id: 2 }],
      circuitState: [{ name: GateName.H, id: 2 }, { name: GateName.H, id: 2 }, { name: GateName.H, id: 2 }],
      circuitStateGoal: [{ name: GateName.H, id: 2 }],
      startProbabilities: [{ key: '0', value: 1 }, { key: '1', value: 0 }],
      endProbabilities: [{ key: '0', value: 0.5 }, { key: '1', value: 0.5 }],
      completed: false
    },
    {
      autoMeasureGate: true,
      availableGates: [{ name: GateName.H, id: 2 }],
      circuitState: [{ name: GateName.H, id: 2 }],
      circuitStateGoal: [{ name: GateName.H, id: 2 }, { name: GateName.H, id: 2 }],
      startProbabilities: [{ key: '0', value: 0.5 }, { key: '1', value: 0.5 }],
      endProbabilities: [{ key: '0', value: 1 }, { key: '1', value: 0 }],
      completed: false
    }
  ]

  currentStepIdx = 0

  currentStepData: ExerciseStep = this.cloneCurrentStepData()

  infoText = 'Lorem Ipsum dolor sit amet consectetur adispicing elit'

  cloneCurrentStepData () : ExerciseStep {
    const step = this.exerciseSteps[this.currentStepIdx]
    if (step.completed) {
      step.availableGates = []
      step.circuitState = Array.from(step.circuitStateGoal)
      step.startProbabilities = Array.from(step.endProbabilities)
    } else {
      step.availableGates = Array.from(step.availableGates)
      step.circuitState = Array.from(step.circuitState)
      step.startProbabilities = Array.from(step.startProbabilities)
    }
    return step
  }

  selectedExerciseChange (value :number) {
    this.currentStepIdx = value
    this.currentStepData = this.cloneCurrentStepData()
  }

  checkCurrentStepCompleteness () {
    if (this.currentStepData.circuitState.length !== this.currentStepData.circuitStateGoal.length) {
      this.currentStepData.completed = false
      return
    }
    for (let i = 0; i < this.currentStepData.circuitState.length; i++) {
      if (this.currentStepData.circuitState[i].name !== this.currentStepData.circuitStateGoal[i].name) {
        this.currentStepData.completed = false
        return
      }
    }
    this.exerciseSteps[this.currentStepIdx].completed = true
    this.currentStepData = this.cloneCurrentStepData()
  }

  log (evt: Added<ComposerGate> | Removed<ComposerGate> | Moved<ComposerGate>) {
    /*
    if ('added' in evt) {
      console.log(`ADDED: ${evt.added.element.name}`)
    }
    if ('removed' in evt) {
      console.log(`REMOVED: ${evt.removed.element.name}`)
    }
    if ('moved' in evt) {
      console.log(`MOVED: ${evt.moved.element.name}`)
    }
    */
    this.checkCurrentStepCompleteness()

    // console.log(evt)
  }

  onMoveCallback (evt: MoveEvent<ComposerGate>, dragEvent: DragEvent) {
    /* const list = evt.relatedContext.component.realList
    if (!list || list.length > 0) {
      console.log(false)
      return false
    }
    console.log(true) */
  }

  onNextButton () {
    this.carousel.nextSlide()
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
    "footer footer footer";

  &__exercise-text {
    grid-area: text;
    border-bottom: 1px solid $border-color;

    ::v-deep(.carousel__selector) {
      margin-top: 0;
    }
  }
  &__gates {
    grid-area: gates;
    border-bottom: 1px solid $border-color;
    padding: 0 $spacing-05 $spacing-05 $spacing-05;
    &__title {
      margin: $spacing-03 0 $spacing-05 0;
      @include type-style('heading-01');
    }
    &__pool {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      min-height: 32px;
      &__gate {
        margin-right: $spacing-03;
        &.sortable-ghost {
          transition: opacity 0.2s ease-out;
          opacity: 0.5;
        }
      }
    }
  }
  &__circuit-section {
    grid-area: circuit;
    padding: 0 $spacing-04;
    &__title {
      margin-top: $spacing-03;
      @include type-style('heading-01');
    }
    &__qubit-line {
      position: relative;
      &__slot-container {
        display: flex;
        flex-flow: row;

        position: absolute;
        top: 0px;
        height: 100%;
        width: 100%;
        align-items: center;
        padding: 0 $spacing-07;
      }
      &__slot {
        display: flex;
        flex-flow: row;
        flex: 1 1 auto;
        max-width: 100%;

        &__gate {
          margin-right: $spacing-02;
          &.sortable-ghost {
            transition: opacity 0.2s ease-out;
            opacity: 0.5;
          }
        }
      }
      &__z-gate {
        flex: 0 0 auto;
      }
    }
  }
  &__probability-chart {
    grid-area: chart;
    height: 250px;
    padding: $spacing-07 $spacing-09 $spacing-07 $spacing-05;
  }
  &__results {
    grid-area: results;
    border-left: 1px solid $border-color;
    margin-bottom: $spacing-10;
  }
  &__footer {
    grid-area: footer;
    display: flex;
    justify-content: flex-end;
    min-height: 52px;

    &__info {
      @include type-style('body-long-01');
      flex: 1;
      display: flex;
      align-items: center;
      min-height: 52px;
      padding: 0 $spacing-05;

      background-color: $background-color-light;
    }
    &__next-button {
      flex: 0 0 auto;
      width: 10rem;
      cursor: pointer;
    }
  }
}
</style>
