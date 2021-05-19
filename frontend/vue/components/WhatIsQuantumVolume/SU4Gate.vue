<template>
  <div class="su-4-gate" :style="`--gate-height: ${gateHeight()};`">
    <SketchLine class="su-4-gate__wire su-4-gate__wire_top" v-bind="lineConfig" />
    <SketchLine class="su-4-gate__wire su-4-gate__wire_bottom" v-bind="lineConfig" />
    <div class="su-4-gate__connector" />
    <div class="su-4-gate__square su-4-gate__square_top" />
    <div class="su-4-gate__square su-4-gate__square_bottom" />
    <span class="su-4-gate__label"> SU(4) </span>
  </div>
</template>

<script lang="ts">
import { Options, prop, Vue } from 'vue-class-component'
import { Line, Point } from '@mathigon/euclid'
import SketchLine from '../Sketch/SketchLine.vue'
import SketchSquare from '../Sketch/SketchSquare.vue'
import MarkerArea from '../Sketch/MarkerArea.vue'
import Ket0 from '../Sketch/Ket0.vue'

class Props {
  spaceBetween = prop<Number>({ default: 5 })
}

@Options({
  components: {
    SketchLine,
    MarkerArea,
    SketchSquare,
    Ket0
  }
})
export default class LayersCircuit extends Vue.with(Props) {
  uid = Math.random().toString().replace('.', '')
  lineConfig = {
    line: new Line(new Point(-10, 0), new Point(70, 0)),
    hardLineExtraLengthInterval: [0, 0],
    softLineExtraLengthInterval: [120, 120]
  }

  gateHeight () : number {
    return 60 + 85 * Math.abs(this.spaceBetween as number)
  }
}
</script>
<style scoped lang="scss">
@import 'carbon-components/scss/globals/scss/typography';

.su-4-gate {
  position: absolute;
  border: 1px dashed $black-100;
  width: 62px;
  height: calc(var(--gate-height) * 1px);
  background-color: rgba(255, 255, 255, 0.3);

  &__square {
    position: absolute;
    width: 44px;
    height: 44px;
    border: 1px solid $black-100;
    background-color: $white-0;
    left: 8px;

    &_top {
      top: 8px;
    }
    &_bottom {
      bottom: 8px;
    }
  }

  &__wire {
    position: absolute;

    &_top {
      top: 28px;
    }
    &_bottom {
      bottom: 28px;
    }
  }

  &__connector {
    position: absolute;
    top: 30px;
    bottom: 30px;
    left: 50%;
    border-left: 1px solid $black-100;
  }

  &__label {
    @include type-style('caption-01');
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%) rotate(-90deg);
  }
}
</style>
