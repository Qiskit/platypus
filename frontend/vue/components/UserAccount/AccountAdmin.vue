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
        <p class="account-admin__info__introduction">
          {{ $translate("To configure your API Token you can follow the next steps") }}:
        </p>
        <ul class="account-admin__info__steps">
          <li>
            {{ $translate("Create an account in") }}
            <BasicLink url="https://quantum-computing.ibm.com/">
              IBM Quantum.
            </BasicLink>
          </li>
          <li>
            {{ $translate("Access your") }}
            <BasicLink url="https://quantum-computing.ibm.com/account">
              {{ $translate("account page") }}
            </BasicLink>
            {{ $translate("and copy the value from the API token input.") }}
          </li>
          <li>
            {{ $translate('Paste that value in the input below and press "Save".') }}
          </li>
        </ul>
        <div class="account-admin__input-form">
          <div class="account-admin__input-field__container">
            <bx-input
              ref="apiTokenInput"
              class="account-admin__input-field"
              name="apiToken"
              type="password"
              :value="apiToken"
              placeholder="Paste token here"
              :required="true"
              @input="updateToken()"
            />
            <CodeMirrorClipboardCopy v-if="apiToken !== ''" class="account-admin__copy" :text="apiToken" />
          </div>
          <BasicLink v-if="apiToken === ''" class="account-admin__input-status" @click="submitForm">
            Save
          </BasicLink>
          <span v-else class="account-admin__input-status">
            Saved
          </span>
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
import CodeMirrorClipboardCopy from '../CodeMirrorClipboardCopy/CodeMirrorClipboardCopy.vue'
import UserAccountSectionHeader from './UserAccountSectionHeader.vue'

const fetchUrl = '/qiskit-user'

export default defineComponent({
  name: 'AccountAdmin',
  components: {
    AppLink,
    BasicLink,
    CodeMirrorClipboardCopy,
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
      privacyPolicyMd: 'Loading...',
      apiToken: ''
    }
  },
  computed: {
    markdownItInstance (): MarkdownIt { return MarkdownIt(this.options) },
    privacyPolicyHTML (): string { return this.markdownItInstance.render(this.privacyPolicyMd) }
  },
  mounted () {
    this.privacyPolicyMd = document.getElementById('privacyPolicy')?.textContent || ''

    this.fetchUserToken()
  },
  methods: {
    submitForm () {
      const token = (this.$refs.apiTokenInput as BXInput).value
      const csrfToken = { _csrf: window.csrfToken }
      this.apiToken = token
      fetch(fetchUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiToken: token,
          ...csrfToken
        })
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((jsonResult) => {
            console.log(jsonResult, 'result')
          })
        } else {
          // TODO: Manage this error (and improve backend feedback)
          console.error(res)
        }
      })
    },
    fetchUserToken () {
      fetch(fetchUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((jsonResult) => {
            this.apiToken = jsonResult.apiToken
          })
        } else {
          // TODO: Manage this error (and improve backend feedback)
          console.error(res, 'error')
        }
      })
    },
    updateToken () {
      this.apiToken = ''
    }
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

    &__steps {
      list-style: decimal;
      margin: 0 0 0 1.5em;
    }
  }

  &__input-field {

    &__container {
      position: relative;
      margin-right: $spacing-07;
      width: 100%;
      max-width: 22rem;

      bx-input {
        --cds-ui-04: #{$border-color-tertiary};
        --cds-field-01: #{$background-color-lighter};
      }
    }
  }

  &__input-form {
    display: flex;
    align-items: center;
  }

  &__copy {
    position: absolute;
    top: 1.35rem;
    right: 0.15rem;
    height: 2.75rem;
    width: 2.75rem;
    background-color: $background-color-lighter;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background-color: $background-color-light;
      cursor: pointer;
    }
  }

  &__input-status {
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
