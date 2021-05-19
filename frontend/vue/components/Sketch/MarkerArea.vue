<template>
  <svg class="marker-area" :viewBox="viewBox" :width="width" :height="height" preserveAspectRatio="none">
    <rect
      class="marker-area__rect"
      width="1"
      height="1"
      :style="`--mask:url(#${markerMaskId}); --fill:${fillAttributeValue()};`"
    />
  </svg>
</template>

<script lang="ts">
import { Options, prop, Vue } from 'vue-class-component'

class Props {
  markerMaskId = prop<string>({ required: true })
  fillId = prop<string>({ default: '' })
  fillColor = prop<string>({ default: '#DDDDDD' })
  width = prop<number>({ default: 512 })
  height = prop<number>({ default: 512 })
  randomize = prop<boolean>({ default: true })
}

@Options({
  computed: {
    viewBox (): string {
      const randomShift = this.randomize ? Math.random() : 0
      const width = parseInt(this.width)
      const height = parseInt(this.height)
      if (width <= height) {
        const aspectRatio = width / height
        return `${randomShift * (1 - aspectRatio)} 0 ${aspectRatio} 1`
      } else {
        const aspectRatio = height / width
        return `0 ${randomShift * (1 - aspectRatio)} 1 ${aspectRatio}`
      }
    }
  }
})
export default class SketchSquare extends Vue.with(Props) {
  fillAttributeValue (): string {
    return this.fillId !== '' ? `url(#${this.fillId})` : this.fillColor
  }
}
</script>

<style scoped lang="scss">
  .marker-area__rect {
    mask: var(--mask);
    fill: var(--fill);
  }
</style>
