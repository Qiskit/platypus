<template>
  <draggable
    class="gates-pool"
    :list="availableGates"
    :move="onMoveCallback"
    group="gates"
    item-key="name"
    @change="log"
  >
    <template #item="{ element }">
      <Gate class="gates-pool__gate" :name="element.name" :rotation="element.rotation" />
    </template>
  </draggable>
</template>

<script lang="ts">
import { Options, Vue, prop } from 'vue-class-component'
import draggable from 'vuedraggable'
import KetCircuitLine from '../Sketch/KetCircuitLine.vue'
import Gate from './Gate.vue'
import { GateName } from './gateUtils'

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
  onMoveCallback (evt : any) {
    const dropTarget: HTMLElement = evt?.to
    if (!dropTarget) {
      return true
    }
    return !dropTarget.classList.contains('qubit-line__slot__full')
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
