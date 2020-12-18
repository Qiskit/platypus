<template>
  <div>
    <svg class="sketch-square" :viewBox="`0 0 ${height} ${height}`" :width="width" :height="height">
      <SketchLine :line="lines.top" />
      <SketchLine :line="lines.left" />
      <SketchLine :line="lines.bottom" />
      <SketchLine :line="lines.right" />
      <slot name="svg-background"></slot>
    </svg>
    <div class="sketch-square__content"></div>
  </div>
</template>

<script lang="ts">
import { Line, Point } from "@mathigon/euclid"
import { Options, prop, Vue } from "vue-class-component"
import SketchLine from "./SketchLine.vue"

class Props {
  width = prop<Number>({ type: Number, default: 105 })
  height = prop<Number>({ type: Number, default: 105 })
}

@Options({
  components: {
    SketchLine
  },
  computed: {
    lines() {
      const w = parseInt(this.width)
      const h = parseInt(this.height)
      return {
        top: new Line(new Point(0, 0), new Point(w, 0)),
        left: new Line(new Point(w, 0), new Point(w, h)),
        bottom: new Line(new Point(w, h), new Point(0, h)),
        right: new Line(new Point(0, h), new Point(0, 0))
      }
    }
  }
})
export default class SketchSquare extends Vue.with(Props) {}
</script>

<style scoped lang="scss">
.sketch-square {
  overflow: visible;

  &__content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
</style>
