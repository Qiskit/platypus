<template>
  <div class="skeleton-placeholder">
    <CvSkeletonText class="skeleton-placeholder__text" :heading="heading" :paragraph="paragraph" :line-count="lineCount" :width="`100%`" />
  </div>
</template>

<script lang="ts">
import { Options, Vue, prop } from 'vue-class-component'
import CvSkeletonText from '@carbon/vue/src/components/cv-skeleton-text/cv-skeleton-text.vue'

class Props {
  heading = prop({ type: Boolean, default: false })
  paragraph= prop({ type: Boolean, default: true })
  lineCount = prop({ type: Number, default: 1 })
}

@Options({
  components: {
    CvSkeletonText
  }
})

export default class SkeletonText extends Vue.with(Props) {}
</script>
