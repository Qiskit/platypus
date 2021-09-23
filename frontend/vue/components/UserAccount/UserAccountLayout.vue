<template>
  <div class="user-account">
    <nav class="user-account__section-nav">
      <div class="user-account__section-nav__user-data">
        <span class="user-account__section-nav__user-data__name">{{ userName }}</span>
        <span class="user-account__section-nav__user-data__role">{{ userRole }}</span>
      </div>
      <div class="user-account__section-nav__link-list">
        <AppLink
          class="user-account__section-nav__link-list__link"
          :class="{'user-account__section-nav__link-list__link_active': activeSection === '#MyLearning'}"
          url="#MyLearning"
        >
          My Learning
        </AppLink>
        <AppLink
          class="user-account__section-nav__link-list__link"
          :class="{'user-account__section-nav__link-list__link_active': activeSection === '#Groups'}"
          url="#Groups"
        >
          Groups
        </AppLink>
        <AppLink
          class="user-account__section-nav__link-list__link"
          :class="{'user-account__section-nav__link-list__link_active': activeSection === '#Badges'}"
          url="#Badges"
        >
          Badges
        </AppLink>
        <AppLink
          class="user-account__section-nav__link-list__link"
          :class="{'user-account__section-nav__link-list__link_active': activeSection === '#Privacy'}"
          url="#Privacy"
        >
          Privacy
        </AppLink>
        <AppLink
          class="user-account__section-nav__link-list__link"
          url="/LogOut"
        >
          Log Out
        </AppLink>
      </div>
    </nav>
    <section class="user-account__section-container">
      <div v-if="activeSection === '#MyLearning'">
        PROGRESS SECTION
      </div>
      <div v-if="activeSection === '#Groups'">
        GROUPS SECTION
      </div>
      <div v-if="activeSection === '#Badges'">
        BADGES SECTION
      </div>
      <div v-if="activeSection === '#Privacy'">
        PRIVACY SECTION
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import AppLink from '../common/AppLink.vue'

export default defineComponent({
  name: 'UserAccountLayout',
  components: {
    AppLink
  },
  props: {
    userName: { type: String, required: false, default: 'Unknown' },
    userRole: { type: String, required: false, default: 'Unknown' }
  },
  data () {
    return {
      activeSection: ''
    }
  },
  mounted () {
    this.activeSection = window.location.hash || '#MyLearning'
    window.addEventListener('hashchange', () => {
      this.activeSection = window.location.hash
    }, false)
  }
})
</script>

<style lang="scss" scoped>
@import '../../../../node_modules/carbon-components/scss/globals/scss/layout';
@import '../../../../node_modules/carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/colors.scss';
@import '~/../scss/variables/fonts.scss';

.user-account {
  display: flex;
  flex-direction: row;
  height: calc(100vh - 60px);

  &__section-nav {
    display: flex;
    flex-direction: column;
    width: 18rem;
    padding: $spacing-07;

    background-color: $background-color-light;

    &__user-data {
      display: flex;
      flex-direction: column;
      margin-bottom: $spacing-07;

      &__name {
        @include type-style('expressive-heading-04');
      }
      &__role {
        @include type-style('expressive-heading-01');
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
  &__section-container {

  }
}
</style>
