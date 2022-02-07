<template>
  <section class="export-section">
    <h4 class="export-section__title">
      {{ $translate('Export user data') }}
    </h4>
    <p class="export-section__description">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium harum eius est at temporibus minima pariatur quae quisquam sed, tempore accusamus enim repudiandae totam qui voluptatem. Quae temporibus corrupti rem.</p>
    <AppCta
      class="export-section__cta"
      :label="exportDataLink.label"
      :segment="exportDataLink.segment"
    >
      {{ $translate('Export data') }}
    </AppCta>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import AppCta from '../common/AppCta.vue'

export default defineComponent({
  name: 'ExportUserDataSection',
  data () {
    return {
      exportDataLink: {
        label: 'Export data',
        segment: {
          cta: 'export-data',
          location: 'user-account-privacy'
        }
      }
    }
  },
  components: {
    AppCta
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/mq.scss';
@import '~/../scss/variables/colors.scss';
@import '~/../scss/mixins/mixins.scss';

.export-section {
  @include contained();
  margin-left: 0;
  padding-bottom: $spacing-06;

  &__title {
    @include type-style('expressive-heading-04');
    padding: $spacing-05 0;
  }

  &__description {
    @include type-style('body-long-01');
    padding-bottom: $spacing-05;
  }

  &__cta {
    @include type-style('body-long-02');
  }
}

</style>
