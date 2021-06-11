<template>
  <draggable
    class="gates-pool"
    :list="availableGates"
    :move="onMoveCallback"
    group="people"
    item-key="name"
    @change="log"
  >
    <template #item="{ element }">
      <Gate class="gates-pool__gate" :name="`${element.name}`" />
    </template>
  </draggable>
</template>

<script lang="ts">
import { Options, Vue, prop } from 'vue-class-component'
import draggable, { MoveEvent } from 'vuedraggable'
import KetCircuitLine from '../Sketch/KetCircuitLine.vue'
import Gate, { GateName } from './Gate.vue'
import { Added, Removed, Moved, isAddedEvent, isRemovedEvent, isMovedEvent } from './draggableUtils'

interface ComposerGate {
  name: GateName
  id: number
}

class Props {
  availableGates = prop<ComposerGate[]>({ default: [], required: true })
}

@Options({
  components: {
    KetCircuitLine,
    Gate,
    draggable
  }
})
export default class CircuitLine extends Vue.with(Props) {
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
    console.log(this.availableGates)
    // console.log(evt)
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

.gates-pool {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  min-height: 32px;
  &__gate {
    margin-right: $spacing-03;
    &.sortable-ghost {
      transition: opacity 0.2s ease-out;
      opacity: 0.5;
    }
  }
}

</style>
