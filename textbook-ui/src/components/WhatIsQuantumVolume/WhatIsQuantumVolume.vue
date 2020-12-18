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
    <div what-is-qv__diagram>
      <SketchSquare class="what-is-qv__square" :width="420" :height="420">
        <template v-slot:svg-background>
          <MarkerArea markerMaskId="marker" fillId="bluePurpleGrad" :width="420" :height="420"/>
        </template>
        <span>QV16</span>
      </SketchSquare>
      <SketchSquare class="what-is-qv__square" :width="315" :height="315">
        <template v-slot:svg-background>
          <MarkerArea markerMaskId="marker" fillId="bluePurpleGrad" :width="315" :height="315"/>
        </template>
        <span>QV8</span>
      </SketchSquare>
      <SketchSquare class="what-is-qv__square" :width="210" :height="210">
        <template v-slot:svg-background>
          <MarkerArea markerMaskId="marker" fillId="bluePurpleGrad" :width="210" :height="210"/>
        </template>
        <span>QV4</span>
      </SketchSquare>
      <SketchSquare class="what-is-qv__square" :width="105" :height="105">
        <template v-slot:svg-background>
          <MarkerArea markerMaskId="marker" fillId="bluePurpleGrad" :width="105" :height="105"/>
        </template>
        <span>QV2</span>
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
.marker-area {
  display: inline-block;
}

.what-is-qv {
  display: flex;
  flex-direction: column;
  
  &__guide {
    width: 200px;
  }
  &__charm {
    width: 50px;
    height: 400px;
    //background-image: url("/MarkerBg.png"), linear-gradient(180deg, #78A9FF 0%, #8A3FFC 100%);
  }
  &__dots-selector {
    flex: 1;
  }
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

    &__text {
      display: block;
      font-family: 'IBM Plex Sans';
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 26px;
      margin: 5px 30px 5px 5px;
      text-align: right;
    }
    
  }
}
</style>
