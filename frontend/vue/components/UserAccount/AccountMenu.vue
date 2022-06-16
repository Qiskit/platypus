<template>
  <div class="account-menu">
    <nav class="account-menu__nav">
      <div v-if="loggedIn" class="account-menu__nav__header">
        <h2 class="account-menu__nav__header__name">
          {{ userDisplayName }}
        </h2>
      </div>
      <div v-else class="account-menu__nav__header">
        <h2 class="account-menu__nav__header__name">
          {{ $translate('User Account') }}
        </h2>
        <p>
          <BasicLink
            class="account-menu__login-link"
            :url="loginOrRegisterLink"
            :is-static="true"
            target="_self"
          >
            {{ $translate('Log in') }}
          </BasicLink> or
          <BasicLink
            class="account-menu__login-link"
            :url="loginOrRegisterLink"
            :is-static="true"
            target="_self"
          >
            {{ $translate('create an account') }}
          </BasicLink>.
        </p>
      </div>
      <div v-if="loggedIn" class="account-menu__nav__link-list">
        <BasicLink
          v-for="{displayName, url} in sectionList"
          :key="url"
          class="account-menu__nav__link-list__link"
          :class="{'account-menu__nav__link-list__link_active': activeMenuItem === url}"
          :url="url"
          target="_self"
        >
          {{ displayName }}
        </BasicLink>
        <BasicLink
          class="account-menu__nav__link-list__link"
          :url="logoutUrl"
          :is-static="true"
          target="_self"
        >
          {{ $translate('Log Out') }}
        </BasicLink>
      </div>
    </nav>
    <bx-dropdown
      v-if="loggedIn"
      class="account-menu__section-dropdown"
      :value="activeMenuItem"
      @bx-dropdown-selected="switchPanel($event)"
    >
      <bx-dropdown-item
        v-for="{displayName, url} in sectionList"
        :key="url"
        class="account-menu__section-dropdown__item"
        :value="url"
      >
        {{ displayName }}
      </bx-dropdown-item>
      <bx-dropdown-item
        :key="logoutUrl"
        class="account-menu__section-dropdown__item"
        :value="logoutUrl"
      >
        {{ $translate('Log Out') }}
      </bx-dropdown-item>
    </bx-dropdown>
    <div v-else class="account-menu__mobile-header">
      <h2 class="account-menu__mobile-header__title">
        {{ $translate('User Account') }}
      </h2>
      <p>
        <BasicLink
          class="account-menu__login-link"
          :url="loginOrRegisterLink"
          :is-static="true"
          target="_self"
        >
          {{ $translate('Log in') }}
        </BasicLink> or
        <BasicLink
          class="account-menu__login-link"
          :url="loginOrRegisterLink"
          :is-static="true"
          target="_self"
        >
          {{ $translate('create an account') }}
        </BasicLink>.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import BasicLink from '../common/BasicLink.vue'

export default defineComponent({
  name: 'AccountMenu',
  components: {
    BasicLink
  },
  props: {
    firstName: { type: String, required: false, default: '' },
    lastName: { type: String, required: false, default: '' },
    activeMenuItem: { type: String, required: false, default: '' },
    sectionList: { type: Array, required: false, default: () => [] }
  },
  data () {
    return {
      loggedIn: false,
      logoutUrl: '/logout'
    }
  },
  computed: {
    userDisplayName () {
      let userDisplayName: string
      if (this.firstName === '' && this.lastName === '') {
        userDisplayName = this.$translate('Your Profile')
      } else {
        userDisplayName = `${this.firstName} ${this.lastName}`
      }

      return userDisplayName
    },
    loginOrRegisterLink () {
      const currentSyllabusPath = window.location.pathname
      return '/signin?returnTo=' + currentSyllabusPath
    }
  },
  mounted () {
    if (this.firstName !== '' || this.lastName !== '') {
      this.loggedIn = true
    }
  },
  methods: {
    switchPanel (event: CustomEvent) {
      window.location.pathname = event.detail.item.value
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/colors.scss';
@import '~/../scss/variables/mq.scss';

.account-menu {
  display: grid;
  grid-template-columns: 17rem 1fr;

  @include mq($from: medium, $until: large) {
    grid-template-columns: 12rem 1fr;
  }

  @include mq($until: medium) {
    grid-template-columns: 1fr;
    grid-template-rows: min-content 1fr;
    height: initial;
  }

  &__section-dropdown {
    --cds-field-01: #{$background-color-white};
    --cds-hover-ui: #{$background-color-lighter};
    --cds-ui-04: #{$border-color-tertiary};
    --cds-ui-01: #{$background-color-white};

    @include mq($from: medium) {
      display: none;
    }

    &__item {
      --cds-hover-selected-ui: #{$background-color-lighter};
      --cds-selected-ui: #{$background-color-white};
    }
  }

  &__nav {
    background-color: $background-color-lighter;
    display: flex;
    flex-direction: column;
    padding: $spacing-07;
    @include mq($until: medium) {
      display: none;
    }

    &__header {
      display: flex;
      flex-direction: column;

      &__name {
        @include type-style('expressive-heading-04', $fluid: true);
        margin-bottom: $spacing-07;
        word-break: break-word;
        max-height: 9.25rem;
        overflow: hidden;
      }
    }

    &__link-list {
      display: flex;
      flex-direction: column;
      gap: $spacing-06;

      &__link {
        color: $text-color-dark;

        &#{&}_active {
          color: $text-active-color;
        }
      }
    }

    &__login-link {
      color: $text-active-color;
    }
  }

  &__mobile-header {
    padding: $spacing-03 $spacing-08;
    background-color: $background-color-lighter;
    &__title {
      @include type-style('expressive-heading-04', $fluid: true);
    }

    @include mq($from: medium) {
      display: none;
    }
  }
}
</style>
