<template>
  <section class="privacy-section">
    <UserAccountSectionHeader>
      <template #title>
        {{ $translate("Privacy") }}
      </template>
      <template #description>
        <!-- TODO: update section header description and provide translation -->
        {{ $translate("This page contains privacy information, including the IBM privacy statement, the end user license agreement, and the ability to delete your account. If you would like copy of all of your user account data, please email") }}
        <AppLink class="privacy-section__policy-email" url="mailto:qiskit@us.ibm.com">
          qiskit@us.ibm.com.
        </AppLink>
      </template>
    </UserAccountSectionHeader>
    <h4 class="privacy-section__subtitle privacy-section__subtitle_general">
      {{ $translate('IBM Privacy Statement') }}
    </h4>
    <AppLink class="privacy-section__policy-link" url="https://www.ibm.com/privacy">
      https://www.ibm.com/privacy
    </AppLink>
    <h4 class="privacy-section__subtitle privacy-section__subtitle_quantum">
      {{ $translate('IBM Quantum End User Agreement') }}
    </h4>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="privacy-section__policy-text" v-html="privacyPolicyHTML" />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import MarkdownIt from 'markdown-it'
import AppLink from '../common/AppLink.vue'
import UserAccountSectionHeader from '../UserAccount/UserAccountSectionHeader.vue'

export default defineComponent({
  name: 'PrivacySection',
  components: {
    AppLink, UserAccountSectionHeader
  },
  data () {
    return {
      options: {
        html: true,
        xhtmlOut: true,
        breaks: true,
        linkify: true
      },
      privacyPolicyMd: 'Loading...'
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
@import '~/../scss/variables/mq.scss';
@import '~/../scss/variables/colors.scss';
@import '~/../scss/mixins/mixins.scss';

.privacy-section {
  @include contained();
  margin-left: 0;
  padding-top: $spacing-07;
  padding-bottom: $spacing-07;

  &__subtitle {
    @include type-style('expressive-heading-04');
    padding: $spacing-05 0;

    &_quantum {
      margin-top: $spacing-08;
    }
  }

  &__policy-link {
    @include type-style('body-long-02');
    color: $link-color-secondary;
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

  &__policy-email {
    color: $link-color-secondary;
  }
}

</style>
