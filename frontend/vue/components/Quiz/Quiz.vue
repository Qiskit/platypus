<template>
  <div class="quiz">
    <div
      ref="configRef"
      class="quiz__config-container"
    >
      <slot />
    </div>
    <div v-if="question" class="quiz__question" v-html="question" />
    <ol class="quiz__answer-container">
      <li v-for="(html, i) in answers" :key="i - 1" class="quiz__answer-container__element">
        <input
          :id="`${i}-${uid}`"
          v-model="selected"
          type="radio"
          :name="`quiz-${uid}`"
          :value="`${i}`"
          :disabled="solved()"
          class="quiz__answer-container__element__radio"
        >
        <label
          :for="`${i}-${uid}`"
          class="quiz__answer-container__element__label"
          :class="{
            'quiz__answer-container__element__label_correct': solved(),
            'quiz__answer-container__element__label_wrong': !solved(),
          }"
          :style="`--list-item-text: '${listIndexText(i)}'`"
          v-html="html"
        />
        <SolutionStateIndicator class="quiz__answer-container__element__state-indicator" :state="solutionState()" />
      </li>
    </ol>
    <SolutionStateIndicator v-if="selected" class="quiz__general-state-indicator" :state="solutionState()" />
  </div>
</template>

<script lang="ts">
import { Options, Vue, prop } from 'vue-class-component'
import { ref } from 'vue'
import SolutionStateIndicator, { SolutionState } from '../common/SolutionStateIndicator.vue'

class Props {
  goal = prop<String>({ default: 'quiz-solved', required: true });
}

@Options({
  components: {
    SolutionStateIndicator
  }
})
export default class Quiz extends Vue.with(Props) {
  configRef = ref<HTMLElement | null>(null)
  get config () { return (this.configRef as unknown as HTMLElement) }

  answers: string[] = []
  question: string = ''
  correctIndex: string = ''
  selected: string = ''
  isScored: boolean = false

  resultInfo: string = ''
  codeLineLastId: number = 0

  mounted () {
    const questionElement = this.config.querySelector('.question')
    this.question = questionElement?.innerHTML || ''
    const optionElements = Array.from(this.config.querySelectorAll('.option'))
    const optionElementsShuffled = this.shuffle(optionElements)
    this.answers = optionElementsShuffled.map(element => element.innerHTML)
    let correctElementIdx = optionElementsShuffled.findIndex(element => element.hasAttribute('x') || element.hasAttribute('correct'))
    if (correctElementIdx === -1) {
      correctElementIdx = optionElementsShuffled.findIndex(element => element === optionElements[0])
    }
    this.correctIndex = `${correctElementIdx}`

    while (this.config.hasChildNodes()) {
      this.config.childNodes[0].remove()
    }
  }

  shuffle<T> (input: T[]) : T[] {
    const array = Array.from(input)

    for (let i = 0; i < array.length - 1; i++) {
      const randomChoiceIndex: number = this.random(0, array.length - 1);
      [array[i], array[randomChoiceIndex]] = [array[randomChoiceIndex], array[i]]
    }

    return array
  }

  random (min: number, max: number) : number {
    const r = Math.random() * (max - min + 1)
    return Math.floor(r) + min
  }

  solved () : boolean {
    const isSolved = this.selected === this.correctIndex
    if (isSolved && !this.isScored) {
      this.isScored = true
      this.$step?.score(this.goal as string)
    }
    return isSolved
  }

  solutionState () : SolutionState {
    const quizTitle = this.goal
    const sectionElement = document.getElementsByTagName('x-course')[0]
    const sectionTitle = sectionElement.getAttribute('data-section')
    const windowInstance = (window as any)

    if (this.solved()) {
      // Segment tracking correct
      windowInstance.textbook.trackClickEvent(`${sectionTitle} > ${quizTitle} > correct`)
      return SolutionState.CORRECT
    }

    // Segment tracking incorrect responses
    if (windowInstance?.textbook?.trackClickEvent) {
      windowInstance.textbook.trackClickEvent(`${sectionTitle} > ${quizTitle} > incorrect`)
    }

    return SolutionState.WRONG
  }

  listIndexText (index: number) {
    return String.fromCharCode(65 + index)
  }

  uid = Math.random().toString().replace('.', '')
}
</script>
<style scoped lang="scss">
@import 'carbon-components/scss/globals/scss/typography';
@import 'carbon-components/scss/globals/scss/layout';
@import '../../../scss/variables/colors.scss';
@import '~/../scss/variables/mq.scss';

.quiz {
  display: flex;
  flex-direction: row;

  @include mq($until: medium) {
    flex-direction: column;
  }

  &__config-container {
    display: none;
  }
  &__question {
    @include type-style('body-long-01');
    flex: 0 0 160px;
    margin-right: $spacing-05;

    @include mq($until: medium) {
      flex: 1;
      margin-right: 0;
      margin-bottom: $spacing-05;
    }
  }
  &__answer-container {
    display: flex;
    flex: 3;
    flex-direction: column;
    list-style-type: upper-alpha;
    list-style-position: inside;

    @include mq($until: medium) {
      flex: 1;
    }

    &__element {
      display: flex;
      flex-direction: row;
      margin: 0 0 $spacing-03 0;

      &__radio {
        transition: border 0.2s ease-out;
        display: none;
      }
      &__label {
        @include type-style('body-long-01');
        flex: 1;
        border: 1px solid transparent;
        background-color: $background-color-white;
        padding: $spacing-02 $spacing-03;
        display: flex;
        flex-direction: row;
        min-height: 50px;
        cursor: pointer;

        &:hover {
          border: 1px solid $border-color;
        }
        &::before {
          @include type-style('heading-01');
          content: var(--list-item-text);
          margin-right: $spacing-05;
          flex: 0 0 auto;
        }
        &::v-deep(ol) {
          margin: 0;
        }
        &::v-deep(ol li) {
          display: inline;
          margin: 0;
        }
      }
      &__state-indicator {
        flex: 0 0 auto;
        opacity: 0;
        height: auto;

        @include mq($until: medium) {
          display: none;
        }
      }
      &__radio:checked ~ &__state-indicator {
        transition: opacity 0.2s ease-out;
        opacity: 1;
      }
      &__radio:checked ~ &__label_correct {
        border: 1px solid $status-color-correct;
      }
      &__radio:checked ~ &__label_wrong {
        border: 1px solid $status-color-wrong;
      }
    }
  }
  &__general-state-indicator {
    width: 100%;

    @include mq($from: medium) {
      display: none;
    }
  }
}
</style>
