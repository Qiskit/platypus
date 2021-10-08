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
          target="_self"
        >
          {{ displayName }}
        </AppLink>
        <AppLink
          class="user-account__section-nav__link-list__link"
          url="#"
          target="_self"
        >
          {{ $translate('Log Out') }}
        </AppLink>
      </div>
    </nav>
    <bx-dropdown
      class="user-account__section-dropdown"
      :value="activeSection"
      @bx-dropdown-selected="switchPanel($event)"
    >
      <bx-dropdown-item
        v-for="{displayName, hash} in sectionList"
        :key="hash"
        class="user-account__section-dropdown__item"
        :value="hash"
      >
        {{ displayName }}
      </bx-dropdown-item>
    </bx-dropdown>
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
          displayName: this.$translate('My Learning'),
          hash: '#MyLearning'
        },
        {
          displayName: this.$translate('Groups'),
          hash: '#Groups'
        },
        {
          displayName: this.$translate('Badges'),
          hash: '#Badges'
        },
        {
          displayName: this.$translate('Privacy'),
          hash: '#Privacy'
        }
      ]
    }
  },
  mounted () {
    this.activeSection = window.location.hash || this.sectionList[0].hash
    window?.addEventListener('hashchange', () => {
      this.activeSection = window.location.hash
    }, false)
  },
  methods: {
    switchPanel (event: CustomEvent) {
      window.location.hash = event.detail.item.value
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/colors.scss';
@import '~/../scss/variables/mq.scss';

.user-account {
  display: grid;
  grid-template-columns: 17rem 1fr;
  height: calc(100vh - 60px);

  @include mq($from: medium, $until: large) {
    grid-template-columns: 12rem 1fr;
  }

  @include mq($until: medium) {
    grid-template-columns: 1fr;
    grid-template-rows: min-content 1fr;
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
        @include type-style('expressive-heading-04');
        word-break: break-word;
        max-height: 9.25rem;
        overflow: hidden;
      }

      &__role {
        @include type-style('expressive-heading-01');
        word-break: break-word;
        max-height: 3.5rem;
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
  &__section-container {
    overflow: auto;
  }
}

</style>
