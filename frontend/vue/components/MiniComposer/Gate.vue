<template>
  <div class="gate" :class="`gate_${gateNameClass()}`">
    <div class="gate__background">
      <div v-if="name === gateName.H" class="gate__symbol gate__symbol_text">
        H
      </div>
      <div v-if="name === gateName.X" class="gate__symbol gate__symbol_text">
        X
      </div>
      <div v-if="name === gateName.Z" class="gate__symbol gate__symbol_text">
        Z
      </div>
      <div v-if="name === gateName.CX" class="gate__symbol gate__symbol_text">
        <svg width="16" height="16" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.5 4.5V0.5H4.5V4.5H0.5V5.5H4.5V9.5H5.5V5.5H9.5V4.5H5.5Z" />
        </svg>
      </div>
      <MeasureZ v-if="name === gateName.MEASURE_Z" class="gate__symbol" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, prop } from 'vue-class-component'
import MeasureZ from './GatesSVG/MeasureZ.vue'

export enum GateName {
  UNKNOWN = 'UNKNOWN',
  H = 'H',
  Z = 'Z',
  X = 'X',
  MEASURE_Z = 'Measure',
  KEEP = '-',
  CX = 'CX',
  CXC = 'CXC'
}

export function isControlledGate (name: GateName | undefined): boolean {
  return name === GateName.CX
}

class Props {
  name = prop<String>({ default: GateName.H, required: true })
}

@Options({
  components: {
    MeasureZ
  }
})
export default class Gate extends Vue.with(Props) {
  gateName = GateName;

  gateNameClass () {
    if (this.name === GateName.KEEP as string) {
      return 'keep'
    }
    return this.name.toLowerCase()
  }
}
</script>
<style scoped lang="scss">
@import 'carbon-components/scss/globals/scss/typography';
@import 'carbon-components/scss/globals/scss/layout';
@import '~/../scss/variables/colors.scss';
@import '~/../scss/variables/fonts.scss';
@import '~/../scss/variables/mq.scss';

.gate {
  width: 2rem;
  height: 2rem;
  display: flex;

  &__background {
    background-color: $red-50;
    flex: 1;
    display: flex;
    align-content: center;
    align-items: center;
    justify-items: center;
    justify-content: center;
  }

  &__symbol_text {
    font-family: $plex-mono;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 20px;
    text-align: center;
  }

  &_h &__background {
    background-color: $red-50;
  }
  &_cx &__background {
    background-color: $blue-50;
    border-radius: 50%;
  }
  &_x &__background,
  &_z &__background  {
    background-color: $teal-40;
  }
  &_measure &__background {
    background-color: $cool-gray-40;
  }
  &_keep &__background {
    background-color: transparent;
    border: 2px solid black;
    opacity: 1;
  }
  &_cxc &__background {
    background-color: $blue-50;
    border-radius: 50%;
    opacity: 1;
    margin: 0.5rem;
    width: 1rem;
    height: 1rem;
  }
}
</style>
