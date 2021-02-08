<template>
  <div
    class="layers-circuit"
    :style="`--circuit-wrapper-width: ${wrappersDim.x}px; --circuit-wrapper-height: ${wrappersDim.y}px;`"
  >
    <svg width="1" height="1" class="layers-circuit__svg-definitions">
      <defs>
        <pattern :id="`graphite-uid${uid}`" patternUnits="userSpaceOnUse" width="512" height="512">
          <image href="../../images/PencilTexture.png" x="0" y="0" width="512" height="512" />
        </pattern>
        <linearGradient :id="`layer-gradient-uid${uid}`" gradientUnits="objectBoundingBox" gradientTransform="rotate(90)">
          <stop :stop-color="gradientColor[0]" />
          <stop offset="1" :stop-color="gradientColor[1]" />
        </linearGradient>
        <mask :id="`marker-uid${uid}`" style="mask-type: luminance">
          <image
            href="../../images/MarkerBg.jpg"
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
          />
        </mask>
      </defs>
    </svg>
    <div class="layers-circuit__circuit-lines-wrapper">
      <div
        v-for="m in parseInt(lines)"
        :key="m"
        class="layers-circuit__circuit-line"
      >
        <Ket0 class="layers-circuit__circuit-line__ket0" />
        <SketchLine
          class="layers-circuit__circuit-line__line"
          :stroke-style="`url(#graphite-uid${uid})`"
          :line="circuitLine"
          :dashed="false"
          :draw-soft-lines="false"
        />
      </div>
    </div>
    <div
      class="layers-circuit__qv-layers-wrapper"
      :style="`--qv-layers-wrapper-width: ${wrappersDim.x}px; --qv-layers-wrapper-height: ${wrappersDim.y}px;`"
    >
      <div
        v-for="(m, j) in parseInt(layers)"
        :key="m"
        class="layers-circuit__qv-layer"
        :class="{'layers-circuit__qv-layer_inspectable': enableInspection }"
      >
        <SketchSquare
          class="layers-circuit__qv-layer-content-wrapper"
          :width="inspectionWidth(j)"
          :height="layersHeight"
          :style="`--center-distance: ${normalizedCenterDistance(j)}; --inspection-width: ${inspectionWidth(j)}px;`"
        >
          <div class="layers-circuit__qv-layer-content">
            <MarkerArea
              class="layers-circuit__qv-layer__layer-square"
              :marker-mask-id="`marker-uid${uid}`"
              :fill-id="`layer-gradient-uid${uid}`"
              :width="inspectionWidth(j)"
              :height="layersHeight"
            />
            <SketchSquare
              class="layers-circuit__qv-layer__unitary"
              :width="100"
              :height="gateHeight(j, 0)"
              :style="`${gatePositionStyle(j, 0)} --gate-height: ${gateHeight(j, 0) + 20};`"
            >
              <div class="layers-circuit__qv-layer__unitary__content">
                <div class="layers-circuit__qv-layer__unitary__content__q0">
                  {{ unitaryQubitText(j, 0, 0) }}
                </div>
                <div class="layers-circuit__qv-layer__unitary__content__gate-name">
                  Unitary
                </div>
                <div class="layers-circuit__qv-layer__unitary__content__q1">
                  {{ unitaryQubitText(j, 0, 1) }}
                </div>
              </div>
            </SketchSquare>
            <SketchSquare
              class="layers-circuit__qv-layer__unitary"
              :width="100"
              :height="gateHeight(j, 1)"
              :style="`${gatePositionStyle(j, 1)} --gate-height: ${gateHeight(j, 1) + 20};`"
            >
              <div class="layers-circuit__qv-layer__unitary__content">
                <div class="layers-circuit__qv-layer__unitary__content__q0">
                  {{ unitaryQubitText(j, 1, 0) }}
                </div>
                <div class="layers-circuit__qv-layer__unitary__content__gate-name">
                  Unitary
                </div>
                <div class="layers-circuit__qv-layer__unitary__content__q1">
                  {{ unitaryQubitText(j, 1, 1) }}
                </div>
              </div>
            </SketchSquare>
          </div>
        </SketchSquare>
      </div>
      <div class="layers-circuit__veil" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, prop, Vue } from 'vue-class-component'
