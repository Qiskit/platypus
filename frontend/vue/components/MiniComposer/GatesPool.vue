<template>
  <draggable
    class="mini-composer__gates__pool"
    :list="availableGates"
    :move="onMoveCallback"
    group="people"
    item-key="name"
    @change="log"
  >
    <template #item="{ element }">
      <Gate class="mini-composer__gates__pool__gate" :name="`${element.name}`" />
    </template>
  </draggable>
</template>

<script lang="ts">
import { Options, Vue, prop } from 'vue-class-component'
import draggable from 'vuedraggable'
import KetCircuitLine from '../Sketch/KetCircuitLine.vue'
import Gate, { GateName } from './Gate.vue'

interface ComposerGate {
  name: GateName
  id: number
}

class Props {
  availableGates = prop<ComposerGate[]>({ default: [], required: true })
}

interface Added<T> {
  added: {
    element: T
    newIndex: number
  }
}
interface Removed<T> {
  removed: {
    element: T
    oldIndex: number
  }
}
interface Moved<T> {
  moved: {
    element: T
    oldIndex: number
    newIndex: number
  }
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
    if ('added' in evt) {
      console.log(`ADDED: ${evt.added.element.name}`)
    }
    if ('removed' in evt) {
      console.log(`REMOVED: ${evt.removed.element.name}`)
    }
    if ('moved' in evt) {
      console.log(`MOVED: ${evt.moved.element.name}`)
    }
    console.log(this.circuitState)
    // console.log(evt)
  }

  onMoveCallback (evt: MoveEvent<ComposerGate>, dragEvent: DragEvent) {
    const list = evt.relatedContext.component.realList
    if (!list || list.length > 0) {
      console.log(false)
      return false
    }
    console.log(true)
    return true
  }
}
</script>
<style scoped lang="scss">
@import 'carbon-components/scss/globals/scss/typography';
@import 'carbon-components/scss/globals/scss/layout';
@import '../../../scss/variables/colors.scss';
@import '../../../scss/variables/fonts.scss';
@import '~/../scss/variables/mq.scss';

.circuit-line {
  position: relative;
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
