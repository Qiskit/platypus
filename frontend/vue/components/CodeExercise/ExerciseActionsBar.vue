<template>
  <div class="exercise-actions-bar">
    <button
      v-if="runEnabled"
      class="exercise-actions-bar__button exercise-actions-bar__button_run"
      @click="run()"
    >
      Run
    </button>
    <button
      v-if="gradeEnabled"
      class="exercise-actions-bar__button exercise-actions-bar__button_grade"
      @click="grade()"
    >
      Grade
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'

export default defineComponent({
  name: 'ExerciseActionsBar',
  props: {
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
      this.$emit('run')
    },
    grade () {
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
      @include bicolor-background($button-background-color-dark, $button-background-color-tertiary);
    }
  }
}
</style>
