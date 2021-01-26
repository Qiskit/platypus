<template>
  <div class="what-is-qv-chart what-is-qv-chart_state" :class="`what-is-qv-chart_state-${state}`">
    <svg width="1" height="1">
      <defs>
        <pattern id="graphite" patternUnits="userSpaceOnUse" width="512" height="512">
          <image href="../../images/PencilTexture.png" x="0" y="0" width="512" height="512"></image>
        </pattern>
        <linearGradient id="bluePurpleGrad0" gradientUnits="objectBoundingBox" gradientTransform="rotate(90)">
          <stop stop-color="#78A9FF"/>
          <stop offset="1" stop-color="#8A3FFC"/>
        </linearGradient>
        <linearGradient id="bluePurpleGrad1" gradientUnits="objectBoundingBox" gradientTransform="rotate(90)">
          <stop stop-color="#95AAFE"/>
          <stop offset="1" stop-color="#A165FD"/>
        </linearGradient>
        <linearGradient id="bluePurpleGrad2" gradientUnits="objectBoundingBox" gradientTransform="rotate(90)">
          <stop stop-color="#B3AEFE"/>
          <stop offset="1" stop-color="#B98CFD"/>
        </linearGradient>
        <linearGradient id="bluePurpleGrad3" gradientUnits="objectBoundingBox" gradientTransform="rotate(90)">
          <stop stop-color="#CEBDFE"/>
          <stop offset="1" stop-color="#D0B2FE"/>
        </linearGradient>
        <mask id="marker" style="mask-type: alpha">
          <image href="../../images/MarkerBg.png" x="0" y="0" width="100%" height="100%" preserveAspectRatio="none"></image>
        </mask>
      </defs>
    </svg>

    <div class="what-is-qv-chart__axis">
      <LabeledArrow class="what-is-qv-chart__axis__arrow what-is-qv-chart__axis__arrow_vertical" :label="`Qubits`"/>
      <LabeledArrow class="what-is-qv-chart__axis__arrow what-is-qv-chart__axis__arrow_horizontal" :label="`Reduced Error`"/>
    </div>
    <div class="what-is-qv-chart__content">
      <SketchSquare class="what-is-qv-chart__square what-is-qv-chart__square_qv32" :width="450" :height="450" :hideLeft="true" :hideBottom="true">
        <div class="what-is-qv-chart__square__content">
          <span class="what-is-qv-chart__square__text">QV 32</span>
          <Ket0 class="what-is-qv-chart__square__ket0 what-is-qv-chart__square__ket0_0"/>
          <Ket0 class="what-is-qv-chart__square__ket0 what-is-qv-chart__square__ket0_1"/>
          <Ket0 class="what-is-qv-chart__square__ket0 what-is-qv-chart__square__ket0_2"/>
          <Ket0 class="what-is-qv-chart__square__ket0 what-is-qv-chart__square__ket0_3"/>
          <Ket0 class="what-is-qv-chart__square__ket0 what-is-qv-chart__square__ket0_4"/>
          <SketchLine class="what-is-qv-chart__square__qubit-line what-is-qv-chart__square__qubit-line_0" :line="horizontalLineQV32" :dashed="false" :drawSoftLines="false" />
          <SketchLine class="what-is-qv-chart__square__qubit-line what-is-qv-chart__square__qubit-line_1" :line="horizontalLineQV32" :dashed="false" :drawSoftLines="false" />
          <SketchLine class="what-is-qv-chart__square__qubit-line what-is-qv-chart__square__qubit-line_2" :line="horizontalLineQV32" :dashed="false" :drawSoftLines="false" />
          <SketchLine class="what-is-qv-chart__square__qubit-line what-is-qv-chart__square__qubit-line_3" :line="horizontalLineQV32" :dashed="false" :drawSoftLines="false" />
          <SketchLine class="what-is-qv-chart__square__qubit-line what-is-qv-chart__square__qubit-line_4" :line="horizontalLineQV32" :dashed="false" :drawSoftLines="false" />
          <MarkerArea class="what-is-qv-chart__square__layer what-is-qv-chart__square__layer_0" markerMaskId="marker" fillId="bluePurpleGrad0" :width="50" :height="400"/>
          <MarkerArea class="what-is-qv-chart__square__layer what-is-qv-chart__square__layer_1" markerMaskId="marker" fillId="bluePurpleGrad0" :width="50" :height="400"/>
          <MarkerArea class="what-is-qv-chart__square__layer what-is-qv-chart__square__layer_2" markerMaskId="marker" fillId="bluePurpleGrad0" :width="50" :height="400"/>
          <MarkerArea class="what-is-qv-chart__square__layer what-is-qv-chart__square__layer_3" markerMaskId="marker" fillId="bluePurpleGrad0" :width="50" :height="400"/>
          <MarkerArea class="what-is-qv-chart__square__layer what-is-qv-chart__square__layer_4" markerMaskId="marker" fillId="bluePurpleGrad0" :width="50" :height="400"/>
          <span class="what-is-qv-chart__square__tooltip">{{tooltip[3]}}</span>
        </div>
      </SketchSquare>

      <SketchSquare class="what-is-qv-chart__square what-is-qv-chart__square_qv16" :width="365" :height="365" :hideLeft="true" :hideBottom="true">
        <div class="what-is-qv-chart__square__content">
          <span class="what-is-qv-chart__square__text">QV 16</span>
          <Ket0 class="what-is-qv-chart__square__ket0 what-is-qv-chart__square__ket0_0"/>
          <Ket0 class="what-is-qv-chart__square__ket0 what-is-qv-chart__square__ket0_1"/>
          <Ket0 class="what-is-qv-chart__square__ket0 what-is-qv-chart__square__ket0_2"/>
          <Ket0 class="what-is-qv-chart__square__ket0 what-is-qv-chart__square__ket0_3"/>
          <SketchLine class="what-is-qv-chart__square__qubit-line what-is-qv-chart__square__qubit-line_0" :line="horizontalLineQV16" :dashed="false" :drawSoftLines="false" />
          <SketchLine class="what-is-qv-chart__square__qubit-line what-is-qv-chart__square__qubit-line_1" :line="horizontalLineQV16" :dashed="false" :drawSoftLines="false" />
          <SketchLine class="what-is-qv-chart__square__qubit-line what-is-qv-chart__square__qubit-line_2" :line="horizontalLineQV16" :dashed="false" :drawSoftLines="false" />
          <SketchLine class="what-is-qv-chart__square__qubit-line what-is-qv-chart__square__qubit-line_3" :line="horizontalLineQV16" :dashed="false" :drawSoftLines="false" />
          <MarkerArea class="what-is-qv-chart__square__layer what-is-qv-chart__square__layer_0" markerMaskId="marker" fillId="bluePurpleGrad1" :width="50" :height="315"/>
          <MarkerArea class="what-is-qv-chart__square__layer what-is-qv-chart__square__layer_1" markerMaskId="marker" fillId="bluePurpleGrad1" :width="50" :height="315"/>
          <MarkerArea class="what-is-qv-chart__square__layer what-is-qv-chart__square__layer_2" markerMaskId="marker" fillId="bluePurpleGrad1" :width="50" :height="315"/>
          <MarkerArea class="what-is-qv-chart__square__layer what-is-qv-chart__square__layer_3" markerMaskId="marker" fillId="bluePurpleGrad1" :width="50" :height="315"/>
          <span class="what-is-qv-chart__square__tooltip">{{tooltip[2]}}</span>
        </div>
      </SketchSquare>

      <SketchSquare class="what-is-qv-chart__square what-is-qv-chart__square_qv8" :width="280" :height="280" :hideLeft="true" :hideBottom="true">
        <div class="what-is-qv-chart__square__content">
          <span class="what-is-qv-chart__square__text">QV 8</span>
          <Ket0 class="what-is-qv-chart__square__ket0 what-is-qv-chart__square__ket0_0"/>
          <Ket0 class="what-is-qv-chart__square__ket0 what-is-qv-chart__square__ket0_1"/>
          <Ket0 class="what-is-qv-chart__square__ket0 what-is-qv-chart__square__ket0_2"/>
          <SketchLine class="what-is-qv-chart__square__qubit-line what-is-qv-chart__square__qubit-line_0" :line="horizontalLineQV8" :dashed="false" :drawSoftLines="false" />
          <SketchLine class="what-is-qv-chart__square__qubit-line what-is-qv-chart__square__qubit-line_1" :line="horizontalLineQV8" :dashed="false" :drawSoftLines="false" />
          <SketchLine class="what-is-qv-chart__square__qubit-line what-is-qv-chart__square__qubit-line_2" :line="horizontalLineQV8" :dashed="false" :drawSoftLines="false" />
          <MarkerArea class="what-is-qv-chart__square__layer what-is-qv-chart__square__layer_0" markerMaskId="marker" fillId="bluePurpleGrad2" :width="50" :height="230"/>
          <MarkerArea class="what-is-qv-chart__square__layer what-is-qv-chart__square__layer_1" markerMaskId="marker" fillId="bluePurpleGrad2" :width="50" :height="230"/>
          <MarkerArea class="what-is-qv-chart__square__layer what-is-qv-chart__square__layer_2" markerMaskId="marker" fillId="bluePurpleGrad2" :width="50" :height="230"/>
          <span class="what-is-qv-chart__square__tooltip">{{tooltip[1]}}</span>
        </div>
      </SketchSquare>

      <SketchSquare class="what-is-qv-chart__square what-is-qv-chart__square_qv4" :width="195" :height="195" :hideLeft="true" :hideBottom="true">
        <div class="what-is-qv-chart__square__content">
          <span class="what-is-qv-chart__square__text">QV 4</span>
          <Ket0 class="what-is-qv-chart__square__ket0 what-is-qv-chart__square__ket0_0"/>
          <Ket0 class="what-is-qv-chart__square__ket0 what-is-qv-chart__square__ket0_1"/>
          <SketchLine class="what-is-qv-chart__square__qubit-line what-is-qv-chart__square__qubit-line_0" :line="horizontalLineQV4" :dashed="false" :drawSoftLines="false" />
          <SketchLine class="what-is-qv-chart__square__qubit-line what-is-qv-chart__square__qubit-line_1" :line="horizontalLineQV4" :dashed="false" :drawSoftLines="false" />
          <MarkerArea class="what-is-qv-chart__square__layer what-is-qv-chart__square__layer_0" markerMaskId="marker" fillId="bluePurpleGrad3" :width="50" :height="145"/>
          <MarkerArea class="what-is-qv-chart__square__layer what-is-qv-chart__square__layer_1" markerMaskId="marker" fillId="bluePurpleGrad3" :width="50" :height="145"/>
          <span class="what-is-qv-chart__square__tooltip">{{tooltip[0]}}</span>
        </div>
      </SketchSquare>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, prop, Vue } from "vue-class-component"
