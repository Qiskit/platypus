<template>
  <div class="eigenvector-widget">
    <EigenvectorControls
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
        :class="[
          `eigenvector-widget__representation__state-change_${currentCircuit.name.toLowerCase()}`,
          { 'eigenvector-widget__representation__state-change_pause': !isPlaying }
        ]"
      >
        <EigenvectorTransitionPath
          class="eigenvector-widget__representation__state-change__path"
          :active-path="currentCircuit.transitionType"
        >
          <div
            class="
              eigenvector-widget__representation__state-change__path__empty
            "
          >
            {{ $translate("Select a circuit in the selector above") }}
          </div>
        </EigenvectorTransitionPath>
        <AmplitudeDisk
          class="
            eigenvector-widget__representation__state-change__disk
            eigenvector-widget__representation__state-change__disk_0
          "
          :phase="transitionState[0].phase"
          :magnitude="transitionState[0].magnitude"
          @animationcancel="animationCancel"
          @animationiteration="animationStart"
          @animationstart="animationStart"
          @animationend="animationEnd"
        />
        <AmplitudeDisk
          class="
            eigenvector-widget__representation__state-change__disk
            eigenvector-widget__representation__state-change__disk_1
          "
          :phase="transitionState[1].phase"
          :magnitude="transitionState[1].magnitude"
        />
      </div>
      <StatevectorBrackets class="eigenvector-widget__representation__brackets">
        <AmplitudeDisk
          v-if="currentCircuit?.name !== ''"
          class="eigenvector-widget__representation__disk"
          :phase="endState[0].phase"
          :magnitude="endState[0].magnitude"
        />
        <AmplitudeDisk
          v-if="currentCircuit?.name !== ''"
          class="eigenvector-widget__representation__disk"
          :phase="endState[1].phase"
          :magnitude="endState[1].magnitude"
        />
      </StatevectorBrackets>
    </div>
    <div class="eigenvector-widget__play-control">
      <label
        class="eigenvector-widget__play-control__label"
        :for="`play-${uid}`"
      >
        {{ isPlaying ? $translate("Stop animation") : $translate("Play animation")}}
      </label>
      <label :for="`play-${uid}`">
        <PauseIcon v-if="isPlaying" />
        <PlayIcon v-else />
      </label>
      <input
        class="eigenvector-widget__play-control__checkbox"
        :id="`play-${uid}`"
        type="checkbox"
        :checked="isPlaying"
        @change="switchPlayState"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";
import AmplitudeDisk from "../AmplitudeDisk/AmplitudeDisk.vue";
import { Amplitude } from "../AmplitudeDisk/amplitude";
import StatevectorBrackets from "../Statevector/StatevectorBrackets.vue";
import EigenvectorControls, {
  InitialState,
  CircuitElement,
  unselectedCircuit,
} from "./EigenvectorControls.vue";
import EigenvectorTransitionPath from "./EigenvectorTransitionPath.vue";
import PauseIcon from "@carbon/icons-vue/lib/pause--filled/20";
import PlayIcon from "@carbon/icons-vue/lib/play--filled--alt/20";

