<template>
  <draggable
    class="gates-pool"
    :list="availableGates"
    :move="onMoveCallback"
    group="people"
    item-key="name"
    @change="log"
    @start="onStartCallback"
  >
    <template #item="{ element }">
      <Gate class="gates-pool__gate" :name="`${element.name}`" />
    </template>
  </draggable>
</template>

<script lang="ts">
import { Options, Vue, prop } from 'vue-class-component'
import draggable, { MoveEvent } from 'vuedraggable'
import Gate, { GateName } from './Gate.vue'

interface ComposerGate {
  name: GateName
  id: number
}

class Props {
  availableGates = prop<ComposerGate[]>({ default: [], required: true })
}

@Options({
  components: {
    Gate,
    draggable
  }
})
export default class GatesPool extends Vue.with(Props) {
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

  onStartCallback (evt: any) {
    this.$emit('onStartDragging', this.availableGates[evt.oldIndex])
  }
}
</script>
<style scoped lang="scss">
@import 'carbon-components/scss/globals/scss/typography';
@import 'carbon-components/scss/globals/scss/layout';
@import '~/../scss/variables/colors.scss';
@import '~/../scss/variables/fonts.scss';
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