import { Line, Point } from "@mathigon/euclid"
import DotsSelector from "./DotsSelector.vue"
import LabeledArrow from "./LabeledArrow.vue"
import SketchSquare from "../Sketch/SketchSquare.vue"
import SketchLine from "../Sketch/SketchLine.vue"
import MarkerArea from "../Sketch/MarkerArea.vue"
import Ket0 from "../Sketch/Ket0.vue"


class Props {
  state = prop<Number>({ default: 0 })
  tooltip = prop<String[]>({ default:[] })
}

@Options({
  components: {
    DotsSelector,
    SketchSquare,
    SketchLine,
    MarkerArea,
    LabeledArrow,
    Ket0
  },
  computed: {
    horizontalLine(): Line {
      return new Line(new Point(0, 0), new Point(405, 0));
    }
  }
})

export default class WhatIsQuantumChart extends Vue.with(Props) {
  horizontalLineQV32 = new Line(new Point(0, 0), new Point(408, 0));
  horizontalLineQV16 = new Line(new Point(0, 0), new Point(323, 0));
  horizontalLineQV8 = new Line(new Point(0, 0), new Point(238, 0));
  horizontalLineQV4 = new Line(new Point(0, 0), new Point(153, 0));


  axisQCountLine = new Line(new Point(50, 450), new Point(50, 50))
  axisReducedErrorLine = new Line(new Point(100, 500), new Point(500, 500))
}
</script>
<style scoped lang="scss">

