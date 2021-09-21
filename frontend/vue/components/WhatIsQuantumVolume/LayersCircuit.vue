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
      <KetCircuitLine
        v-for="m in parseInt(lines)"
        :key="m"
        class="layers-circuit__circuit-line"
        :line-lenght="circuitLineLength"
        :stroke-style="`url(#graphite-uid${uid})`"
      />
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
            <SU4Gate
              class="layers-circuit__qv-layer__unitary"
              :style="`${gatePositionStyle(j, 0)}`"
              :space-between="gateSpaceBetween(j, 0)"
            />
            <SU4Gate
              class="layers-circuit__qv-layer__unitary"
              :style="`${gatePositionStyle(j, 1)}`"
              :space-between="gateSpaceBetween(j, 1)"
            />
          </div>
        </SketchSquare>
      </div>
      <div class="layers-circuit__veil" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, prop, Vue } from 'vue-class-component'
import { Point } from '@mathigon/euclid'
import SketchSquare from '../Sketch/SketchSquare.vue'
import MarkerArea from '../Sketch/MarkerArea.vue'
import KetCircuitLine from '../Sketch/KetCircuitLine.vue'
import SU4Gate from './SU4Gate.vue'

type LayerUnitary = {
  q1: number;
  q2: number;
};

class Props {
  lines = prop<Number>({ default: 5 })
  layers = prop<Number>({ default: 5 })
  gradientColor = prop<Array<string>>({ default: ['#78A9FF', '#8A3FFC'], validator: (val: Array<string>) => val.length === 2 })
  enableInspection = prop<boolean>({ default: true })
  gatesInspection = prop<Array<Array<LayerUnitary>>>({})
}

@Options({
  components: {
    MarkerArea,
    SketchSquare,
    KetCircuitLine,
    SU4Gate
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
  circuitLineLength = this.layers as number * 85 - 17

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

  gateSpaceBetween (configIdx: number, gateIdx: number) : number {
    if (!this.gatesConfig) {
      return 0
    }

    const config = this.gatesConfig[configIdx % this.gatesConfig.length]
    return config[gateIdx].q2 - config[gateIdx].q1
  }

  gatePositionStyle (configIdx: number, gateIdx: number) : string {
    if (!this.gatesConfig) {
      return ''
    }
    const config = this.gatesConfig[configIdx % this.gatesConfig.length]
    let style = `top: ${11 + 85 * Math.min(config[gateIdx].q1, config[gateIdx].q2)}px;`
    if (this.gatesOverlaping(configIdx)) {
      style += gateIdx === 0 ? 'transform: translateX(45px);' : 'transform: translateX(-45px);'
    }
    return style
  }

  inspectionWidth (configIdx: number) : number {
    return this.gatesOverlaping(configIdx) ? 200 : 100
  }

  gatesOverlaping (configIdx: number) : boolean {
    if (!this.gatesConfig) {
      return false
    }
    const config = this.gatesConfig[configIdx % this.gatesConfig.length]
    const u0 = config[0]
    const u1 = config[1]
    const between = (a: number, b: number, c: number) => (c < a && a < b) || (b < a && a < c)

    return between(u0.q2, u1.q1, u1.q2) ||
      between(u0.q1, u1.q1, u1.q2) ||
      between(u1.q1, u0.q1, u0.q2) ||
      u0.q1 === u1.q1 || u0.q1 === u1.q2 ||
      u0.q2 === u1.q1 || u0.q2 === u1.q2
  }

  randomPop (freePositions: number[]) : number {
    const position = Math.floor(Math.random() * freePositions.length)
    return freePositions.splice(position, 1)[0]
  }

  randomUnitaryPair () {
    const freePositions = Array.from({ length: (this.layers as number) }, (v, i) => i)

    return [{ q1: this.randomPop(freePositions), q2: this.randomPop(freePositions) },
      { q1: this.randomPop(freePositions), q2: this.randomPop(freePositions) }]
  }

  gatesRandomConfig: LayerUnitary[][] = Array.from({ length: Math.floor(this.layers as number) }, (_v, _i) => this.randomUnitaryPair())

  get gatesConfig (): LayerUnitary[][] {
    if (this.gatesInspection !== undefined) {
      return this.gatesInspection
    }
    return this.gatesRandomConfig
  }
}
</script>

<style lang="scss">
html.dark-theme {
  .layers-circuit {
    filter: invert(1) hue-rotate(180deg);
  }
}
</style>

<style scoped lang="scss">
@import '~/../scss/variables/colors.scss';

.layers-circuit {
  color: $text-color-light;
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
      transition: opacity 0.2s ease-out 0s;
      opacity: 0;
    }
    &_inspectable:hover ::v-deep(.marker-area rect) {
      fill: $blue-40;
      // mask: none;
    }
    &_inspectable:hover #{&}__unitary {
      transition: opacity 0.3s ease-out 0.2s;
      opacity: 1;
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
    background-color: $background-color-lighter;
    transition: opacity 0.5s ease-out;
    opacity: 0;
  }

  &__qv-layer_inspectable:hover ~ &__veil {
    opacity: 0.4;
  }

}

</style>
