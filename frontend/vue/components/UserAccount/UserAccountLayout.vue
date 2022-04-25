<template>
  <div class="user-account">
    <AccountMenu
      :first-name="firstName"
      :last-name="lastName"
      :current-section="activeSection"
      :section-list="sectionList"
      :user-logged-in="userIsLoggedIn"
    />
    <section class="user-account__section-container">
      <div v-if="activeSection === sectionList[0].url">
        <UserProgress />
      </div>
      <div v-else-if="activeSection === sectionList[1].url">
        <ClassroomSection />
      </div>
      <div v-if="activeSection === sectionList[2].url">
        <PrivacySection />
        <DeleteUserDataSection />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import PrivacySection from './PrivacySection.vue'
import UserProgress from './UserProgress.vue'
import DeleteUserDataSection from './DeleteUserDataSection.vue'
import ClassroomSection from './ClassroomSection.vue'
import AccountMenu from './AccountMenu.vue'

export default defineComponent({
  name: 'UserAccountLayout',
  components: {
    PrivacySection,
    UserProgress,
    DeleteUserDataSection,
    ClassroomSection,
    AccountMenu
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
      ]
    }
  },
  computed: {
    userIsLoggedIn () {
      if (this.firstName !== '' && this.lastName !== '') {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    this.activeSection = window.location.pathname || this.sectionList[0].url
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

  &__section-container {
    overflow: auto;
  }
}
</style>
