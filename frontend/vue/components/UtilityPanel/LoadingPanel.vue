<template>
  <div class="loading-panel">
    <CvSkeletonText paragraph :line-count="4" />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import CvSkeletonText from '@carbon/vue/src/components/cv-skeleton-text/cv-skeleton-text.vue'

@Options({
  components: { CvSkeletonText }
})

export default class EmptyPanel extends Vue {}
</script>

<style lang="scss">
@import '../../../scss/variables/colors.scss';
@import 'carbon-components/scss/globals/scss/typography';

// override
.loading-panel {
  p {
    margin-bottom: $spacing-05;
    width: 100% !important;
  }
}
</style>
