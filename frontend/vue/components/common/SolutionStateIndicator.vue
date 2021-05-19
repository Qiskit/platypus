<template>
  <div
    class="solution-state-indicator"
    :class="{
      'solution-state-indicator_not-finished' : state == 0,
      'solution-state-indicator_correct' : state == 1,
      'solution-state-indicator_wrong' : state == 2
    }"
  >
    <CheckmarkFilled v-if="state === 1" class="solution-state-indicator__icon" />
    <ErrorFilled v-else-if="state === 2" class="solution-state-indicator__icon" />
    <PendingFilled v-else class="solution-state-indicator__icon" />
    <span class="solution-state-indicator__text"> {{ texts[state] }} </span>
  </div>
</template>

<script lang="ts">
import { Options, prop, Vue } from 'vue-class-component'
import CheckmarkFilled from '@carbon/icons-vue/es/checkmark--filled/32'
import ErrorFilled from '@carbon/icons-vue/es/error--filled/32'
import PendingFilled from '@carbon/icons-vue/es/pending--filled/32'

export enum SolutionState {
  NOT_FINISHED = 0,
  CORRECT = 1,
  WRONG = 2
}

class Props {
  state = prop<SolutionState>({ default: SolutionState.NOT_FINISHED })
  texts = prop<string[]>({ default: ['Keep Going', 'That\'s correct', 'Not quite'] })
}

@Options({
  components: {
    CheckmarkFilled,
    ErrorFilled,
    PendingFilled
  }
})
export default class SolutionStateIndicator extends Vue.with(Props) {}

</script>
<style scoped lang="scss">
@import '~/../scss/variables/colors.scss';
@import '~/../scss/variables/fonts.scss';

.solution-state-indicator {
  min-height: 50px;
  width: 160px;
  background-color: $background-color-light-2;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 12px;

  &_correct {
    background-color: $status-color-correct;
  }
  &_wrong {
    background-color: $status-color-wrong;
  }

  &__icon {
    margin-right: 8px;
    flex-basis: 28px;
  }

  &__text {
    font-family: $plex-sans;
    color: $text-color-dark;
    font-weight: bold;
    flex-grow: 1;
  }
}
</style>
