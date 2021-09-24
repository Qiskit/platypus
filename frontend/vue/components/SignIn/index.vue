<template>
  <section class="sign-in">
    <div class="sign-in__content">
      <div class="sign-in__content__section">
        <div id="page-title">Learn quantum computing with Qiskit.</div>
        <p>Qiskit is the worlds most popular open source quantum computing toolkit. Get started with a personalized learning experience that tracks your progress.</p>
      </div>
      <div class="sign-in__content__section">
        <img src="https://via.placeholder.com/400x200">
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam ipsam, harum eius sit voluptatibus labore enim maiores natus est veniam error impedit soluta exercitationem ab dicta eligendi, aut iusto. Vero?</p>
      </div>
    </div>
    <div class="sign-in__form">
      <h3>Form</h3>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})

export default class SignIn extends Vue {}
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/mq.scss';
@import '~/../scss/mixins/mixins.scss';
@import '~/../scss/variables/colors.scss';

.sign-in {
  position: fixed;
  background-color: $cool-gray-10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  max-height: 100vh;
  overflow: hidden;
  display: flex;

  &__content {
    &__section {
      min-height: 50%;
      padding: 0 80px;
      display: flex;
      justify-content: center;

      &:last-child {
        background-color: $white-0;
      }
    }
  }

  &__form {
    min-width: 560px;
    background-color: $cool-gray-20;
  }
}
</style>
