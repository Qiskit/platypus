<template>
  <svg class="sketch-arrow" :viewBox="`0 0 ${height} ${height}`" :width="width" :height="height">
    <SketchLine :line="line" :hardLineExtraLengthInterval="[0, 0]" />
    <SketchLine :line="leftEdgeLine" :hardLineExtraLengthInterval="[0, 0]" :softLineExtraLengthInterval="[3, 5]" />
    <SketchLine :line="rightEdgeLine" :hardLineExtraLengthInterval="[0, 0]" :softLineExtraLengthInterval="[3, 5]"/>
  </svg>
</template>

<script lang="ts">
import { Line, Point } from "@mathigon/euclid"
import { Options, prop, Vue } from "vue-class-component"
import SketchLine from "./SketchLine.vue"

class Props {
  line = prop<Line>({ default: new Line(new Point(0, 0), new Point(400, 0)) })
}

@Options({
  components: {
    SketchLine
  },
  computed: {
    leftEdgeLine() {
      const lineOppsiteVector: Point = this.line.unitVector.scale(-1);
      const linePerpendicularVector: Point = this.line.perpendicularVector;
      const arrowEdgeDirection: Point = lineOppsiteVector.add(linePerpendicularVector).unitVector;
      const unitVector: Point = arrowEdgeDirection.scale(10);

      return new Line(this.line.p2, this.line.p2.add(unitVector))
    },
    rightEdgeLine() {
      const lineOppsiteVector: Point = this.line.unitVector.scale(-1);
      const linePerpendicularVector: Point = this.line.perpendicularVector.scale(-1);
      const arrowEdgeDirection: Point = lineOppsiteVector.add(linePerpendicularVector).unitVector;
      const unitVector: Point = arrowEdgeDirection.scale(10);

      return new Line(this.line.p2, this.line.p2.add(unitVector))
    }
  }
})
export default class SketchArrow extends Vue.with(Props) {}
</script>

<style scoped lang="scss">
</style>
