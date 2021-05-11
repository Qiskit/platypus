<template>
  <div class="mini-composer__circuit__line">
    <KetCircuitLine :line-lenght="230" />
  </div>
</template>

<script lang="ts">
import { Options, Vue, prop } from 'vue-class-component'
import draggable from 'vuedraggable'
import MeasureZ from './GatesSVG/MeasureZ.vue'

export enum GateName {
  H = 'H',
  MEASURE_Z = 'Measure'
}

class Props {
  name = prop<String>({ default: GateName.H, required: true })
}

@Options({
  components: {
    MeasureZ,
    draggable
  }
})
export default class Gate extends Vue.with(Props) {
  gateName = GateName
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
}
</style>
