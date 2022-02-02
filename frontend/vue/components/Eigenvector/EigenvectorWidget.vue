<template>
  <div class="eigenvector-widget">
    <div class="eigenvector-widget__input">
      <h5 class="eigenvector-widget__input__title">Input</h5>
      <bx-dropdown
        class="eigenvector-widget__input__dropdown"
        :trigger-content="currentState"
        :value="currentState"
        @bx-dropdown-beingselected="stateSelected($event)"
      >
        <bx-dropdown-item
          v-for="state in initialStates"
          :key="state.name"
          class="eigenvector-widget__input__dropdown__item"
          :value="state"
        >
          {{ state.name }}
        </bx-dropdown-item>
      </bx-dropdown>
    </div>
    <div class="eigenvector-widget__circuit">
      <h5 class="eigenvector-widget__circuit__title">Circuit</h5>
      <div class="eigenvector-widget__circuit__selector">
        <input
          class="eigenvector-widget__circuit__selector__element"
          type="radio"
          :id="`x-${uid}`"
          :name="uid"
          value="x"
        />
        <label :for="`x-${uid}`"> X </label>
        <input
          class="eigenvector-widget__circuit__selector__element"
          type="radio"
          :id="`y-${uid}`"
          :name="uid"
          value="y"
        />
        <label :for="`y-${uid}`"> Y </label>
        <input
          class="eigenvector-widget__circuit__selector__element"
          type="radio"
          :id="`z-${uid}`"
          :name="uid"
          value="x"
        />
        <label :for="`z-${uid}`"> Z </label>
      </div>
    </div>
    <div class="eigenvector-widget__representation">
      <StatevectorBrackets
        class="eigenvector-widget__representation__brackets"
      >
        <AmplitudeDisk
          class="eigenvector-widget__representation__disk"
          :phase="currentState.state[0].phase"
          :magnitude="currentState.state[0].magnitude"
          :isInteractive="false"
          :showControls="false"
        />
        <AmplitudeDisk
          class="eigenvector-widget__representation__disk"
          :phase="currentState.state[1].phase"
          :magnitude="currentState.state[1].magnitude"
          :isInteractive="false"
          :showControls="false"
        />
      </StatevectorBrackets>
      <div class="eigenvector-widget__representation__state-change">
        <svg class="eigenvector-widget__representation__state-change__cross-path" viewBox="0 0 1000 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M435 10 l-1000 0 M435 10 c20 0 20 0 40 40 l50 100 c20 40 20 40 40 40 l1000 0" stroke="#343A3F" stroke-width="3"/>
          <path d="M435 10 l-1000 0 M435 10 c20 0 20 0 40 40 l50 100 c20 40 20 40 40 40 l1000 0" stroke="#343A3F" stroke-width="3" transform="translate(0 200) scale(1 -1)"/>
        </svg>
        <svg class="eigenvector-widget__representation__state-change__straight-path" viewBox="0 0 1000 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 10 l2000 0" stroke="#343A3F" stroke-width="3"/>
          <path d="M0 190 l2000 0" stroke="#343A3F" stroke-width="3"/>
        </svg>
      </div>
      <StatevectorBrackets
        class="eigenvector-widget__representation__brackets"
      >
        <AmplitudeDisk
          class="eigenvector-widget__representation__disk"
          :phase="currentState.state[0].phase"
          :magnitude="currentState.state[0].magnitude"
          :isInteractive="false"
          :showControls="false"
        />
        <AmplitudeDisk
          class="eigenvector-widget__representation__disk"
          :phase="currentState.state[1].phase"
          :magnitude="currentState.state[1].magnitude"
          :isInteractive="false"
          :showControls="false"
        />
      </StatevectorBrackets>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";
import AmplitudeDisk from "../AmplitudeDisk/AmplitudeDisk.vue";
import StatevectorBrackets from "../Statevector/StatevectorBrackets.vue";

export default defineComponent({
  name: "EigenvectorWidget",
  components: {
    StatevectorBrackets,
    AmplitudeDisk,
  },
  data() {
    return {
      initialStates: [
        {
          name: "|+>",
          state: [
            { phase: 0, magnitude: 0.5 },
            { phase: 0, magnitude: 0.5 },
          ],
        },
        {
          name: "|->",
          state: [
            { phase: 180, magnitude: 0.5 },
            { phase: 180, magnitude: 0.5 },
          ],
        },
        {
          name: "|0>",
          state: [
            { phase: 0, magnitude: 1 },
            { phase: 0, magnitude: 0 },
          ],
        },
        {
          name: "|1>",
          state: [
            { phase: 0, magnitude: 0 },
            { phase: 0, magnitude: 1 },
          ],
        },
      ],
      currentState: {
        name: "|+>",
        state: [
          { phase: 0, magnitude: 0.5 },
          { phase: 0, magnitude: 0.5 },
        ],
      },
      uid: Math.random().toString().replace(".", ""),
    };
  },
  mounted() {
    this.currentState = this.initialStates[0];
  },
});
</script>

<style lang="scss" scoped>
@import "carbon-components/scss/globals/scss/typography";
@import "~/../scss/variables/colors.scss";

.eigenvector-widget {
  &__representation {
    display: flex;
    flex-direction: row;
    
    &__state-change {
      flex: 1 0;
      overflow: hidden;

      &__straight-path,
      &__cross-path {
        position: relative;
        transform: translate(-50%, 0);
        left: 50%;

        max-width: none;
        height: 65%;
        top: 17.5%;
      }
    }

    &__brackets {
      display: flex;
      flex-direction: column;
      gap: $spacing-06;
      flex: 0 0 4rem;
      padding: $spacing-01 $spacing-03;
    }
    
    &__disk {
      height: 3rem;
      width: 3rem;
      margin: 0;
    }
  }
}
</style>
