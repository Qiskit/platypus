<template>
  <section class="account-admin">
    <UserAccountSectionHeader>
      <template #title>
        {{ $translate("Account") }}
      </template>
      <template #description>
        {{ $translate("This page contains privacy information, including the IBM privacy statement, the end user license agreement, and the ability to delete your account. If you would like copy of all of your user account data, please email") }}
        <AppLink class="account-admin__policy-email" url="mailto:qiskit@us.ibm.com">
          qiskit@us.ibm.com.
        </AppLink>
      </template>
    </UserAccountSectionHeader>
    <section class="account-admin__section">
      <h4 class="account-admin__subtitle account-admin__subtitle_general">
        {{ $translate('Overview') }}
      </h4>
      <div class="account-admin__info">
        <span class="account-admin__info__label"><strong>{{ $translate('Name') }}</strong></span>
        <span>{{ firstName }} {{ lastName }}</span>
      </div>
      <div class="account-admin__info">
        <span class="account-admin__info__label"><strong>{{ $translate('Email') }}</strong></span>
        <span>{{ email }}</span>
      </div>
      <div class="account-admin__info">
        <span class="account-admin__info__label"><strong>{{ $translate('API Token') }}</strong></span>
        <p>
          Good instructions here as to what’s going on.  <BasicLink url="https://link-to-iqx">
            Link to IQX.
          </BasicLink>
        </p>
        <div class="account-admin__input-container">
          <bx-input
            ref="apiTokenInput"
            class="account-admin__input-field"
            name="apiToken"
            type="text"
            placeholder="paste token here"
            color-scheme="regular"
            :required="true"
          />
          <BasicLink class="account-admin__input-action">Save</BasicLink>
        </div>
      </div>
    </section>
    <h4 class="account-admin__subtitle account-admin__subtitle_general">
      {{ $translate('IBM Privacy Statement') }}
    </h4>
    <AppLink class="account-admin__policy-link" url="https://www.ibm.com/privacy">
      https://www.ibm.com/privacy
    </AppLink>
    <h4 class="account-admin__subtitle account-admin__subtitle_quantum">
      {{ $translate('IBM Quantum End User Agreement') }}
    </h4>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="account-admin__policy-text" v-html="privacyPolicyHTML" />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import MarkdownIt from 'markdown-it'
import BXInput from 'carbon-web-components/es/components/input/input.js'
import AppLink from '../common/AppLink.vue'
import BasicLink from '../common/BasicLink.vue'
import UserAccountSectionHeader from './UserAccountSectionHeader.vue'

export default defineComponent({
  name: 'AccountAdmin',
  components: {
    AppLink,
    BasicLink,
    UserAccountSectionHeader
  },
  props: {
    firstName: { type: String, required: false, default: '' },
    lastName: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' }
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

.account-admin {
  @include contained();
  margin-left: 0;
  padding-top: $spacing-07;
  padding-bottom: $spacing-07;

  &__section {
    padding-bottom: $spacing-05;
    border-bottom: 2px solid $border-color-light-2;
  }

  &__info {
    &:not(:last-child) {
      margin-bottom: $spacing-07;
    }
    &__label {
      display: inline-block;
      margin-bottom: $spacing-03;
      padding-right: $spacing-08;
    }
  }

  &__input-field {
    margin-right: $spacing-07;
  }

  &__input-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 24rem;
  }

  &__input-action {
    display: block;
    margin-top: $spacing-04;
  }

  &__subtitle {
    @include type-style('expressive-heading-04');
    padding: $spacing-06 0 $spacing-05 0;

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
