<template>
  <div class="eigenvector-controls">
    <div class="eigenvector-controls__input">
      <h6>{{ $translate("Input") }}</h6>
      <bx-dropdown
        class="eigenvector-controls__input__dropdown"
        :trigger-content="currentState"
        :value="currentState"
        @bx-dropdown-beingselected="stateSelected($event)"
      >
        <bx-dropdown-item
          v-for="state in initialStates"
          :key="state.name"
          :value="state"
        >
          {{ state.name }}
        </bx-dropdown-item>
      </bx-dropdown>
    </div>
    <div class="eigenvector-controls__circuit">
      <h6>{{ $translate("Circuit") }}</h6>
      <div class="eigenvector-controls__circuit__selector">
        <div
          v-for="circuit in circuitList"
          :key="circuit.name"
          class="eigenvector-controls__circuit__selector__element__wrapper"
        >
          <input
            class="eigenvector-controls__circuit__selector__element"
            type="radio"
            :id="`${circuit.name}-${uid}`"
            :name="uid"
            :value="circuit.name"
            @click="(event) => onRadioClick(event, circuit)"
          />
          <label
            class="eigenvector-controls__circuit__selector__element-label"
            :class="{
              'eigenvector-controls__circuit__selector__element-label_active-selection':
                currentCircuit.name,
            }"
            :for="`${circuit.name}-${uid}`"
          >
            {{ circuit.name }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";
import { Amplitude } from "../AmplitudeDisk/amplitude";

export const unselectedCircuit = {
  name: "",
  transitionType: "",
  stateDelta: [
    { phase: 0, magnitude: 0 },
    { phase: 0, magnitude: 0 },
  ],
};

export interface InitialState {
  name: string;
  state: Amplitude[];
}

export interface CircuitElement {
  name: string;
  transitionType: string;
  stateDelta: Amplitude[]
}

export default defineComponent({
  name: "EigenvectorControls",
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
            { phase: 0, magnitude: 0.5 },
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
      ] as InitialState[],
      currentState: {
        name: "|+>",
        state: [
          { phase: 0, magnitude: 0.5 },
          { phase: 0, magnitude: 0.5 },
        ],
      } as InitialState,
      circuitList: [
        {
          name: "X",
          transitionType: "cross",
          stateDelta: [
            { phase: 0, magnitude: 0 },
            { phase: 0, magnitude: 0 },
          ],
        },
        {
          name: "Y",
          transitionType: "cross",
          stateDelta: [
            { phase: -90, magnitude: 0 },
            { phase: 90, magnitude: 0 },
          ],
        },
        {
          name: "Z",
          transitionType: "straight",
          stateDelta: [
            { phase: 0, magnitude: 0 },
            { phase: 180, magnitude: 0 },
          ],
        },
      ],
      currentCircuit: unselectedCircuit,
      uid: Math.random().toString().replace(".", ""),
    };
  },
  mounted() {
    this.currentState = this.initialStates[0];
    this.$emit("initialStateChanged", this.currentState);
    this.$emit("circuitChanged", this.currentCircuit);
  },
  methods: {
    onRadioClick(
      ev: PointerEvent,
      obj: CircuitElement
    ) {
      const radio = ev.target as HTMLInputElement;
      
      if (obj.name === this.currentCircuit.name) {
        this.unselectCircuit(radio);
      } else {
        this.currentCircuit = obj;
      }
      this.$emit("circuitChanged", this.currentCircuit);
    },
    unselectCircuit(radioButton: HTMLInputElement) {
      this.currentCircuit = unselectedCircuit;
      radioButton.checked = false;
    },
    stateSelected(ev: CustomEvent) {
      this.currentState = ev.detail.item.value;
      this.$emit("circuitChanged", unselectedCircuit);
      this.$emit("initialStateChanged", this.currentState);
      setTimeout(() => this.$emit("circuitChanged", this.currentCircuit));
    },
  },
});
</script>

<style lang="scss" scoped>
@import "carbon-components/scss/globals/scss/typography";
@import "~/../scss/variables/colors.scss";

.eigenvector-controls {
  display: flex;
  flex-direction: row;
  margin: $spacing-05 0;
  gap: $spacing-05;

  &__input {
    flex: 0 0 7rem;
    display: flex;
    flex-direction: column;

    &__dropdown {
      margin-top: $spacing-03;
      height: 3rem;
      --cds-field-01: #{$background-color-white};
      --cds-hover-ui: #{$background-color-lighter};
      --cds-hover-selected-ui: #{$background-color-lighter};
      --cds-ui-01: #{$background-color-white};
      --cds-focus: #{$active-color};
    }
  }

  &__circuit {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;

    &__selector {
      display: flex;
      flex-direction: row;
      margin-top: $spacing-03;
      background-color: $background-color-white;
      padding: $spacing-02;
      gap: $spacing-03;

      &__element {
        display: none;

        &-label {
          display: block;
          padding: $spacing-01;
          width: 2rem;
          height: 2rem;
          text-align: center;
          color: $text-color-white;
          background-color: $gates-1;
          cursor: pointer;

          &_active-selection {
            background-color: rgba($gates-1, 0.5);
          }
        }

        &:checked ~ #{&}-label_active-selection {
          background-color: $gates-1;
        }
      }
    }
  }
}
</style>
