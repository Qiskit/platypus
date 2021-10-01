<template>
  <section class="sign-in">
    <div class="sign-in__content">
      <div class="sign-in__content-section sign-in__content-section__hero">
        <div id="page-title" class="sign-in__content-section__hero-title">
          {{ heroTitle }}
        </div>
        <p>{{ heroDescription }}</p>
      </div>
      <div class="sign-in__content-section sign-in__content-section__footer">
        <video class="sign-in__content-section__media" autoplay loop>
          <source :src="footerImgPath" type="video/mp4">
        </video>
        <div>
          <p><strong>Join a community of learners</strong></p>
          <p>{{ footerDescription }}</p>
        </div>
      </div>
    </div>
    <div class="sign-in__form">
      <h2 class="sign-in__form__title">
        {{ formTitle }}
      </h2>
      <AppCta
        class="sign-in__cta"
        label="Sign in with IBM Id"
      />
      <div class="sign-in__icons">
        <LogoGoogle32 class="sign-in__icons__item" />
        <LogoLinkedIn32 class="sign-in__icons__item" />
        <LogoTwitter32 class="sign-in__icons__item" />
        <LogoGitHub32 class="sign-in__icons__item" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import LogoLinkedIn32 from '@carbon/icons-vue/lib/logo--linkedin/32'
import LogoGoogle32 from '@carbon/icons-vue/lib/logo--google/32'
import LogoTwitter32 from '@carbon/icons-vue/lib/logo--twitter/32'
import LogoGitHub32 from '@carbon/icons-vue/lib/logo--github/32'
import AppCta from '../common/AppCta.vue'

@Options({
  components: {
    AppCta, LogoLinkedIn32, LogoGoogle32, LogoTwitter32, LogoGitHub32
  }
})

export default class SignIn extends Vue {
  heroTitle = 'Learn quantum computing with Qiskit.'
  heroDescription = 'Qiskit is the worlds most popular open source quantum computing toolkit. Get started with a personalized learning experience that tracks your progress.'
  footerDescription = 'Build your knowledge, take quizes and build your own quantum circuits.'
  footerImgPath = '/images/textbook_demo.mp4'
  formTitle = 'Sign Into Qiskit'
}
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/mq.scss';
@import '~/../scss/mixins/mixins.scss';
@import '~/../scss/variables/colors.scss';

.sign-in {
  position: fixed;
  background-color: $cool-gray-10;
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
  }

  &__content {
    @include mq($from: medium) {
      flex-grow: 1;
    }
    &-section {
      padding: $spacing-11;

      @include mq($until: large) {
        padding: $spacing-11 $spacing-07;
      }

      @include mq($from: medium) {
        min-height: 50%;
      }

      &__hero {
        flex-direction: column;

        &-title {
          margin-bottom: $spacing-05;
          max-width: 520px;
        }
      }

      &__footer {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        @include mq($until: max-size) {
          flex-direction: column;
          align-items: flex-start;
        }

        @include mq($until: medium) {
          display: none;
        }
      }

      &__media {
        border: 1px solid $cool-gray-20;
        @include mq($from: medium) {
          max-width: 20rem;
          margin-bottom: $spacing-05;
        }
        @include mq($from: large) {
          margin-right: $spacing-10;
        }
      }

      &:not(:last-child) {
        background-color: $white-0;
      }
    }
  }

  &__cta {
    margin-bottom: $spacing-05;
  }

  &__form {
    padding: $spacing-11;
    background-color: $cool-gray-20;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    }
  }

  &__icons {
    display: flex;

    &__item {
      margin-right: $spacing-04;
    }
  }
}
</style>
