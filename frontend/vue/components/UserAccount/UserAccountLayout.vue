<template>
  <div class="user-account">
    <nav class="user-account__section-nav">
      <div class="user-account__section-nav__user-data">
        <span class="user-account__section-nav__user-data__name">{{ userName }}</span>
        <span class="user-account__section-nav__user-data__role">{{ userRole }}</span>
      </div>
      <div class="user-account__section-nav__link-list">
        <AppLink
          v-for="{displayName, hash} in sectionList"
          :key="hash"
          class="user-account__section-nav__link-list__link"
          :class="{'user-account__section-nav__link-list__link_active': activeSection === hash}"
          :url="hash"
        >
          {{ displayName }}
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
      <div v-if="activeSection === sectionList[0].hash">
        PROGRESS SECTION
      </div>
      <div v-if="activeSection === sectionList[1].hash">
        GROUPS SECTION
      </div>
      <div v-if="activeSection === sectionList[2].hash">
        BADGES SECTION
      </div>
      <div v-if="activeSection === sectionList[3].hash">
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
      activeSection: '',
      sectionList: [
        {
          displayName: 'My Learning',
          hash: '#MyLearning'
        },
        {
          displayName: 'Groups',
          hash: '#Groups'
        },
        {
          displayName: 'Badges',
          hash: '#Badges'
        },
        {
          displayName: 'Privacy',
          hash: '#Privacy'
        }
      ]
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
@import '~/../scss/variables/mq.scss';

.user-account {
  display: grid;
  grid-template-columns: 17rem 1fr;
  height: calc(100vh - 60px);
  grid-template-areas: "navigation section";

  @include mq($from: medium, $until: large) {
    grid-template-columns: 12rem 1fr;
  }
  @include mq($until: medium) {
    grid-template-areas: "section";
    grid-template-columns: 1fr;
  }

  &__section-nav {
    grid-area: "navigation";
    display: flex;
    @include mq($until: medium) {
      display: none;
    }
    flex-direction: column;
    padding: $spacing-07;

    background-color: $background-color-light;

    &__user-data {
      display: flex;
      flex-direction: column;
      margin-bottom: $spacing-07;

      &__name {
        word-break: break-word;
        max-height: 75px;
        overflow: hidden;
        @include type-style('expressive-heading-04');
      }
      &__role {
        word-break: break-word;
        max-height: 55px;
        overflow: hidden;
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
    grid-area: "section";
    overflow: auto;
  }
}
</style>
