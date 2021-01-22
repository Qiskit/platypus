<template>
  <section class="what-is-qv">
    <button @click="() => selectedInt += 1" />
    <WhatIsQVChart1 class="what-is-qv__chart" :state="selectedInt"/>
    <DotsSelector/>
  </section>
</template>


<script lang="ts">
import { Options, Vue } from "vue-class-component"
import { Line, Point } from "@mathigon/euclid"
import DotsSelector from "./DotsSelector.vue"
import WhatIsQVChart1 from "./WhatIsQVChart1.vue"
import SketchSquare from "../Sketch/SketchSquare.vue"
import SketchLine from "../Sketch/SketchLine.vue"
import SketchArrow from "../Sketch/SketchArrow.vue"
import MarkerArea from "../Sketch/MarkerArea.vue"

@Options({
  components: {
    DotsSelector,
    SketchSquare,
    SketchLine,
    SketchArrow,
    MarkerArea,
    WhatIsQVChart1
  }
})
export default class WhatIsQuantumVolumeSVG extends Vue {
  selectedInt = 0
}
</script>
<style scoped lang="scss">
.what-is-qv {
  &__chart {
    position: relative;

    &-1 {
      position: absolute;
      top: 50px;
      left: 100px;
      width: 420px;
      height: 420px;
    }
    &__axis {
      position: absolute;
      top: 0;
      left: 0;
      width: 550px;
      height: 550px;
      margin: 20px;
    }
  }
}
</style>
