<template>
  <section class="carousel">
    <div class="carousel__elements-wrapper">
      <div
        ref="elementsWrapperRef"
        class="carousel__elements"
        :style="`transform: translateX(-${ 100 * selectedInt }%);`"
      >
        <slot />
      </div>
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
  &__elements-wrapper {
    padding: 15px;
  }

  &__elements {
    display: flex;
    flex-wrap: nowrap;
    font-size: 0.875rem;
    line-height: 1.7rem;

    & > ::v-deep(*) {
      flex: 0 0 100%;
    }

    & > ::v-deep(:not(.active)) {
      visibility: hidden;
    }
  }
  &__selector {
    margin-top: 30px;
  }
}
</style>
