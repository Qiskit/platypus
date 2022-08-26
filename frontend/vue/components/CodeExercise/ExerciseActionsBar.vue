<template>
  <div class="exercise-actions-bar">
    <button
      v-if="runEnabled && !isRunning && !isApiTokenNeeded"
      class="exercise-actions-bar__button exercise-actions-bar__button_run"
      @click="run(isApiTokenNeeded)"
    >
      {{ $translate('Run') }}
    </button>
    <button
      v-if="gradeEnabled && !isRunning && !isApiTokenNeeded"
      class="exercise-actions-bar__button"
      @click="grade()"
    >
      {{ $translate('Grade') }}
    </button>
    <div v-if="isRunning" class="exercise-actions-bar__indicator" :class="{ 'exercise-actions-bar__indicator__grading': isGrading }">
      <bx-loading class="exercise-actions-bar__indicator__icon" assistive-text="Running" type="small" />
      <span v-if="isGrading" class="exercise-actions-bar__indicator__label">{{ $translate('Grading') }}</span>
      <span v-else class="exercise-actions-bar__indicator__label">{{ $translate('Running') }}</span>
    </div>
    <button v-if="isApiTokenNeeded" class="exercise-actions-bar__button exercise-actions-bar__button_disabled" disabled>
      <span>{{ $translate('Run') }}</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import 'carbon-web-components/es/components/loading/loading'

export default defineComponent({
  name: 'ExerciseActionsBar',
  props: {
    isRunning: {
      type: Boolean,
      required: false,
      default: true
    },
    runEnabled: {
      type: Boolean,
      required: false,
      default: true
    },
    gradeEnabled: {
      type: Boolean,
      required: false,
      default: true
    },
    isApiTokenNeeded: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data () {
    return {
      isGrading: false
    }
  },
  methods: {
    run (onHardware = false) {
      if (!this.isRunning) {
        this.isGrading = false
        this.$emit('run', onHardware)
      }
    },
    grade () {
      if (!this.isRunning) {
        this.isGrading = true
        this.$emit('grade')
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/spacing';
@import '~/../scss/variables/colors.scss';
@import '~/../scss/variables/settings.scss';
@import '~/../scss/variables/mq.scss';

@mixin bicolor-background($colorLeft, $colorRight) {
  background-image: linear-gradient(90deg, $colorLeft 0%, $colorLeft 50%, $colorRight 50%, $colorRight 100%);
}

.exercise-actions-bar {
  display: flex;
  justify-content: flex-end;

  &__button {
    padding: $spacing-03;
    width: $column-size-large;
    max-width: 100%;

    background-size: 200% 100%;
    background-position-x: 100%;
    transition: background-position-x 0.3s ease-out, color 0.3s ease-out;

    &:hover,
    &:focus {
      background-position-x: 0;
    }

    @include bicolor-background($button-background-color-dark, $button-background-color);
    color: $button-text-color;

    &_disabled {
      background-color: $disabled-background-color;
      background-image: none;
      color: $text-color-lighter;
      cursor: not-allowed;
    }

    &_run {
      @include bicolor-background($button-background-color-quaternary-dark, $button-background-color-quaternary);
    }
  }

  &__indicator {
    display: flex;
    height: 2.25rem;
    background-color: $button-background-color-quaternary;
    justify-content: center;
    align-items: center;
    gap: $spacing-03;
    padding: $spacing-03 $spacing-04;

    &__icon {
      display: block;
      width: 1.25rem;
      height: 1.25rem;
      --cds-interactive-04: #{$border-color-tertiary};
    }
    &__label {
      color: $button-text-color;
    }

    &__grading {
      background-color: $button-background-color;
    }
  }
}
</style>
