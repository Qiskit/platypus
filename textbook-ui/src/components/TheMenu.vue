<template>
  <div class="menu">
    <section class="menu__main-level">
      <nav class="menu__navigation-level">
        <AppLink
          class="
            menu__link
            menu__home-link
          "
          v-bind="homeLink"
        >
          <AppLogo
            class="menu__logo"
          />
        </AppLink>
        <AppLink
          v-for="link in mainLevelLinks"
          :key="link.url"
          class="menu__link"
          v-bind="link"
        >
          {{ link.label }}
        </AppLink>
      </nav>
    </section>
  </div>
</template>

<script lang="ts">
import { Options, mixins } from 'vue-class-component'
import MenuMixin from '../mixins/menu'
import AppLogo from './AppLogo.vue'
import AppLink from './AppLink.vue'

@Options({
  components: { AppLink, AppLogo }
})
export default class extends mixins(MenuMixin) {

}
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import 'src/scss/mq.scss';
@import 'src/scss/mixins.scss';

.menu {
  background-color: white;

  &__main-level {
    --link-color: #{$gray-80};
  }

  &__second-level {
    --link-color: #{$inverse-01};
    background-color: $purple-40;
  }
  &__navigation-level {
    @include contained();
    padding-top: $spacing-05;
    padding-bottom: $spacing-05;
    display: flex;
    justify-content: flex-end;
  }

  &__navigation-level {
    @include mq($until: large) {
      display: none;
    }
  }

  &__logo {
    height: 1.5rem;
    width: auto;
    color: $cool-gray-60;

    &_active {
      color: $purple-70;
    }
  }

  &__link {
    @include type-style('body-long-02');
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    color: var(--link-color);
    text-decoration: none;
    margin-right: $spacing-09;

    &:hover {
      text-decoration: underline;
    }

    &:last-child {
      margin-right: 0;
    }

    &_active {
      color: $purple-70;
    }
  }

  &__home-link {
    margin-left: 0;
    margin-right: auto;

    &:hover {
      text-decoration: none;
    }
  }

  &__hamburger-toggle {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
