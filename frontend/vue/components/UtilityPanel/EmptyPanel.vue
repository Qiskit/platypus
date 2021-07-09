<template>
  <div class="empty-panel">
    <p class="empty-panel__title">
      Nothing here yet
    </p>
    <p class="empty-panel__description">
      Eventually, all the vocabulary and mathematics from this section will be shown here. Until then, you can visit the <BasicLink v-bind="link" @click="redirectAction($event, link)">
        {{ link.label }}
      </BasicLink>
    </p>
    <img class="empty-panel__img" src="/images/work-in-progress.png" alt="Illustration of hands working with tools">
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import BasicLink from '../common/BasicLink.vue'

@Options({
  components: { BasicLink }
})

export default class EmptyPanel extends Vue {
  glossaryLabel = 'Glossary'
  link = {
    label: 'universal glossary',
    url: '#',
    segment: {
      cta: 'universal-glossary',
      location: 'chapter-details-panel'
    }
  }

  redirectAction (event: any, link: any) {
    // Segment analytics tracking
    event.preventDefault()
    const windowInstance = (window as any)

    windowInstance.textbook.trackClickEvent({ cta: link.label, location: link.segment })
    this.$emit('handleRedirect', this.glossaryLabel)
  }
}
</script>

<style lang="scss" scope>
@import '../../../scss/variables/colors.scss';
@import 'carbon-components/scss/globals/scss/typography';

.empty-panel {
  &__title {
    @include type-style('productive-heading-03');
  }

  &__description {
    @include type-style('body-short-01');
  }

  &__img {
    margin-bottom: $spacing-05;
    width: 100%;
  }
}
</style>
