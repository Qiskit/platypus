<template>
  <section class="export-section">
    <h4 class="export-section__title">
      {{ $translate('Export user data') }}
    </h4>
    <p class="export-section__description">
      {{ $translate('Click the button below to export your user data in a .csv file format') }}
    </p>
    <AppCta
      class="export-section__cta"
      :label="exportDataLink.label"
      :segment="exportDataLink.segment"
      :isDownloadable="true"
      @click="exportUserDataAction($event)"
    >
      {{ $translate('Export data') }}
    </AppCta>
    <CvToastNotification
      v-if="isToastVisible"
      class="export-section__toast"
      :class="{
        'export-section__toast__success': exportToastKind === 'success',
        'export-section__toast__error': exportToastKind === 'error'
      }"
      :kind="exportToastKind"
      :sub-title="exportToastMessage"
      :low-contrast="true"
      @close="closeToast"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import AppCta from '../common/AppCta.vue'
import CvToastNotification from '@carbon/vue/src/components/cv-toast-notification/cv-toast-notification.vue'

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
      },
      exportToastKind: "",
      exportToastMessage: "",
      isToastVisible: false,
    }
  },
  components: {
    AppCta,
    CvToastNotification
  },
  methods: {
    exportUserDataAction(ev: any) {
      ev.preventDefault()
      this.isToastVisible = true
      this.exportToastKind = "success"
      this.exportToastMessage = this.$translate('Data export successfully download will begin shortly.')
      // this.exportToastKind = "error"
      // this.exportToastMessage = this.$translate('Error exporting data. Please try again later.')
    },
    closeToast () {
      this.isToastVisible = false
    }
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

  &__toast {
    position: fixed;
    background-color: $cool-gray-10;
    top: $spacing-10;
    right: 0;

    &__error {
      border: $red-60;
      border-style: solid;
      border-width: 1px 1px 1px 3px;
    }

    &__success {
      border: $green-60;
      border-style: solid;
      border-width: 1px 1px 1px 3px;
    }
  }
}
</style>
