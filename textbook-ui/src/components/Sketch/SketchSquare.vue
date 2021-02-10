<template>
  <div class="sketch-square">
    <slot class="sketch-square__background" name="svg-background" />
    <div class="sketch-square__content">
      <slot />
    </div>
    <svg class="sketch-square__lines" :viewBox="`0 0 ${width} ${height}`" :width="width" :height="height">
      <SketchLine v-if="!hideTop" class="sketch-square__lines__horizontal sketch-square__lines__horizontal_top" :line="lines.top" :dashed="dashed" />
      <SketchLine v-if="!hideLeft" class="sketch-square__lines__vertical sketch-square__lines__vertical_left" :line="lines.left" :dashed="dashed" />
      <SketchLine v-if="!hideBottom" class="sketch-square__lines__horizontal sketch-square__lines__horizontal_bottom" :line="lines.bottom" :dashed="dashed" />
      <SketchLine v-if="!hideRight" class="sketch-square__lines__vertical sketch-square__lines__vertical_right" :line="lines.right" :dashed="dashed" />
    </svg>
  </div>
</template>

<script lang="ts">
import { Line, Point } from '@mathigon/euclid'
import { Options, prop, Vue } from 'vue-class-component'
import SketchLine from './SketchLine.vue'

class Props {
  width = prop<Number>({ type: Number, default: 105 })
  height = prop<Number>({ type: Number, default: 105 })

  hideTop = prop<boolean>({ default: false })
  hideRight = prop<boolean>({ default: false })
  hideBottom = prop<boolean>({ default: false })
  hideLeft = prop<boolean>({ default: false })

  dashed = prop<boolean>({ default: false })
}

@Options({
  components: {
    SketchLine
  },
  computed: {
    lines () {
      const w = parseInt(this.width)
      const h = parseInt(this.height)
      return {
        top: new Line(new Point(0, 0), new Point(w, 0)),
        left: new Line(new Point(0, 0), new Point(0, h)),
        bottom: new Line(new Point(0, h), new Point(w, h)),
        right: new Line(new Point(w, 0), new Point(w, h))
      }
    }
  }
})
export default class SketchSquare extends Vue.with(Props) {}
</script>

<style scoped lang="scss">
.sketch-square {
  &__lines {
    overflow: visible;
    position: relative;
    pointer-events: none;
  }
  &__content {
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    box-shadow: 3px -3px 0 2px rgba(141, 155, 171, 0.3);
  }
}
</style>
