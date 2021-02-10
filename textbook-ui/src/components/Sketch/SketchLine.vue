<template>
  <svg class="sketch-line">
    <path
      :d="hardLinePathD"
      class="sketch-line-path sketch-line-path__hard"
      vector-effect="non-scaling-stroke"
      :stroke-dasharray="dashConfiguration"
      :style="`--stroke-color: ${strokeStyle}`"
    />
    <path
      v-if="drawSoftLines"
      :d="softLinePathD"
      class="sketch-line-path sketch-line-path__soft"
      vector-effect="non-scaling-stroke"
      :style="`--stroke-color: ${strokeStyle}`"
    />
  </svg>
</template>

<script lang="ts">
import { Options, prop, Vue } from 'vue-class-component'
import { Line, Point } from '@mathigon/euclid'

class Props {
  line = prop<Line>({ default: new Line(new Point(0, 0), new Point(400, 0)) })

  hardLineExtraLengthInterval = prop<Array<number>>({ default: [3, 5], validator: (val: Array<number>) => val.length === 2 })

  drawSoftLines = prop<boolean>({ default: true })
  softLineExtraLengthInterval = prop<Array<number>>({ default: [7, 10], validator: (val: Array<number>) => val.length === 2 })

  dashed = prop<boolean>({ default: false })
  dashLengthInterval = prop<Array<number>>({ default: [4, 12], validator: (val: Array<number>) => val.length === 2 })

  strokeStyle = prop<String>({ default: '#000000' })
}

@Options({
  computed: {
    dashConfiguration (): string {
      if (!this.dashed) { return 'none' }
      const min: number = this.dashLengthInterval[0]
      const max: number = this.dashLengthInterval[1]

      return Math.round(this.randomRange(min, max)) + ' ' +
             Math.round(this.randomRange(min, max)) + ' ' +
             Math.round(this.randomRange(min, max)) + ' ' +
             Math.round(this.randomRange(min, max)) + ' ' +
             Math.round(this.randomRange(min, max))
    },
    hardLinePathD (): string {
      const normalized: Point = this.line.unitVector
      const start: Point = this.line.p1.translate(normalized.scale(-this.randomLengthHardLine()))
      const end: Point = this.line.p2.translate(normalized.scale(this.randomLengthHardLine()))
      return `M${this.pointToString(start)} L${this.pointToString(end)}`
    },
    softLinePathD (): string {
      const normalized: Point = this.line.unitVector
      const impreciseValue: number = Math.round(this.randomRange(-1.5, 1.5))
      const impreciseAdd: Point = this.line.perpendicularVector.unitVector.scale(impreciseValue)
      const start: Point = this.line.p1.translate(normalized.scale(-this.randomLengthSoftLine())).translate(impreciseAdd)
      const end: Point = this.line.p2.translate(normalized.scale(this.randomLengthSoftLine())).translate(impreciseAdd.scale(-1))
      return `M${this.pointToString(start)} L${this.pointToString(end)}`
    }
  }
})
export default class SketchLine extends Vue.with(Props) {
  randomLengthHardLine (): number {
    const extraLengthInterval = Math.abs(this.hardLineExtraLengthInterval[0] - this.hardLineExtraLengthInterval[1])
    return this.randomRange(0, extraLengthInterval) + Math.min(this.hardLineExtraLengthInterval[0], this.hardLineExtraLengthInterval[1])
  }

  randomLengthSoftLine (): number {
    const extraLengthInterval = Math.abs(this.softLineExtraLengthInterval[0] - this.softLineExtraLengthInterval[1])
    return this.randomRange(0, extraLengthInterval) + Math.min(this.softLineExtraLengthInterval[0], this.softLineExtraLengthInterval[1])
  }

  // randomAsymetry(): number {
  //  return this.randomRange(-this.asymmetryLength, this.asymmetryLength)
  // }
  private randomRange (a: number, b: number) {
    const range = b - a
    return (Math.random() * range + a)
  }

  pointToString (p: Point) {
    return `${Math.round(p.x * 1000) / 1000} ${Math.round(p.y * 1000) / 1000}`
  }
}
</script>

<style scoped lang="scss">
.sketch-line {
  overflow: visible;
  height: 2px;
  pointer-events: none;

  &-path {
    stroke: var(--stroke-color, #000000);
    stroke-width: 1;

    &__soft {
      opacity: 0.3;
    }
  }
}
</style>
