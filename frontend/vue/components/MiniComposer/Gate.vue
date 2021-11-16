<template>
  <div class="gate" :class="`gate_${name.toLowerCase()}`">
    <div v-if="name === gateName.H" class="gate__symbol gate__symbol_text">
      H
    </div>
    <div v-if="name === gateName.X" class="gate__symbol gate__symbol_text">
      X
    </div>
    <div v-if="name === gateName.Z" class="gate__symbol gate__symbol_text">
      Z
    </div>
    <div v-if="isRotationGate()" class="gate__symbol gate__symbol_text">
      {{ name }}
      <div v-if="rotation" class="gate__symbol__rotation">
        (<Theta v-if="rotation === 'theta'" class="gate__symbol__rotation__symbol" />
        <Phi v-else-if="rotation === 'phi'" class="gate__symbol__rotation__symbol" />
        <span v-else class="gate__symbol__rotation__text">{{ rotation }}</span>)
      </div>
    </div>
    <MeasureZ v-if="name === gateName.MEASURE_Z" class="gate__symbol" />
  </div>
</template>

<script lang="ts">
import { Options, Vue, prop } from 'vue-class-component'
import MeasureZ from './GatesSVG/MeasureZ.vue'
import Theta from './GatesSVG/Theta.vue'
import Phi from './GatesSVG/Phi.vue'

export enum GateName {
  UNKNOWN = 'UNKNOWN',
  H = 'H',
  Z = 'Z',
  X = 'X',
  RX = 'RX',
  RZ = 'RZ',
  RY = 'RY',
  MEASURE_Z = 'Measure'
}

class Props {
  name = prop<String>({ default: GateName.H, required: true })
  rotation = prop<String>({ default: '', required: false })
}

@Options({
  components: {
    MeasureZ,
    Theta,
    Phi
  }
})
export default class Gate extends Vue.with(Props) {
  gateName = GateName;

  isRotationGate (): Boolean {
    return this.name === GateName.RY || this.name === GateName.RX || this.name === GateName.RZ
  }
}
</script>
<style scoped lang="scss">
@import 'carbon-components/scss/globals/scss/typography';
@import 'carbon-components/scss/globals/scss/layout';
@import '../../../scss/variables/colors.scss';
@import '../../../scss/variables/fonts.scss';
@import '~/../scss/variables/mq.scss';

.gate {
  width: 2rem;
  height: 2rem;
  background-color: $red-50;
  display: flex;
  align-content: center;
  align-items: center;
  justify-items: center;
  justify-content: center;

  font-family: $plex-mono;
  font-style: normal;
  font-weight: normal;
  font-size: 1.5rem;
  line-height: 1.25rem;
  text-align: center;

  &__symbol__rotation {
    font-size: 0.5rem;
    line-height: 0.5rem;

    &__symbol {
      display: inline-block;
      height: 0.75rem;
      vertical-align: text-top;
    }
  }

  &_h {
    background-color: $red-50;
  }
  &_z,
  &_x {
    background-color: $teal-40;
  }
  &_rx,
  &_rz,
  &_ry {
    background-color: $teal-40;
    font-size: 1rem;
    line-height: 1rem;
  }
  &_measure {
    background-color: $cool-gray-40;
  }
  &_keep {
    opacity: 0;
  }
}
</style>
