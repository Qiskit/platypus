<template>
  <div class="qubit-line">
    <KetCircuitLine class="qubit-line__ket-circuit-line" :line-lenght="230" />
    <div class="qubit-line__slot-container">
      <div
        v-for="(gate, index) in circuitState"
        :key="gate.id"
        class="qubit-line__slot"
      >
        <Gate
          v-if="controlSimulationIndex === index"
          :name="'CXC'"
          class="sortable-ghost"
        />
        <draggable
          class="qubit-line__slot"
          :list="[gate]"
          :move="onMoveCallback"
          group="people"
          item-key="name"
          @change="evt => log(index, evt)"
          @start="evt => onStartCallback(index, gate)"
        >
          <template #item="{ element }">
            <Gate
              class="qubit-line__slot__gate"
              :name="`${element.name}`"
            />
          </template>
        </draggable>
      </div>
      <Gate
        v-if="controlSimulationIndex === circuitState.length"
        :name="'CXC'"
        class="qubit-line__slot__gate sortable-ghost"
      />
      <draggable
        class="qubit-line__slot-trailling"
        :list="[]"
        :move="onMoveCallback"
        group="people"
        item-key="name"
        @change="evt => log(circuitState.length, evt)"
      >
        <template #item="{ element }">
          <div class="qubit-line__slot__gate">
            <Gate
              :name="`${element.name}`"
            />
          </div>
        </template>
      </draggable>
      <!--Gate v-if="autoMeasureGate" class="qubit-line__z-gate" :name="`${measureGate}`" /-->
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, prop } from 'vue-class-component'
import draggable, { MoveEvent } from 'vuedraggable'
import KetCircuitLine from '../Sketch/KetCircuitLine.vue'
import Gate, { GateName } from './Gate.vue'
import { ComposerGate } from './composerTypes'
import { Added, Removed, Moved, Hover, isAddedEvent, isRemovedEvent, isHoverEvent } from './draggableUtils'

class Props {
  name = prop<GateName>({ default: GateName.H, required: true })
  circuitState = prop<ComposerGate[]>({ default: [], required: true })
  autoMeasureGate = prop<boolean>({ default: true, required: true })
  controlSimulationIndex = prop<number>({ default: -1, required: false })
  hideControl = prop<number>({ default: -1, required: false })
}

@Options({
  components: {
    KetCircuitLine,
    Gate,
    draggable
  }
})
export default class QubitLine extends Vue.with(Props) {
  gateName = GateName
  measureGate = GateName.MEASURE_Z

  log (index: number, evt: Added<ComposerGate> | Removed<ComposerGate> | Moved<ComposerGate> | Hover<ComposerGate>) {
    if (isRemovedEvent(evt)) {
      const addedEvt = (evt as Removed<ComposerGate>).removed
      this.$emit('onRemovedGate', index + addedEvt.oldIndex, addedEvt.element)
    }
    if (isAddedEvent(evt)) {
      const addedEvt = (evt as Added<ComposerGate>).added
      this.$emit('onAddedGate', index + addedEvt.newIndex, addedEvt.element)
    }
    if (isHoverEvent(evt)) {
      const hoverEvt = (evt as Hover<ComposerGate>).hover
      const currentIndex = this.circuitState.findIndex(gate => gate === hoverEvt.element)
      let newIndex = index + hoverEvt.newIndex
      if (currentIndex !== -1 && currentIndex < newIndex) {
        newIndex = Math.max(newIndex - 1, 0)
      }
      console.log(`HOVER : ${newIndex} ${index}  ${hoverEvt.newIndex}`)
      this.$emit('onHoverGate', newIndex, hoverEvt.element)
    }

    this.$emit('onGatesChanged')
  }

  onMoveCallback (evt: MoveEvent<ComposerGate>) {
    const insertAfterShift = (evt.willInsertAfter ? 1 : 0)
    const hoverIndex = Number.isInteger(evt.relatedContext.index) ? evt.relatedContext.index + insertAfterShift : 0

    evt.relatedContext.component.emitChanges({
      hover: {
        element: evt.draggedContext.element,
        newIndex: hoverIndex
      }
    })
  }

  onStartCallback (index: number, gate: ComposerGate) {
    this.$emit('onStartDragging', index, gate)
  }
}
</script>

<style scoped lang="scss">
@import 'carbon-components/scss/globals/scss/typography';
@import 'carbon-components/scss/globals/scss/layout';
@import '../../../scss/variables/colors.scss';
@import '../../../scss/variables/fonts.scss';
@import '~/../scss/variables/mq.scss';

.qubit-line {
  position: relative;

  &__ket-circuit-line {
    margin: $spacing-05 0;
  }

  &__slot-container {
    display: flex;
    flex-flow: row;

    position: absolute;
    top: 0px;
    height: 100%;
    width: 100%;
    align-items: center;
    padding: 0 $spacing-07;
  }

  &__slot {
    display: flex;
    flex-flow: row;
    flex: 0 0 auto;
    max-width: 100%;

    &-trailling {
      display: flex;
      flex-flow: row;
      flex: 1 1 auto;
      max-width: 100%;
    }

    &__gate {
      margin-right: $spacing-02;
      display: flex;
      flex-flow: row;

      &.sortable-ghost,
      & .sortable-ghost {
        transition: opacity 0.2s ease-out;
        opacity: 0.5;
      }
    }

    &.sortable-ghost,
    & .sortable-ghost {
      transition: opacity 0.2s ease-out;
      opacity: 0.5;
    }
  }

  &__z-gate {
    flex: 0 0 auto;
  }
}
</style>
