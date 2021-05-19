<template>
  <svg class="sketch-arrow" :width="width" :height="height">
    <SketchLine :line="line" :hard-line-extra-length-interval="[0, 0]" :draw-soft-lines="drawSoftLines" />
    <SketchLine :line="leftEdgeLine" :hard-line-extra-length-interval="[0, 0]" :soft-line-extra-length-interval="[3, 5]" :draw-soft-lines="drawSoftLines" />
    <SketchLine :line="rightEdgeLine" :hard-line-extra-length-interval="[0, 0]" :soft-line-extra-length-interval="[3, 5]" :draw-soft-lines="drawSoftLines" />
  </svg>
</template>

<script lang="ts">
import { Line, Point } from '@mathigon/euclid'
import { Options, prop, Vue } from 'vue-class-component'
import SketchLine from './SketchLine.vue'

class Props {
  line = prop<Line>({ default: new Line(new Point(0, 0), new Point(400, 0)) })
  drawSoftLines = prop<boolean>({ default: true })
}

@Options({
  components: {
    SketchLine
  },
  computed: {
    leftEdgeLine () {
      const lineOppsiteVector: Point = this.line.unitVector.scale(-1)
      const linePerpendicularVector: Point = this.line.perpendicularVector
      const arrowEdgeDirection: Point = lineOppsiteVector.add(linePerpendicularVector).unitVector
      const unitVector: Point = arrowEdgeDirection.scale(10)

      return new Line(this.line.p2, this.line.p2.add(unitVector))
    },
    rightEdgeLine () {
      const lineOppsiteVector: Point = this.line.unitVector.scale(-1)
      const linePerpendicularVector: Point = this.line.perpendicularVector.scale(-1)
      const arrowEdgeDirection: Point = lineOppsiteVector.add(linePerpendicularVector).unitVector
      const unitVector: Point = arrowEdgeDirection.scale(10)

      return new Line(this.line.p2, this.line.p2.add(unitVector))
    }
  }
})
export default class SketchArrow extends Vue.with(Props) {}
</script>

<style scoped lang="scss">
</style>
