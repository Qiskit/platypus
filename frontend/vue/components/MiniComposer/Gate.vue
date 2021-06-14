<template>
  <div class="gate" :class="`gate_${name.toLowerCase()}`">
    <div v-if="name === gateName.H" class="gate__symbol gate__symbol_text">
      H
    </div>
    <MeasureZ v-if="name === gateName.MEASURE_Z" class="gate__symbol" />
  </div>
</template>

<script lang="ts">
import { Options, Vue, prop } from 'vue-class-component'
import MeasureZ from './GatesSVG/MeasureZ.vue'

export enum GateName {
  UNKNOWN = 'UNKNOWN',
  H = 'H',
  MEASURE_Z = 'Measure',
  KEEP = 'KEEP'
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

  &__symbol_text {
    font-family: $plex-mono;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 20px;
    text-align: center;
  }

  &_h {
    background-color: $red-50;
  }
  &_measure {
    background-color: $cool-gray-40;
  }
  &_keep {
    opacity: 0;
  }
}
</style>
