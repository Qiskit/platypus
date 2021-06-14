<template>
  <div class="qubit-line">
    <KetCircuitLine class="qubit-line__ket-circuit-line" :line-lenght="230" />
    <div class="qubit-line__slot-container">
      <draggable
        class="qubit-line__slot"
        :list="circuitState"
        :move="onMoveCallback"
        group="people"
        item-key="name"
        @change="log"
      >
        <template #item="{ element }">
          <Gate
            class="qubit-line__slot__gate"
            :name="`${element.name}`"
          />
        </template>
      </draggable>
      <Gate v-if="autoMeasureGate" class="qubit-line__z-gate" :name="`${measureGate}`" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, prop } from 'vue-class-component'
import draggable, { MoveEvent } from 'vuedraggable'
import KetCircuitLine from '../Sketch/KetCircuitLine.vue'
import Gate, { GateName } from './Gate.vue'
import { ComposerGate } from './composerTypes'
import { Added, Removed, Moved, isAddedEvent, isRemovedEvent, isMovedEvent } from './draggableUtils'

class Props {
  name = prop<GateName>({ default: GateName.H, required: true })
  circuitState = prop<ComposerGate[]>({ default: [], required: true })
  autoMeasureGate = prop<boolean>({ default: true, required: true })
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

  log (evt: Added<ComposerGate> | Removed<ComposerGate> | Moved<ComposerGate>) {
    if (isAddedEvent(evt)) {
      const addedEvt = evt as Added<ComposerGate>
      console.log(`ADDED: ${addedEvt.added.element.name}`)
    }
    if (isRemovedEvent(evt)) {
      const removedEvt = evt as Removed<ComposerGate>
      console.log(`REMOVED: ${removedEvt.removed.element.name}`)
    }
    if (isMovedEvent(evt)) {
      const movedEvt = evt as Moved<ComposerGate>
      console.log(`MOVED: ${movedEvt.moved.element.name}`)
    }
    console.log(this.circuitState)
    // console.log(evt)

    this.$emit('onGatesChanged')
  }

  onMoveCallback (evt: MoveEvent<ComposerGate>, dragEvent: DragEvent) {
    
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
    flex: 1 1 auto;
    max-width: 100%;

    &__gate {
      margin-right: $spacing-02;

      &.sortable-ghost {
        transition: opacity 0.2s ease-out;
        opacity: 0.5;
      }
    }
  }

  &__z-gate {
    flex: 0 0 auto;
  }
}
</style>