import { Line, Point } from '@mathigon/euclid'
import SketchLine from '../Sketch/SketchLine.vue'
import SketchSquare from '../Sketch/SketchSquare.vue'
import MarkerArea from '../Sketch/MarkerArea.vue'
import Ket0 from '../Sketch/Ket0.vue'

type LayerUnitary = {
  q1: number;
  q2: number;
};

class Props {
  lines = prop<Number>({ default: 5 })
  layers = prop<Number>({ default: 5 })
  gradientColor = prop<Array<string>>({ default: ['#78A9FF', '#8A3FFC'], validator: (val: Array<string>) => val.length === 2 })
  enableInspection = prop<boolean>({ default: true })
  gatesConfig = prop<Array<Array<LayerUnitary>>>({
    default: [
      [{ q1: 0, q2: 1 }, { q1: 2, q2: 3 }],
      [{ q1: 0, q2: 3 }, { q1: 3, q2: 4 }],
      [{ q1: 0, q2: 1 }, { q1: 3, q2: 4 }],
      [{ q1: 0, q2: 1 }, { q1: 2, q2: 4 }],
      [{ q1: 0, q2: 4 }, { q1: 3, q2: 4 }]
    ]
  })
}

@Options({
  components: {
    SketchLine,
    MarkerArea,
    SketchSquare,
    Ket0
  },
  computed: {
    wrappersDim (): Point {
      const dimX = this.layers as number * 85 + 25
      const dimY = this.lines as number * 85 + 25
      return new Point(dimX, dimY)
    },
    layersHeight (): number {
      return this.lines as number * 85 - 10
    }
  }
})
export default class LayersCircuit extends Vue.with(Props) {
  uid = Math.random().toString().replace('.', '')
  circuitLine = new Line(new Point(0, 0), new Point((this.layers as number - 1) * 85 + 68, 0))

  unitaryQubitText (configIdx: number, gateIdx: number, line: number) : string {
    const config = this.gatesConfig[configIdx % this.gatesConfig.length]
    const q1 = config[gateIdx].q1
    const q2 = config[gateIdx].q2
    return q1 < q2 ? `${line}` : `${1 - line}`
  }

  normalizedCenterDistance (idx: number) : number {
    const semiLayersCount = (this.layers as number - 1) / 2
    return (-semiLayersCount + idx) / semiLayersCount
  }

  gateHeight (configIdx: number, gateIdx: number) : number {
    if (!this.gatesConfig) {
      return 0
    }
    const config = this.gatesConfig[configIdx % this.gatesConfig.length]
    const q1 = config[gateIdx].q1
    const q2 = config[gateIdx].q2
    return 50 + 85 * Math.abs(q2 - q1)
  }

  gatePositionStyle (configIdx: number, gateIdx: number) : string {
    if (!this.gatesConfig) {
      return ''
    }
    const config = this.gatesConfig[configIdx % this.gatesConfig.length]
    let style = `top: ${15 + 85 * Math.min(config[gateIdx].q1, config[gateIdx].q2)}px;`
    if (this.gatesOverlaping(configIdx)) {
      style += gateIdx === 0 ? 'transform: translateX(60px);' : 'transform: translateX(-60px);'
    }
    return style
  }

  inspectionWidth (configIdx: number) : number {
    return this.gatesOverlaping(configIdx) ? 270 : 150
  }

  gatesOverlaping (configIdx: number) : boolean {
    if (!this.gatesConfig) {
      return false
    }
    const config = this.gatesConfig[configIdx % this.gatesConfig.length]
    const u0 = config[0]
    const u1 = config[1]
    const between = (a: number, b: number, c: number) => (c < a && a < b) || (b < a && a < c)

    return between(u0.q2, u1.q1, u1.q2) || between(u0.q1, u1.q1, u1.q2) ||
      u0.q1 === u1.q1 || u0.q1 === u1.q2 ||
      u0.q2 === u1.q1 || u0.q2 === u1.q2
  }
}
</script>
<style scoped lang="scss">

