<template>
  <section class="what-is-qv">
    <svg width="1" height="1">
      <defs>
        <pattern id="graphite" patternUnits="userSpaceOnUse" width="512" height="512">
          <image href="../../images/PencilTexture.png" x="0" y="0" width="512" height="512"></image>
        </pattern>
        <pattern id="markerBG" patternUnits="userSpaceOnUse" width="100%" height="100%">
          <image href="../../images/MarkerBg.png" x="0" y="0" width="100%" height="100%"></image>
        </pattern>
        <linearGradient id="bluePurpleGrad" gradientUnits="objectBoundingBox" gradientTransform="rotate(90)">
          <stop stop-color="#78A9FF"/>
          <stop offset="1" stop-color="#8A3FFC"/>
        </linearGradient>
        <linearGradient id="redGreenGrad" gradientUnits="objectBoundingBox" gradientTransform="rotate(90)">
          <stop stop-color="#FF0000"/>
          <stop offset="1" stop-color="#00FF00"/>
        </linearGradient>
        <linearGradient id="blueRedGrad" gradientUnits="objectBoundingBox" gradientTransform="rotate(90)">
          <stop stop-color="#0000FF"/>
          <stop offset="1" stop-color="#FF0000"/>
        </linearGradient>
        <mask id="marker">
          <image href="../../images/MarkerBg.png" x="0" y="0" width="100%" height="100%" preserveAspectRatio="none"></image>
        </mask>
        <g id="background" class="sketch-square">
          <rect x="0" y="0" width="100%" height="100%" style="mask:url(#marker);fill:url(#blue-purple-grad);"></rect>
        </g>
      </defs>
    </svg>
    <div class="what-is-qv__chart">
      <div class="what-is-qv__chart__axis">
        <svg class="sketch-square__lines" :viewBox="`0 0 550 550`" :width="550" :height="550">
          <SketchLine :line="axisQCount"/>
          <SketchLine :line="axisReducedError"/>
        </svg>
      </div>
      <WhatIsQVChart1 class="what-is-qv__chart-1"/>
    </div>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import { Line, Point } from "@mathigon/euclid"
import DotsSelector from "./DotsSelector.vue"
import WhatIsQVChart1 from "./WhatIsQVChart1.vue"
import SketchSquare from "../Sketch/SketchSquare.vue"
import SketchLine from "../Sketch/SketchLine.vue"
import MarkerArea from "../Sketch/MarkerArea.vue"

@Options({
  props: {
    msg: String
  },
  components: {
    DotsSelector,
    SketchSquare,
    SketchLine,
    MarkerArea,
    WhatIsQVChart1
  }
})
export default class WhatIsQuantumVolumeSVG extends Vue {
  msg!: string
  selectedInt = 0

  axisQCount = new Line(new Point(50, 450), new Point(50, 50))
  axisReducedError = new Line(new Point(100, 500), new Point(500, 500))
}
</script>
<style scoped lang="scss">
.what-is-qv {
  &__chart {
    position: relative;

    &-1 {
      position: absolute;
      top: 50px;
      left: 100px;
      width: 420px;
      height: 420px;
    }
    &__axis {
      position: absolute;
      top: 0;
      left: 0;
      width: 550px;
      height: 550px;
      margin: 20px;
    }
  }
}
</style>
