<template>
  <section class="sign-in">
    <div class="sign-in__content">
      <div class="sign-in__content__hero">
        <div id="page-title" class="sign-in__content__hero-title">
          {{ $translate('Learn quantum computing with Qiskit.') }}
        </div>
        <p class="sign-in__content__hero-description">
          {{ $translate('Qiskit is the worlds most popular open source quantum computing toolkit. Get started with a personalized learning experience that tracks your progress.') }}
        </p>
      </div>
      <video class="sign-in__content__media" autoplay loop muted>
        <source :src="signinMediaPath" type="video/mp4">
      </video>
    </div>
    <div class="sign-in__form">
      <div class="sign-in__form__content">
        <h2 class="sign-in__form__title">
          {{ $translate('Sign Into Qiskit') }}
        </h2>
        <AppCta
          class="sign-in__cta"
          :label="$translate('IBM id')"
          :url="authenticationUrl"
          target="_self"
        />
        <AppCta
          :url="gmailAuthenticationLink.url"
          :label="$translate('Sign in with Gmail')"
          :segment="gmailAuthenticationLink.segment"
          kind="ghost"
          target="_self"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import AppCta from '../common/AppCta.vue'
import BasicLink from '../common/BasicLink.vue'

@Options({
  components: {
    AppCta, BasicLink
  }
})

export default class SignIn extends Vue {
  authenticationUrl = '/auth/ibm'
  signinMediaPath = '/images/textbook_showcase.mp4'
  gmailAuthenticationLink = {
    url: '/auth/google',
    segment: {
      cta: 'auth-google',
      location: 'sign-in'
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/mq.scss';
@import '~/../scss/mixins/mixins.scss';
@import '~/../scss/variables/colors.scss';

.sign-in {
  position: fixed;
  top: 3.5rem;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  max-height: calc(100vh - 3.5rem);
  overflow: hidden;
  display: flex;

  @include mq($until: medium) {
    flex-direction: column;
    position: initial;
    max-height: initial;
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: auto;
    @include mq($from: medium) {
      width: 100%;
    }

    &__hero {
      padding: $spacing-11;
      flex-direction: column;
      background-color: $white-0;

      @include mq($until: large) {
        padding: $spacing-11 $spacing-07;
      }

      &-title {
        margin-bottom: $spacing-05;
        max-width: 32rem;
      }

      &-description {
        max-width: 40rem;
      }
    }

    &__media {
      border-top: 1px solid $cool-gray-20;
      height: 100%;

      @include mq($until: medium) {
        display: none;
      }
    }
  }

  &__cta {
    margin-bottom: $spacing-03;
  }

  &__form {
    padding: $spacing-11;
    background-color: $cool-gray-20;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 40rem;
    flex-grow: 1;

    @include mq($until: large) {
      padding: $spacing-11 $spacing-07;
      min-width: 28rem;
    }

    @include mq($until: medium) {
      min-width: initial;
    }

    @include mq($from: large) {
      min-width: 40rem;
    }

    &__title {
      @include type-style('expressive-heading-05');
      margin-top: initial;
      margin-bottom: $spacing-05;
      display: inline-block;
    }

    &__content {
      margin: 0 auto;
      @include mq($until: medium) {
        margin: initial;
      }
    }
  }
}
</style>
