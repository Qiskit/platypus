<template>
  <div @click="showTooltip" class="annotation">
    <span href="#" class="annotation__label" :class="{ 'annotation__label_active': tooltipVisible }" >{{content}}</span>
    <div v-if="tooltipVisible" class="annotation__content">{{information}}</div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

export default {
  data() {
    return {
      tooltipVisible: false
    }
  },
  props: {
    content: String,
    information: String
  },
  methods: {
    showTooltip() {
      console.log(this.tooltipVisible, "isvisible")
      this.tooltipVisible = !this.tooltipVisible
    }
  }


}
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';

.annotation {
  display: inline;
  position: relative;

  &:hover {
    cursor: pointer;

    .annotation__label {
      background-color: $magenta-10;
      box-shadow: none;
      text-decoration: none;
    }
  }

  &__label {
    border-bottom: 2px solid $magenta-60;
    padding: 0 $spacing-01;
    margin: 0 -$spacing-01;
    border-radius: 0;
    color: black;

    &_active {
      background-color: $magenta-10;
      border-bottom: initial;  
      position: relative;
    }

    &_active + .annotation__content::after {
      content: " ";
      position: absolute;
      bottom: 100%;  /* At the top of the tooltip */
      left: $spacing-05;
      margin-left: -$spacing-01;
      border-width: .5rem;
      border-style: solid;
      border-color: transparent transparent $magenta-60 transparent;
    }

    &:active + .annotation__content {
      display: block;
    }

  }

  &__content {
    @include type-style('body-short-01');
    background-color: $magenta-10;
    border-top: 2px solid $magenta-60;
    border-bottom: 2px solid $magenta-60;
    position: absolute;
    left: -.15rem;
    top: 1.75rem;
    padding: $spacing-05;
    min-width: 12rem;
    z-index: 1;
  }
}
</style>