.layers-circuit {
  position: relative;
  margin: 0 auto;
  width: var(--circuit-wrapper-width, 400px);
  min-width: var(--circuit-wrapper-width, 400px);

  &__circuit-lines-wrapper {
    top: 0;
    left: 0;
    width: var(--circuit-wrapper-width, 400px);
    height: var(--circuit-wrapper-height, 400px);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &__circuit-line {
    width: var(--circuit-wrapper-width, 400px);
    height: 85px;
    display: flex;
    align-items: center;

    &__ket0 {
      flex: 0 0 20px;
      margin-right: 10px;
    }

    &__line {
      flex: 1;
    }
  }

  &__qv-layers-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--qv-layers-wrapper-width, 400px);
    height: var(--qv-layers-wrapper-height, 400px);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 15px 20px 20px 40px;
  }

  &__qv-layer {
    flex: 0 0 50px;
    max-width: 50px;

    &-content {
      overflow: hidden;
      transition: width 0.5s ease-out, left 0.5s ease-out, z-index 0.5s ease-out;
      width: 50px;
      position: relative;
      left: 0px;
      display: flex;
      justify-content: center;
      z-index: 0;
    }
    &-content-wrapper {
      position: relative;
      transition: left 0.5s ease-out, z-index 0.5s ease-out;
      width: 50px;
      left: 0px;
      display: flex;
      justify-content: center;
      z-index: 0;
      height: 100%;

      :deep() > .sketch-square__lines {
        transition: opacity 0s ease-out 0s;
        opacity: 0;
      }
      :deep() > .sketch-square__content {
        box-shadow: none;
        width: auto;
      }
    }

    &_inspectable:hover #{&}-content-wrapper, &_inspectable:hover #{&}-content {
      width: var(--inspection-width, 150px);
      --semi-extra-width: calc((var(--inspection-width, 150px) - 50px) / 2);
    }
    &_inspectable:hover #{&}-content-wrapper {
      left: calc((var(--semi-extra-width) + var(--center-distance, 0) * (var(--semi-extra-width) - 20px)) * -1 );
      z-index: 10;

      :deep() .sketch-square__lines {
        transition: opacity 0.2s ease-out 0.5s;
        opacity: 1;
      }
    }

    &__layer-square {
      flex: 0 0 auto;

      @at-root x-step svg#{&} {
        max-width: none;
      }
    }
    &__unitary {
      position: absolute;

      & :deep() .sketch-line-path {
        stroke-dasharray: var(--gate-height, 500);
        stroke-dashoffset: var(--gate-height, 500);
        transition: stroke-dashoffset 0.1s ease-out 0s;
      }

      & :deep() .sketch-square__lines__horizontal .sketch-line-path {
        stroke-dasharray: 120;
        stroke-dashoffset: 120;
      }

      & :deep() .sketch-square__content {
        box-shadow: none;
        background: rgb(255,255,255);
        background: linear-gradient(150deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 34%, rgba(255,255,255,0.65) 35%, rgba(255,255,255,0.65) 50%, rgba(255,255,255,0.35) 51%, rgba(255,255,255,0.35) 65%, rgba(255,255,255,0) 66%, rgba(255,255,255,0) 100%);
        background-size: 300% 300%;
        background-position: 100% 100%;
        opacity: 0;
        transition: background-position 0.5s ease-out 0.3s, opacity 0.3s ease-out 0.1s;
      }

      &__content {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        padding: 15px 20px;
        height: 100%;
        width: 100%;

        &__gate-name {
          text-align: right;
        }
      }
    }

    &_inspectable:hover #{&}__unitary :deep() .sketch-line-path {
      stroke-dashoffset: 0;
      transition: stroke-dashoffset 0.7s ease-out 0.3s;
    }

    &_inspectable:hover #{&}__unitary :deep() .sketch-square__content {
      opacity: 1;
      background-position: 0% 0%;
    }
  }

  &__veil {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background-color: #F2F4F8;
    transition: opacity 0.5s ease-out;
    opacity: 0;
  }

  &__qv-layer_inspectable:hover ~ &__veil {
    opacity: 0.4;
  }

}

</style>
