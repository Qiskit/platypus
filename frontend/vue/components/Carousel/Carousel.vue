<template>
  <section class="carousel">
    <div ref="elementsWrapperRef" class="carousel__elements_wrapper">
      <slot />
    </div>
    <DotsSelector class="carousel__selector" :count="count" @onSelectedChange="selectedIntChange" />
  </section>
</template>

<script lang="ts">
import { ref } from '@vue/reactivity'
import { Options, Vue } from 'vue-class-component'
import DotsSelector from '../common/DotsSelector.vue'

@Options({
  components: {
    DotsSelector
  }
})
export default class Carousel extends Vue {
  elementsWrapperRef = ref<HTMLElement | null>(null)
  get elementsWrapper () { return (this.elementsWrapperRef as unknown as HTMLElement) }
  selectedInt = 0
  count = 0

  mounted () {
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
  }
}
</script>
<style scoped lang="scss">
.carousel {
  &__elements_wrapper{
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
