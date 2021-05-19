<template>
  <div class="labeled-arrow">
    <span class="labeled-arrow__label">{{ label }}</span>
    <div class="labeled-arrow__arrow-container">
      <SketchArrow class="labeled-arrow__arrow" :line="line" :draw-soft-lines="false" />
    </div>
  </div>
</template>

<script lang="ts">
import { Line, Point } from '@mathigon/euclid'
import { Options, prop, Vue } from 'vue-class-component'
import SketchArrow from '../Sketch/SketchArrow.vue'

class Props {
  label = prop<String>({ required: true })
}

@Options({
  components: {
    SketchArrow
  }
})
export default class LabeledArrow extends Vue.with(Props) {
  line = new Line(new Point(0, 0), new Point(1000, 0))
  label!: string
}
</script>

<style scoped lang="scss">
.labeled-arrow {
  display: flex;
  align-items: center;
  height: 30px;

  &__label {
    padding: 0 10px;
    flex-basis: content;
  }

  &__arrow-container {
    overflow: hidden;
    height: 30px;
    flex: 1;
  }
  &__arrow {
    overflow: visible;
    display: block;
    margin-top: 15px;
    height: 1px;
    width: 1000px;
    max-width: 1000px;
    float: right;
  }
}
</style>
