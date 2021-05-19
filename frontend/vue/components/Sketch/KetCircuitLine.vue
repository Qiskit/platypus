<template>
  <svg class="circuit-line">
    <Ket0
      x="0"
      y="32"
      width="20"
      height="18"
      class="circuit-line__ket"
    />
    <SketchLine
      x="32"
      y="41"
      class="circuit-line__line"
      :stroke-style="strokeStyle"
      :line="circuitLine"
      :dashed="false"
      :draw-soft-lines="false"
    />
  </svg>
</template>

<script lang="ts">
import { Options, prop, Vue } from 'vue-class-component'
import { Line, Point } from '@mathigon/euclid'
import SketchLine from './SketchLine.vue'
import Ket0 from './Ket0.vue'

class Props {
  lineLenght = prop<Number>({ default: 400 })
  strokeStyle = prop<String>({ default: '#000000' })
}

@Options({
  components: {
    SketchLine,
    Ket0
  }
})
export default class LayersCircuit extends Vue.with(Props) {
  circuitLine = new Line(new Point(0, 0), new Point(this.lineLenght as number, 0))
}
</script>
<style scoped lang="scss">
@import '~/../scss/variables/colors.scss';

.circuit-line {
  height: 85px;
  display: flex;
  align-items: center;

  &__ket {
    flex: 0 0 20px;
    margin-right: 10px;
  }

  &__line {
    flex: 1;
  }
}

</style>
