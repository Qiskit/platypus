<template>
  <section class="mobile-menu">
    <nav
      class="mobile-menu__navigation-links"
    >
      <template v-for="link in mainLevelLinks">
        <AppLink
          v-if="!link.sublinks"
          :key="link.url"
          class="mobile-menu__entry"
          :class="{
            'mobile-menu__entry_active': isActive(link),
            'mobile-menu__entry_is-parent': isParent(link)
          }"
          v-bind="appLinkFromNavLink(link)"
          kind="secondary"
        >
          <p class="mobile-menu__entry-label">
            {{ $translate(link.label) }}
          </p>
        </AppLink>
        <bx-dropdown
          v-else
          value="selectedMenuItem"
          v-model="selectedMenuItem"
          :key="link.url"
          ref="communityDropdown"
          class="mobile-menu__entry mobile-menu__entry_dropdown"
          :class="{ 'mobile-menu__entry_active': isCommunityActive() }"
          :trigger-content="selectedMenuItem"
          @bx-dropdown-selected="switchPanel($event)"
        >
          <bx-dropdown-item v-for="sublink in getSubLinks(link)" :key="`sublink:${sublink.url}`" :value="sublink.label">
            <AppLink
              class=" mobile-menu__entry mobile-menu__entry_second-level"
              :class="{ 'mobile-menu__entry_active': isActive(sublink) }"
              v-bind="appLinkFromNavLink(sublink)"
              kind="secondary"
              target="_self"
            >
              <p class="mobile-menu__entry-label">
                {{ $translate(sublink.label) }}
              </p>
            </AppLink>
          </bx-dropdown-item>
        </bx-dropdown>
      </template>
    </nav>
    <footer class="mobile-menu__footer">
      <div class="mobile-menu__footer-inner-container">
        <FooterSection class="mobile-menu__footer-contact" v-bind="stayConnectedElements" icons-only :theme="theme" />
      </div>
      <p class="mobile-menu__footer-text">
        &copy;Qiskit | All Rights Reserved
      </p>
    </footer>
  </section>
</template>

<script lang="ts">
// import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
import { Options, prop, mixins } from 'vue-class-component'
import { STAY_CONNECTED_LINKS } from '../../../constants/menuLinks'
import AppLink from '../common/AppLink.vue'
import MenuMixin from '../../mixins/menu'
// using Carbon web-component from https://github.com/carbon-design-system/carbon-web-components#basic-usage
import 'carbon-web-components/es/components/dropdown/dropdown.js'

class Props {
  isVisible = prop<boolean>({ default: false })
}

@Options({
  components: {
    AppLink
  },
  watch: {
    openDropdown (isVisible) {
      const openDropdown: boolean = this.isCommunityActive()
      const communityMenu: any = this.$refs.communityDropdown
      communityMenu[0].open = openDropdown
    }
  }
})

export default class MobileMenu extends mixins(MenuMixin) {
  stayConnectedElements = STAY_CONNECTED_LINKS
  theme = 'light'
  selectedMenuItem = 'Community'

  created () {
    this.selectedMenuItem = this.$translate('Community')
  }

  switchPanel(event: any) {
    const selectionTitle = event.detail.item.value
    this.selectedMenuItem = selectionTitle
  }
}
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/colors.scss';
@import '~/../scss/variables/mq.scss';
@import '~/../scss/mixins/mixins.scss';

.mobile-menu {
  display: flex;
  flex-direction: column;
  background-color: var(--background-color);
  overflow-y: auto;
  justify-content: space-between;

  &__entry-label,
  &__footer-inner-container {
    @include contained();
    width: 100%;
  }

  &__entry-label {
    margin-bottom: 0;
  }

  &__footer-inner-container {
    margin-bottom: $spacing-05;
    padding-left: $spacing-05;
  }

  &__navigation-links {
    display: flex;
    flex-direction: column;
    margin-bottom: $spacing-07;
  }

  &__entry {
    @include type-style('expressive-paragraph-01');
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-decoration: none;
    color: var(--navbar--link-color);
    height: 4rem;
    border-bottom: 1px solid $border-color-light;

    &_active:not(&_is-parent),
    &_active .bx--list-box__label {
      color: $text-active-color;
    }

    &_second-level {
      @include type-style('body-long-02');
      border: 0;
      display: flex;
      padding: 0;
      margin: 0;
      height: 100%;
      align-content: center;
      justify-content: center;
    }

    &_dropdown[open] {
      position: relative;
      height: 12rem;
      justify-content: flex-start;
    }
  }

  &__footer {
    @include mq ($from: medium) {
      display: none;
    }

    padding-top: $spacing-05;
    padding-bottom: $spacing-05 + 2.5rem; // make room for the "cookies preferences" button
    background-color: $background-color-white;
  }

  &__footer-text {
    @include type-style('caption-01');
    background-color: $background-color-lighter;
    padding: $spacing-05 $spacing-07;
  }

  // component overrides
  // selecting within the shadow
  bx-dropdown::part(trigger-button) {
    --cds-body-short-01-font-size: 1rem;

    background-color: var(--background-color);
    padding-left: 2rem;

    &:focus {
      outline: none;
    }
  }

  bx-dropdown[open]::part(trigger-button) {
    height: 4rem;
    background-color: var(--bx-dropdown--items--background-color);
    border-bottom: 1px solid $border-color;
  }

  bx-dropdown::part(menu-body) {
    top: calc(100% + 24px);
    background-color: var(--bx-dropdown--items--background-color);
    box-shadow: initial;
  }
}

.mobile-menu {
  bx-dropdown-item {
    display: flex;
    height: 4rem;
    background-color: var(--bx-dropdown--items--background-color);

    &:not(:last-child) .menu__entry-label {
      border-bottom: none;
      padding: 0;
    }
  }

  & .bx--form-item {
    margin-right: 0;
    border-bottom: none;
    height: auto;
  }

  .bx--list-box__label {
    @include type-style('body-long-02');
    color: $text-color-light;
  }

  .bx--list-box {
    background-color: $background-color-white;
    height: 4rem;
    max-height: initial;
    border-bottom: 1px solid $border-color-light;
  }

  .bx--list-box__field {
    padding: 0 $spacing-09 0 $spacing-07;
    height: 4rem;

    &:hover .bx--list-box__label {
      text-decoration: underline;
    }

    &:focus,
    &:active,
    &[aria-expanded="true"] {
      outline: none;
      outline-offset: initial;
      border-bottom: 1px solid $border-color;
    }

    svg {
      fill: $text-color-light;
    }

    @include mq($until: medium) {
      padding: 0 $spacing-09 0 $spacing-05;
    }
  }

  .bx--list-box__menu {
    &:focus {
      outline: initial;
    }
  }

  .bx--list-box--expanded {
    min-height: 4rem;
    height: 100%;
    background-color: $background-color-lighter;

    .bx--list-box__menu {
      position: relative;
      max-height: unset;
      background-color: $background-color-lighter;
      box-shadow: initial;
      z-index: initial;
      top: 0;
     }

    & .bx--list-box__menu bx-dropdown-item:not(:last-child) {
      border-bottom: 1px solid $border-color;
    }
  }

  &__entry {
    &_active {
      & .bx--list-box__label,
      & .bx--dropdown {
        color: $text-active-color;
      }

      &.bx--form-item {
        height: auto;
      }
    }
  }

  &__footer-contact {
    & .footer-section__title.footer-section__title_theme_light {
      @include type-style('caption-01');
      font-weight: 600;
      padding-bottom: $spacing-05;
    }

  }
}
</style>
