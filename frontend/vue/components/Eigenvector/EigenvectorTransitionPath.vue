<template>
  <div class="eigenvector-transition-path">
    <svg
      v-if="internalActivePath === 'cross'"
      class="eigenvector-transition-path__path"
      viewBox="0 0 1000 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M435 10 l-1000 0 M435 10 c20 0 20 0 40 40 l50 100 c20 40 20 40 40 40 l1000 0"
        stroke="#343A3F"
        stroke-width="3"
      />
      <path
        d="M435 10 l-1000 0 M435 10 c20 0 20 0 40 40 l50 100 c20 40 20 40 40 40 l1000 0"
        stroke="#343A3F"
        stroke-width="3"
        transform="translate(0 200) scale(1 -1)"
      />
    </svg>
    <svg
      v-if="internalActivePath === 'straight'"
      class="eigenvector-transition-path__path"
      viewBox="0 0 1000 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 10 l2000 0" stroke="#343A3F" stroke-width="3" />
      <path d="M0 190 l2000 0" stroke="#343A3F" stroke-width="3" />
    </svg>
    <div class="eigenvector-transition-path__empty-box" v-if="!internalActivePath">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";

export default defineComponent({
  name: "EigenvectorTransitionPath",
  props: {
    activePath: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      internalActivePath: ''
    }
  },
  watch: {
    activePath (newVal) {
      console.log(newVal)
      this.internalActivePath = newVal
    }
  },
  mounted () {
    this.internalActivePath = this.activePath
  }
});
</script>

<style lang="scss" scoped>
@import "carbon-components/scss/globals/scss/typography";
@import "~/../scss/variables/colors.scss";

.eigenvector-transition-path {
  position: relative;
  overflow: hidden;

  &__path {
    position: absolute;
    transform: translate(-50%, 0);
    left: 50%;

    max-width: none;
    height: 65%;
    top: 17.5%;
  }
  &__empty-box {
    height: 100%;
  }
}
</style>
