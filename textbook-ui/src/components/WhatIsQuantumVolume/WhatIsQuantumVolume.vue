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
    <div class="what-is-qv__diagram">
      <SketchSquare class="what-is-qv__square" :width="405" :height="405" :hideLeft="true" :hideBottom="true">
        <div class="what-is-qv__square__content">
          <span class="what-is-qv__square__text">QV32</span>
        </div>
      </SketchSquare>
      <SketchSquare class="what-is-qv__square" :width="325" :height="325" :hideLeft="true" :hideBottom="true">
        <div class="what-is-qv__square__content">
          <span class="what-is-qv__square__text">QV16</span>
        </div>
      </SketchSquare>
      <SketchSquare class="what-is-qv__square" :width="245" :height="245" :hideLeft="true" :hideBottom="true">
        <div class="what-is-qv__square__content">
          <span class="what-is-qv__square__text">QV8</span>
        </div>
      </SketchSquare>
      <SketchSquare class="what-is-qv__square" :width="165" :height="165" :hideLeft="true" :hideBottom="true">
        <div class="what-is-qv__square__content">
          <span class="what-is-qv__square__text">QV4</span>
        </div>
      </SketchSquare>
    </div>
    
    <!--MarkerArea markerMaskId="marker" fillId="redGreenGrad" width="105" height="105"/>
    <MarkerArea markerMaskId="marker" fillId="blueRedGrad" width="300" height="200"/>
    <div class="what-is-qv__diagram"-->
      <!--SketchSquare class="what-is-qv__square what-is-qv__square_qv16 what-is-qv__charm" uid="asd">
        <span class="what-is-qv__square__text"> QV16 </span>
      </SketchSquare-->

      <!--SketchSquare class="what-is-qv__square what-is-qv__square_qv8">
        <span class="what-is-qv__square__text"> QV8 </span>
      </SketchSquare>
      <SketchSquare class="what-is-qv__square what-is-qv__square_qv4">
        <span class="what-is-qv__square__text"> QV4 </span>
      </SketchSquare>
      <SketchSquare class="what-is-qv__square what-is-qv__square_qv2">
        <span class="what-is-qv__square__text"> QV2 </span>
      </SketchSquare-->
    <!--/div-->
    <!--div class="what-is-qv__diagram">
      <SketchLine 
        v-bind="lineConfig"
        direction="horizontal"
        class="what-is-qv__guide"
        />
      
      <SketchSquare class="what-is-qv__charm">
        <span class="what-is-qv__square__text"> QV2 </span>
      </SketchSquare>
    </div>
    <DotsSelector :count="5" name="WhatIsQV" class="what-is-qv__dots-selector" @onSelectedChange="v => selectedInt = v" /-->
  </section>
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
.what-is-qv {
  &__diagram {
    position: relative;
    width: 420px;
    height: 420px;
    //background-color: #DDE1E6;
    margin: 20px;
  }
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
