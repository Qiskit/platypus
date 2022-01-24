<template>
  <div class="exercise-actions-bar">
    <button
      v-if="runEnabled && !isRunning"
      class="exercise-actions-bar__button exercise-actions-bar__button_run"
      @click="run()"
    >
      Run
    </button>
    <button
      v-if="gradeEnabled && !isRunning"
      class="exercise-actions-bar__button exercise-actions-bar__button_grade"
      @click="grade()"
    >
      Grade
    </button>
    <div v-if="isRunning" class="exercise-actions-bar__running-indicator">
      <bx-loading class="exercise-actions-bar__running-indicator__icon" assistive-text="Running" type="small" />
      <span class="exercise-actions-bar__running-indicator__label"> Running </span>
    </div>
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
    }
  },
  methods: {
    run () {
      if (this.isRunning) {
        return
      }
      this.$emit('run')
    },
    grade () {
      if (this.isRunning) {
        return
      }
      this.$emit('grade')
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
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

    &_run {
      @include bicolor-background($button-background-color-quaternary-dark, $button-background-color-quaternary);
    }
  }

  &__running-indicator {
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
  }
}
</style>