.what-is-qv-chart {
  position: relative;
  margin: 0 auto;
  width: 550px;
  height: 510px;

  &__axis {
    width: 550px;
    height: 510px;

    &__arrow {
      position: absolute;
      width: 510px;
      bottom: 0;
      left: 0;
      padding-left: 70px;

      &_vertical {
        transform: translate(-50%, 0) translate(15px, 15px) rotate(270deg) translate(50%, 0);
      }
    }
  }
  &__content {
    position: absolute;
    bottom: 45px;
    left: 45px;
  }

  &__square {
    position: absolute;
    bottom: 0px;
    left: 0px;

    &__content {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: #F2F4F8;
    }

    &__text {
      position: absolute;
      top: 0px;
      right: 5px;
      
      display: block;
      font-family: 'IBM Plex Sans';
      font-style: normal;
      font-weight: normal;
      font-size: 10px;
      line-height: 16px;
      text-align: right;
    }

    &__tooltip {
      display: none;
      position: absolute;
      right: -10px;
      top: -130px;
      width: 200px;
      height: 120px;

      background: #343A3F;
      border-radius: 2px;

      padding: 10px;
      color: #FFFFFF;

      font-family: 'IBM Plex Sans';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;

      &::after {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        bottom: -8px;
        right: 20px;

        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        
        border-top: 9px solid #343A3F;
      }
    }

    &__content:hover :deep() &__tooltip {
      display: block;
    }

    $layer-width: 50px;
    $layer-gap: 35px;
    $layer-start: 20px;

    &__layer {
      position: absolute;
      top: 15px;
      right: $layer-start;

      @for $i from 0 to 5 {
        &_#{$i} {
          right: $layer-start + ($layer-width + $layer-gap) * $i;
        }
      }
    }

    $line-gap: 85px;
    $line-start: 55px;

    &__qubit-line {
      position: absolute;
      top: $line-start;
      left: 25px;

      :deep() path {
        stroke: url(#graphite);
      }
      @for $i from 0 to 5 {
        &_#{$i} {
          top: $line-start + $line-gap * $i;
        }
      }
    }

    $ket0-gap: 85px;
    $ket0-start: $line-start - 7px;

    &__ket0 {
      position: absolute;
      top: $ket0-start;
      left: 0px;

      @for $i from 0 to 5 {
        &_#{$i} {
          top: $ket0-start + $ket0-gap * $i;
        }
      }
    }
    
  }


  $disabled-opacity: 0.3;
  $root: &;
  
  &_state {
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes arrowInAnimation {
      from { margin-right: 500px; }
      to { margin-right: 0; }
    }
    @keyframes crescentQVAnimation {
      from { transform: translate(-50%, 50%) scale(0.4) translate(50%, -50%); }
      to { transform: translate(-50%, 50%) scale(1) translate(50%, -50%); }
    }

    &-1 {
      #{$root} {
        &__content {
          transition: opacity 0.2s ease-out;
          opacity: 0;
        }
        
        &__axis__arrow_horizontal {
          transition: opacity 0.2s ease-out;
          opacity: 0;
        }

        &__axis__arrow_vertical :deep() .labeled-arrow {
          &__arrow {
            margin-right: 500px;
            animation: 1s ease-out 1s arrowInAnimation;
            animation-fill-mode: forwards;
          }
          &__label {
            opacity: 0;
            animation: 0.5s ease-out 1s fadeIn;
            animation-fill-mode: forwards;
          }
        }
      }
    }
    &-2 {
      #{$root} {
        &__content {
          transition: opacity 0.2s ease-out;
          opacity: 0;
        }

        &__axis__arrow_horizontal :deep() .labeled-arrow {
          &__arrow {
            margin-right: 500px;
            animation: 1s ease-out 0s arrowInAnimation;
            animation-fill-mode: forwards;
          }
          &__label {
            opacity: 0;
            animation: 0.5s ease-out 0s fadeIn;
            animation-fill-mode: forwards;
          }
        }
      }
    }
    
    &-3 {
      #{$root}__square {
        &__ket0 {
          opacity: 0;
        }
        &_qv {
          &4, &8, &16, &32 {
            transition: opacity 0.2s ease-out;
            opacity: 1;
          }
          &8, &16, &32 {
            transition-delay: opacity 0.3s ease-out;
            transform: translate(-50%, 50%) scale(0.4) translate(50%, -50%); 
            animation: .7s ease-out 0.4s crescentQVAnimation;
            animation-fill-mode: forwards;
          }
          &8 {
            animation-delay: 1s;
          }
          &16 {
            animation-delay: 1.5s;
          }
          &32 {
            animation-delay: 2s;
          }
        }
      }
    }

    &-4 {
      :deep() .sketch-square {
        &__lines {
          transition: opacity 0.5s ease-out;
          opacity: 0;
        }
        &__content {
          transition: box-shadow 0.5s ease-out;
          box-shadow: 3px -3px 0 2px rgba(141, 155, 171, 0.0);
        }
      }

      #{$root}__content {
        pointer-events: none;
      }
      
      #{$root}__square {
        &__ket0 {
          transition: opacity 0.5s ease-out 0.5s;
          opacity: 1;
        }
        &__text {
          transition: opacity 0.5s ease-out;
          opacity: 0;
        }
        &_qv {
          &4, &8, &16 {
            transition: opacity 0.5s ease-out;
            opacity: 0;
          }
        }
      }
    }

    &-5 {
      :deep() .sketch-square {
        &__lines {
          transition: opacity 0.5s ease-out;
        }
        &__content {
          transition: box-shadow 0.5s ease-out;
        }
      }

      #{$root}__square {
        &__text {
          transition: opacity 0.5s ease-out;
        }
        &_qv {
          &4, &8, &16 {
            transition: opacity 0.5s ease-out;
          }
        }
      }
    }

  }
}
</style>
