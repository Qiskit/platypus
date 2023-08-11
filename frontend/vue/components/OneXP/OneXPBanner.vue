<template>
  <div class="one-xp-banner">
    <div class="one-xp-banner__container">
      <span
        class="one-xp-banner__copy"
        v-text="
          `🎉  Qiskit is getting a new learning experience on IBM Quantum!`
        "
      />
      <a
        class="one-xp-banner__cta"
        href="https://example.com"
        rel="noopener noreferrer"
        target="_blank"
        @click="onClick"
      >
        <span class="one-xp-banner__cta__label" v-text="`Check it out!`" />
        <LaunchIcon class="one-xp-banner__cta__icon" />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import LaunchIcon from '@carbon/icons-vue/lib/launch/16'

@Options({
  components: { LaunchIcon }
})
export default class OneXPBanner extends Vue {
  onClick () {
    this.$trackClickEvent('go-to-1xp-learning', '1xp-banner')
  }
}
</script>

<style lang="scss" scoped>
@import "carbon-components/scss/globals/scss/typography";
@import "carbon-components/scss/globals/scss/layout";
@import "../../../scss/variables/colors.scss";
@import "~/../scss/variables/mq.scss";

.one-xp-banner {
  @include type-style("body-long-01");

  background-image: linear-gradient(to right, $purple-10, #fff);
  border-bottom: 1px solid $border-color;
  padding: $spacing-05 $spacing-06;

  &__container {
    display: inline-flex;
    flex-direction: column;
    gap: $spacing-03;

    @include mq($from: large) {
      flex-direction: row;
    }
  }

  &__copy {
    font-weight: bold;
  }

  &__cta {
    align-items: center;
    display: inline-flex;
    gap: $spacing-03;

    &__label {
      color: $purple-70;
    }

    &__icon {
      fill: $purple-70;
    }
  }
}
</style>
