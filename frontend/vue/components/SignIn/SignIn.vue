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
        <img class="sign-in__content-section__img" :src="footerImgPath" :alt="footerImgAlt">

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
  footerImgPath = '/images/textbook-screenshot.png'
  footerImgAlt = 'Sign in to learn quantum computing with Qiskit'
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

  &__content {
    flex-grow: 1;
    &-section {
      min-height: 50%;
      padding: $spacing-11;

      &__hero {
        flex-direction: column;

        &-title {
          margin-bottom: $spacing-05;
          max-width: 520px;
        }
      }

      &__footer {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      &__img {
        margin-right: $spacing-10;
        max-width: 16rem;
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
    min-width: 752px;

    &__title {
      @include type-style('expressive-heading-05');
      margin-top: initial;
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
