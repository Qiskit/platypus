<template>
  <div class="what-is-qv-chart">
    <SketchSquare class="what-is-qv-chart__square" :width="405" :height="405" :hideLeft="true" :hideBottom="true">
      <div class="what-is-qv-chart__square__content">
        <span class="what-is-qv-chart__square__text">QV32</span>
      </div>
    </SketchSquare>
    <SketchSquare class="what-is-qv-chart__square" :width="325" :height="325" :hideLeft="true" :hideBottom="true">
      <div class="what-is-qv-chart__square__content">
        <span class="what-is-qv-chart__square__text">QV16</span>
      </div>
    </SketchSquare>
    <SketchSquare class="what-is-qv-chart__square" :width="245" :height="245" :hideLeft="true" :hideBottom="true">
      <div class="what-is-qv-chart__square__content">
        <span class="what-is-qv-chart__square__text">QV8</span>
      </div>
    </SketchSquare>
    <SketchSquare class="what-is-qv-chart__square" :width="165" :height="165" :hideLeft="true" :hideBottom="true">
      <div class="what-is-qv-chart__square__content">
        <span class="what-is-qv-chart__square__text">QV4</span>
      </div>
    </SketchSquare>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import DotsSelector from "./DotsSelector.vue"
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
    MarkerArea
  }
})
export default class WhatIsQuantumVolumeSVG extends Vue {
  msg!: string
  selectedInt = 0
}
</script>
<style scoped lang="scss">
.what-is-qv-chart {

  &__square {
    position: absolute;
    bottom: 0px;
    left: 0px;

    &__content {
      width: 100%;
      height: 100%;
      background: radial-gradient(52.42% 51.35% at 36.98% 59.03%, #F6F2FF 0%, #FFFFFF 100%);
    }

    &__text {
      display: block;
      font-family: 'IBM Plex Sans';
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 26px;
      margin: 5px 16px 5px 5px;
      text-align: right;
    }
    
  }
}
</style>
