<template>
  <div class="empty-panel">
    <p class="empty-panel__title">
      {{ $translate('Nothing here yet') }}
    </p>
    <p class="empty-panel__description">
      {{ $translate('Eventually, all the vocabulary and mathematics from this section will be shown here. Until then, you can visit the') }}
      <BasicLink v-bind="link" @click="redirectAction($event, link)">
        {{ $translate(link.label) }}
      </BasicLink>
    </p>
    <img
      alt="Illustration of hands working with tools"
      class="empty-panel__img"
      :src="emptyPanelImage"
    >
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

  get isDarkMode () {
    const htmlDom = document.getElementsByTagName('html')[0]

    return htmlDom.classList.contains('dark-theme')
  }

  get emptyPanelImage () {
    let url = 'work-in-progress.png'

    if (this.isDarkMode) {
      url = 'work-in-progress-dark.png'
    }

    return `/images/${url}`
  }

  redirectAction (event: any, link: any) {
    // Segment analytics tracking
    event.preventDefault()
    const windowInstance = (window as any)

    windowInstance.textbook.trackClickEvent(link.label, link.segment)
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
