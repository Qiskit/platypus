<template>
  <section class="mini-composer">
    <div
      ref="configRef"
      class="mini-composer__config-container"
    >
      <slot />
    </div>
    <Carousel
      ref="carouselRef"
      class="mini-composer__exercise-text"
      :disable-arrows="true"
      @onSelectedChange="selectedExerciseChange"
    />
    <div class="mini-composer__gates">
      <h1 class="mini-composer__gates__title">
        Gates
      </h1>
      <GatesPool :available-gates="currentStepData.availableGates" />
    </div>
    <div class="mini-composer__circuit-section">
      <h1 class="mini-composer__circuit-section__title">
        Circuit
      </h1>
      <Circuit
        :circuit-state="currentStepData.circuitState"
        :auto-measure-gate="currentStepData.autoMeasureGate"
        @onCircuitChanged="checkCurrentStepCompleteness"
      />
    </div>
    <ProbablityChart
      class="mini-composer__probability-chart"
      :probabilities="currentStepData.startProbabilities"
    />
    <div
      ref="lessonRef"
      class="mini-composer__lesson"
      :class="{ 'mini-composer__lesson__hidden': !currentStepData.completed }"
    />
    <div class="mini-composer__footer">
      <div
        ref="footerInfoRef"
        class="mini-composer__footer__info"
        :class="{ 'mini-composer__footer__info__hidden': !currentStepData.completed }"
      />
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
import draggable from 'vuedraggable'
import Carousel from '../Carousel/Carousel.vue'
import KetCircuitLine from '../Sketch/KetCircuitLine.vue'
import AppCta from '../common/AppCta.vue'
import GatesPool from './GatesPool.vue'
import Circuit from './Circuit.vue'
import ProbablityChart from './ProbablityChart.vue'
import { ExerciseStep, ComposerGate, emptyExerciseStep } from './composerTypes'
import { GateName } from './Gate.vue'

class Props {
  goal = prop<String>({ default: 'minicomposer', required: true });
}

@Options({
  components: {
    Carousel,
    KetCircuitLine,
    Circuit,
    GatesPool,
    draggable,
    ProbablityChart,
    AppCta
  }
})
export default class MiniComposer extends Vue.with(Props) {
  configRef = ref<HTMLDivElement | null>(null)
  get configDiv () { return (this.configRef as unknown as HTMLDivElement) }
  carouselRef = ref<Carousel | null>(null)
  get carousel () { return (this.carouselRef as unknown as Carousel) }
  footerInfoRef = ref<HTMLDivElement | null>(null)
  get footerInfoDiv () { return (this.footerInfoRef as unknown as HTMLDivElement) }
  lessonRef = ref<HTMLDivElement | null>(null)
  get lessonDiv () { return (this.lessonRef as unknown as HTMLDivElement) }

  exerciseSteps: ExerciseStep[] = []

  currentStepIdx = 0

  currentStepData: ExerciseStep = emptyExerciseStep()

  infoText = 'Lorem Ipsum dolor sit amet consectetur adispicing elit'

  lastGateId = 0

  mounted () {
    const instructionsElements = Array.from<HTMLElement>(this.configDiv.querySelectorAll('.instructions'))
    const lessonsElements = Array.from<HTMLElement>(this.configDiv.querySelectorAll('.lesson'))
    const infoElements = Array.from<HTMLElement>(this.configDiv.querySelectorAll('.info'))
    const circuitElements = Array.from<HTMLElement>(this.configDiv.querySelectorAll('.circuit'))

    lessonsElements.forEach(element => this.lessonDiv.appendChild(element))
    infoElements.forEach(element => this.footerInfoDiv.appendChild(element))

    this.exerciseSteps = circuitElements.map<ExerciseStep>((stepConfigElement: HTMLElement) => {
      const autoMeasureGate = !!stepConfigElement.querySelector('.autoMeasureGate')

      const availableGatesElement = stepConfigElement.querySelector('.availableGates') as HTMLElement
      let availableGates: ComposerGate[] = []
      if (availableGatesElement.textContent !== null) {
        availableGates = this.stringToGateNameArray(availableGatesElement.textContent)
      }

      const initialCircuitElement = Array.from<HTMLElement>(stepConfigElement.querySelectorAll('.initialCircuit .qubit'))
      const circuitState: ComposerGate[][] = this.htmlElementsToCircuit(initialCircuitElement)

      const goalCircuitElements = Array.from<HTMLElement>(stepConfigElement.querySelectorAll('.goalCircuit .qubit'))
      const circuitStateGoal: ComposerGate[][] = this.htmlElementsToCircuit(goalCircuitElements)

      return {
        autoMeasureGate,

        availableGates,
        circuitState,
        circuitStateGoal,

        startProbabilities: [{ key: '0', value: 1 }, { key: '1', value: 0 }],
        endProbabilities: [{ key: '0', value: 0.5 }, { key: '1', value: 0.5 }],
        completed: false
      }
    })

    instructionsElements.forEach(element => this.carousel.elementsWrapper.appendChild(element))
    this.carousel.updateSlides()

    this.currentStepData = this.cloneCurrentStepData()
  }