export default defineComponent({
  name: "EigenvectorWidget",
  components: {
    StatevectorBrackets,
    AmplitudeDisk,
    EigenvectorControls,
    EigenvectorTransitionPath,
    PauseIcon,
    PlayIcon,
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
      transitionState: [
        { phase: 0, magnitude: 0.5 },
        { phase: 0, magnitude: 0.5 },
      ],
      timeout: [] as NodeJS.Timeout[],
      animationFrame: [] as number[],
      isPlaying: true,
    };
  },
  computed: {
    endState(): Amplitude[] {
      const initialState = this.currentState.state;
      const stateDelta = this.currentCircuit.stateDelta;
      const newState = [
        {
          phase: initialState[0].phase + stateDelta[0].phase,
          magnitude: initialState[0].magnitude + stateDelta[0].magnitude,
        },
        {
          phase: initialState[1].phase + stateDelta[1].phase,
          magnitude: initialState[1].magnitude + stateDelta[1].magnitude,
        },
      ];

      if (this.currentCircuit.transitionType === "cross") {
        return [newState[1], newState[0]];
      } else {
        return newState;
      }
    },
  },
  methods: {
    onCircuitChange(circuit: CircuitElement) {
      this.currentCircuit = circuit;
    },
    onInitialStateChange(state: InitialState) {
      this.currentState = state;
      this.resetAnimation();
    },
    clearTimers() {
      clearTimeout(this.timeout[0]);
      clearTimeout(this.timeout[1]);

      cancelAnimationFrame(this.animationFrame[0]);
      cancelAnimationFrame(this.animationFrame[1]);

      this.timeout = [];
      this.animationFrame = [];
    },
    setProgress(progress: number, idx: number) {
      const initialState = this.currentState.state;
      const stateDelta = this.currentCircuit.stateDelta;

      this.transitionState[idx] = {
        phase: initialState[idx].phase + stateDelta[idx].phase * progress,
        magnitude:
          initialState[idx].magnitude + stateDelta[idx].magnitude * progress,
      };
    },
    animateState(idx: number) {
      const ANIMATION_TIME = 1000;
      const initialTime = new Date().getTime();

      const frame = () => {
        const timeDiff = new Date().getTime() - initialTime;
        const progress = Math.min(timeDiff / ANIMATION_TIME, 1);
        this.setProgress(progress, idx);
        this.animationFrame[idx] =
          progress < 1 ? requestAnimationFrame(frame) : -1;
      };

      frame();
    },
    resetAnimation() {
      this.clearTimers();
      this.setProgress(0, 0);
      this.setProgress(0, 1);
    },
    animationStart() {
      this.resetAnimation();

      const timeoutTimes =
        this.currentCircuit.transitionType === "cross"
          ? [1500, 3500]
          : [500, 500];

      this.timeout[0] = setTimeout(() => {
        this.animateState(0);
      }, timeoutTimes[0]);
      this.timeout[1] = setTimeout(() => {
        this.animateState(1);
      }, timeoutTimes[1]);
    },
    animationEnd() {
      this.resetAnimation();
    },
    animationCancel() {
      this.resetAnimation();
    },
    switchPlayState(ev: Event) {
      this.isPlaying = (ev.target as HTMLInputElement).checked;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "carbon-components/scss/globals/scss/typography";
@import "~/../scss/variables/colors.scss";

@mixin cross-path-top($name) {
  @keyframes #{$name} {
    0% {
      top: $spacing-02;
      left: -3.5rem;
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
      left: calc(100% + 0.5rem);
    }
    100% {
      top: calc(#{$spacing-02} + 3rem + #{$spacing-06});
      left: calc(100% + 0.5rem);
    }
  }
}

@mixin cross-path-bottom($name) {
  @keyframes #{$name} {
    0% {
      top: calc(#{$spacing-02} + 3rem + #{$spacing-06});
      left: -3.5rem;
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
      left: calc(100% + 0.5rem);
    }
    100% {
      top: $spacing-02;
      left: calc(100% + 0.5rem);
    }
  }
}

@include cross-path-top(x-path-top);
@include cross-path-top(y-path-top);
@include cross-path-bottom(x-path-bottom);
@include cross-path-bottom(y-path-bottom);

@keyframes straight-path {
  0% {
    left: -3.5rem;
  }
  100% {
    left: calc(100% + 0.5rem);
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
      padding: 0 $spacing-05;

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

      &_z #{&}__disk {
        display: block;
        animation-name: straight-path;
        animation-duration: 3s;
      }

      &_x #{&}__disk,
      &_y #{&}__disk {
        display: block;
        animation-duration: 7s;

        &_0 {
          top: $spacing-02;
        }
        &_1 {
          top: calc(#{$spacing-02} + 3rem + #{$spacing-06});
        }
      }

      &_x #{&}__disk {
        &_0 {
          animation-name: x-path-top;
        }
        &_1 {
          animation-name: x-path-bottom;
        }
      }
      &_y #{&}__disk {
        &_0 {
          animation-name: y-path-top;
        }
        &_1 {
          animation-name: y-path-bottom;
        }
      }

      &_pause #{&}__disk {
        display: none;
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
  &__play-control {
    padding: $spacing-04;
    display: flex;
    flex-direction: row;
    color: $active-color;

    &__label {
      @include type-style("body-long-01");
      flex: 0 0 7rem;
    }
    &__checkbox {
      display: none !important;
    }
  }
}
</style>
