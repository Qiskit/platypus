<template>
  <div class="user-account-menu">
    <nav class="user-account-menu__section-nav">
      <div class="user-account-menu__section-nav__user-data">
        <h2 class="user-account-menu__section-nav__user-data__name">
          {{ userDisplayName }}
        </h2>
      </div>
      <div class="user-account-menu__section-nav__link-list">
        <BasicLink
          v-for="{displayName, url} in sectionList"
          :key="url"
          class="user-account-menu__section-nav__link-list__link"
          :class="{'user-account-menu__section-nav__link-list__link_active': activeSection === url}"
          :url="url"
          target="_self"
        >
          {{ displayName }}
        </BasicLink>
        <BasicLink
          class="user-account-menu__section-nav__link-list__link"
          :url="logoutUrl"
          :is-static="true"
          target="_self"
        >
          {{ $translate('Log Out') }}
        </BasicLink>
      </div>
    </nav>
    <bx-dropdown
      class="user-account-menu__section-dropdown"
      :value="activeSection"
      @bx-dropdown-selected="switchPanel($event)"
    >
      <bx-dropdown-item
        v-for="{displayName, url} in sectionList"
        :key="url"
        class="user-account-menu__section-dropdown__item"
        :value="url"
      >
        {{ displayName }}
      </bx-dropdown-item>
      <bx-dropdown-item
        :key="logoutUrl"
        class="user-account-menu__section-dropdown__item"
        :value="logoutUrl"
      >
        {{ $translate('Log Out') }}
      </bx-dropdown-item>
    </bx-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import BasicLink from '../common/BasicLink.vue'

export default defineComponent({
  name: 'UserAccountMenu',
  components: {
    BasicLink
  },
  props: {
    firstName: { type: String, required: false, default: '' },
    lastName: { type: String, required: false, default: '' }
  },
  data () {
    return {
      activeSection: '',
      sectionList: [
        {
          displayName: this.$translate('Learning'),
          url: '/account'
        },
        {
          displayName: this.$translate('Classroom'),
          url: '/account/classroom'
        },
        {
          displayName: this.$translate('Privacy'),
          url: '/account/privacy'
        }
      ],
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
    }
  },
  mounted () {
    this.activeSection = window.location.pathname || this.sectionList[0].url
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

.user-account-menu {
  display: grid;
  grid-template-columns: 17rem 1fr;
  height: calc(100vh - 60px);

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

  &__section-nav {
    background-color: $background-color-lighter;
    display: flex;
    flex-direction: column;
    padding: $spacing-07;
    @include mq($until: medium) {
      display: none;
    }

    &__user-data {
      display: flex;
      flex-direction: column;
      margin-bottom: $spacing-07;

      &__name {
        @include type-style('expressive-heading-04', $fluid: true);
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
  }
}
</style>