  stringToGateNameArray (text: string) : ComposerGate[] {
    return text.split(' ')
      .filter(text => text !== '')
      .map<ComposerGate>((gateText: string) => {
        if (Object.values(GateName).some(gate => gate === gateText)) {
          return { name: gateText as GateName, id: this.lastGateId++ }
        }
        return { name: GateName.UNKNOWN, id: this.lastGateId++ }
      })
  }

  htmlElementsToCircuit (elements: HTMLElement[]) : ComposerGate[][] {
    return elements.map((qubitLine: HTMLElement) => {
      if (qubitLine.textContent === null) {
        return []
      }
      return this.stringToGateNameArray(qubitLine.textContent)
    })
  }

  cloneCurrentStepData () : ExerciseStep {
    const step = this.exerciseSteps[this.currentStepIdx]
    if (!step) {
      return emptyExerciseStep()
    }

    if (step.completed) {
      step.availableGates = []
      step.circuitState = Array.from(step.circuitStateGoal.map(line => Array.from(line)))
      step.startProbabilities = Array.from(step.endProbabilities)
    } else {
      step.availableGates = Array.from(step.availableGates)
      step.circuitState = Array.from(step.circuitState.map(line => Array.from(line)))
      step.startProbabilities = Array.from(step.startProbabilities)
    }
    return step
  }

  selectedExerciseChange (value :number) {
    this.lessonDiv.children[this.currentStepIdx]?.classList.remove('mini-composer__current-slide')
    this.lessonDiv.children[value]?.classList.add('mini-composer__current-slide')
    this.currentStepIdx = value
    this.currentStepData = this.cloneCurrentStepData()
  }

  checkCurrentStepCompleteness () {
    const currentCircuitState = this.currentStepData.circuitState
    const currentCircuitGoal = this.currentStepData.circuitStateGoal
    const hasSameLinesCount = currentCircuitState.length === currentCircuitGoal.length
    if (!hasSameLinesCount) {
      this.currentStepData.completed = false
      console.log('check false 1')
      return
    }

    const isCircuitCorrect = currentCircuitState.every((qubitLineState, lineIdx) => {
      const qubitLineGoal = currentCircuitGoal[lineIdx]
      const hasSameGatesCount = qubitLineState.length === qubitLineGoal.length

      const isLineCorrect = hasSameGatesCount && qubitLineState.every((gate, gateIdx) => gate.name === qubitLineGoal[gateIdx]?.name)
      return isLineCorrect
    })

    if (!isCircuitCorrect) {
      this.currentStepData.completed = false
      console.log('check false 2')
      return
    }

    console.log('check true')
    this.exerciseSteps[this.currentStepIdx].completed = true
    this.currentStepData = this.cloneCurrentStepData()
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
    "gates lesson lesson"
    "circuit lesson lesson"
    "chart lesson lesson"
    "footer footer footer";

  &__config-container {
    display: none;
  }

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
  &__lesson {
    grid-area: lesson;
    border-left: 1px solid $border-color;
    margin-bottom: $spacing-10;

    > :not(.mini-composer__current-slide) {
      display: none;
    }

    &__hidden > ::v-deep(.mini-composer__current-slide) {
      display: none;
    }
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

      &__hidden {
        display: none;
      }

      > :not(.mini-composer__current-slide) {
        display: none;
      }
    }
    &__next-button {
      flex: 0 0 auto;
      width: 10rem;
      cursor: pointer;

      &__hidden {
        display: none;
      }
    }
  }
}
</style>
