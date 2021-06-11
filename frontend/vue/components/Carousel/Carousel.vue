<template>
  <section class="carousel">
    <div ref="elementsWrapperRef" class="carousel__elements_wrapper">
      <slot />
    </div>
    <DotsSelector ref="dotsSelectorRef" class="carousel__selector" :count="count" :disable-arrows="disableArrows" @onSelectedChange="selectedIntChange" />
  </section>
</template>

<script lang="ts">
import { ref } from '@vue/reactivity'
import { Options, prop, Vue } from 'vue-class-component'
import DotsSelector from '../common/DotsSelector.vue'

class Props {
  disableArrows = prop<boolean>({ default: false, required: true })
}

@Options({
  components: {
    DotsSelector
  }
})
export default class Carousel extends Vue.with(Props) {
  elementsWrapperRef = ref<HTMLElement | null>(null)
  get elementsWrapper () { return (this.elementsWrapperRef as unknown as HTMLElement) }
  dotsSelectorRef = ref<DotsSelector | null>(null)
  get dotsSelector () { return (this.dotsSelectorRef as unknown as DotsSelector) }
  selectedInt = 0
  count = 0

  mounted () {
    this.updateSlides()
  }

  updateSlides () {
    this.selectedIntChange(0)
    this.count = this.elementsWrapper.childElementCount
  }

  selectedIntChange (value :number) {
    const oldValue = this.selectedInt
    const oldSelectedEl = this.elementsWrapper.children[oldValue]
    if (oldSelectedEl) {
      oldSelectedEl.classList.remove('active')
    }

    this.selectedInt = value
    const selectedEl = this.elementsWrapper.children[value]
    if (selectedEl) {
      selectedEl.classList.add('active')
    }
    this.$emit('onSelectedChange', value)
  }

  nextSlide () {
    this.dotsSelector.nextDot()
  }
}
</script>
<style scoped lang="scss">
.carousel {
  &__elements_wrapper {
    padding: 15px;
    font-size: 0.875rem;
    line-height: 1.7rem;

    & > :not(.active) {
      display: none;
    }
  }
  &__selector {
    margin-top: 30px;
  }
}
</style>
