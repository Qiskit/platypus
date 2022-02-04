<template>
  <div class="eigenvector-widget">
    <EigenvectorControls
      class="eigenvector-widget__controls"
      @initialStateChanged="onInitialStateChange"
      @circuitChanged="onCircuitChange"
    />
    <div v-if="currentState?.state" class="eigenvector-widget__representation">
      <StatevectorBrackets class="eigenvector-widget__representation__brackets">
        <AmplitudeDisk
          class="eigenvector-widget__representation__disk"
          :phase="currentState.state[0].phase"
          :magnitude="currentState.state[0].magnitude"
        />
        <AmplitudeDisk
          class="eigenvector-widget__representation__disk"
          :phase="currentState.state[1].phase"
          :magnitude="currentState.state[1].magnitude"
        />
      </StatevectorBrackets>
      <div
        class="eigenvector-widget__representation__state-change"
        :class="`eigenvector-widget__representation__state-change_${currentCircuit.transitionType}`"
      >
        <EigenvectorTransitionPath
          class="eigenvector-widget__representation__state-change__path"
          :active-path="currentCircuit.transitionType"
        >
          <div class="eigenvector-widget__representation__state-change__path__empty"> Select a circuit in the selector above</div>
        </EigenvectorTransitionPath>
        <AmplitudeDisk
          class="eigenvector-widget__representation__state-change__disk eigenvector-widget__representation__state-change__disk_0"
          :phase="currentState.state[0].phase"
          :magnitude="currentState.state[0].magnitude"
        />
        <AmplitudeDisk
          class="eigenvector-widget__representation__state-change__disk eigenvector-widget__representation__state-change__disk_1"
          :phase="currentState.state[1].phase"
          :magnitude="currentState.state[1].magnitude"
        />
        <!--div class="eigenvector-widget__representation__state-change__test"/-->
      </div>
      <StatevectorBrackets class="eigenvector-widget__representation__brackets">
        <AmplitudeDisk
          class="eigenvector-widget__representation__disk"
          :phase="currentState.state[0].phase"
          :magnitude="currentState.state[0].magnitude"
        />
        <AmplitudeDisk
          class="eigenvector-widget__representation__disk"
          :phase="currentState.state[1].phase"
          :magnitude="currentState.state[1].magnitude"
        />
      </StatevectorBrackets>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";
import AmplitudeDisk from "../AmplitudeDisk/AmplitudeDisk.vue";
import StatevectorBrackets from "../Statevector/StatevectorBrackets.vue";
import EigenvectorControls, {
  InitialState,
  CircuitElement,
  unselectedCircuit,
} from "./EigenvectorControls.vue";
import EigenvectorTransitionPath from "./EigenvectorTransitionPath.vue";

export default defineComponent({
  name: "EigenvectorWidget",
  components: {
    StatevectorBrackets,
    AmplitudeDisk,
    EigenvectorControls,
    EigenvectorTransitionPath,
  },
  data() {
    return {
      currentState: {
        name: "",
        state: [
          { phase: 0, magnitude: 0.5 },
          { phase: 0, magnitude: 0.5 },
        ],
      } as InitialState,
      currentCircuit: unselectedCircuit,
      uid: Math.random().toString().replace(".", ""),
    };
  },
  methods: {
    onCircuitChange(circuit: CircuitElement) {
      this.currentCircuit = circuit;
    },
    onInitialStateChange(state: InitialState) {
      this.currentState = state;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "carbon-components/scss/globals/scss/typography";
@import "~/../scss/variables/colors.scss";

@keyframes cross-path-top {
  0% {
    top: $spacing-02;
    left: 0;
  }
  10% {
    top: $spacing-02;
    left: 0;
  }
  25% {
    top: $spacing-02;
    left: calc(50% - 4rem);
  }
  27% {
    top: $spacing-02;
  }
  42% {
    top: calc(#{$spacing-02} + 3rem + #{$spacing-06});
  }
  50% {
    top: calc(#{$spacing-02} + 3rem + #{$spacing-06});
    left: calc(50% + 1rem);
  }
  75% {
    top: calc(#{$spacing-02} + 3rem + #{$spacing-06});
    left: calc(50% + 1rem);
  }
  90% {
    top: calc(#{$spacing-02} + 3rem + #{$spacing-06});
    left: calc(100% - 3rem);
  }
  100% {
    top: calc(#{$spacing-02} + 3rem + #{$spacing-06});
    left: calc(100% - 3rem);
  }
}
@keyframes cross-path-bottom {
  0% {
    top: calc(#{$spacing-02} + 3rem + #{$spacing-06});
    left: 0;
  }
  10% {
    top: calc(#{$spacing-02} + 3rem + #{$spacing-06});
    left: 0;
  }
  25% {
    top: calc(#{$spacing-02} + 3rem + #{$spacing-06});
    left: calc(50% - 4rem);
  }
  50% {
    top: calc(#{$spacing-02} + 3rem + #{$spacing-06});
    left: calc(50% - 4rem);
  }
  52% {
    top: calc(#{$spacing-02} + 3rem + #{$spacing-06});
  }
  67% {
    top: $spacing-02;
  }
  75% {
    top: $spacing-02;
    left: calc(50% + 1rem);
  }
  90% {
    top: $spacing-02;
    left: calc(100% - 3rem);
  }
  100% {
    top: $spacing-02;
    left: calc(100% - 3rem);
  }
}

@keyframes straight-path {
  0% {
    left: 0;
  }
  100% {
    left: calc(100% - 3rem);
  }
}

.eigenvector-widget {
  &__representation {
    display: flex;
    flex-direction: row;
    padding: $spacing-05 $spacing-03;
    background-color: $background-color-white;

    &__state-change {
      position: relative;
      flex: 1 0;

      &__path {
        height: 8rem;
        &__empty {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      &__test {
        position: absolute;
        top: 0;
        height: 8rem;
        width: 2rem;
        left: 10rem;
        background-color: rgba(256, 256, 256, 0.8);
      }

      &__disk {
        display: none;
        position: absolute;
        left: calc(50% - 4rem);
        animation-iteration-count: infinite;

        &_0 {
          top: $spacing-02;
        }
        &_1 {
          top: calc(#{$spacing-02} + 3rem + #{$spacing-06});
        }
      }

      &_straight #{&}__disk {
        display: block;
        animation-name: straight-path;
        animation-duration: 3s;
      }
      &_cross #{&}__disk {
        display: block;
        animation-duration: 7s;
        &_0 {
          top: $spacing-02;
          animation-name: cross-path-top;
        }
        &_1 {
          top: calc(#{$spacing-02} + 3rem + #{$spacing-06});
          animation-name: cross-path-bottom;
        }
      }
    }

    &__brackets {
      display: flex;
      flex-direction: column;
      gap: $spacing-06;
      flex: 0 0 4rem;
      padding: $spacing-02 $spacing-03;
    }

    &__state-change__disk,
    &__disk {
      height: 3rem;
      width: 3rem;
      margin: 0;
    }
  }
}
</style>
