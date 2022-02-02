<template>
  <div class="eula">
    <h1 class="eula__title">
      {{ $translate('Qiskit End User Agreement') }}
    </h1>
    <p class="eula__subtitle">
      {{ $translate('Please read and accept the End User License Agreement to complete your account setup.') }}
    </p>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="eula__policy-text" v-html="privacyPolicyHTML" />
    <section class="eula__actions__container">
      <p class="eula__actions__description">
        {{ $translate('By clicking &ldquo;Accept &amp; Continue&rdquo;, you agree to the Qiskit End User Agreement.') }}
      </p>
      <div class="eula__actions">
        <AppCta
          class="eula__actions__cancel"
          v-bind="cancelAction"
          target="_self"
          kind="ghost"
        />
        <AppCta
          v-bind="acceptAction"
          target="_self"
        />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import AppCta from '../common/AppCta.vue'
import MarkdownIt from 'markdown-it'
import 'carbon-web-components/es/components/checkbox/checkbox.js'

export default defineComponent({
  name: 'EndUserLicenseAgreementLayout',
  components: {
    AppCta
  },
  data () {
    return {
      options: {
        html: true,
        xhtmlOut: true,
        breaks: true,
        linkify: true
      },
      privacyPolicyMd: 'Loading...',
      cancelAction: {
        url: 'signin',
        label: this.$translate('Cancel'),
        segment: {
          cta: 'cancel',
          location: 'end-user-license-agreement'
        }
      },
      acceptAction: {
        url: 'account',
        label: this.$translate('Accept & Continue'),
        segment: {
          cta: 'accept',
          location: 'end-user-license-agreement'
        }
      }
    }
  },
  computed: {
    markdownItInstance (): MarkdownIt { return MarkdownIt(this.options) },
    privacyPolicyHTML (): string { return this.markdownItInstance.render(this.privacyPolicyMd) }
  },
  mounted () {
    this.privacyPolicyMd = document.getElementById('privacyPolicy')?.textContent || ''
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/colors.scss';
@import '~/../scss/variables/mq.scss';
@import '~/../scss/mixins/mixins.scss';

.eula {
  @include contained();
  padding-top: $spacing-07;
  padding-bottom: $spacing-07;

  &__title {
    @include type-style('expressive-heading-05', $fluid: true);
    padding-bottom: $spacing-05;
  }

  &__subtitle {
    @include type-style('body-long-01');
    padding-bottom: $spacing-07;
  }

  &__policy-text {
    padding: $spacing-06;
    background-color: $background-color-lighter;
    color: $text-color-dark;
    max-height: 30rem;
    overflow: auto;
    @include mq($until: medium) {
      max-height: none;
    }

    & > ::v-deep(*) {
      margin-bottom: $spacing-05;
    }
    & > ::v-deep(*):last-child {
      margin-bottom: 0;
    }
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    padding-top: $spacing-05;

    &__cancel {
      display: flex;
      justify-content: space-between;
      padding: $spacing-05;
      background-color: $cool-gray-10;
      margin-right: $spacing-05;

      :deep() > .app-cta__icon {
        transform: rotate(180deg);
      }
    }

    &__description {
      @include type-style('body-long-01');
    }

    &__container {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding: $spacing-07 0;
    }
  }
}

</style>
