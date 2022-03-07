<template>
  <BasicLink
    ref="link"
    class="app-cta"
    :class="[
      `app-cta_${kind}`,
      `app-cta_${kind}_theme_${theme}`
    ]"
    v-bind="$attrs"
  >
    <span class="app-cta__content">
      {{ label }}
    </span>
    <component
      :is="iconPerLinkType"
      class="app-cta__icon"
      :class="`app-cta__icon_${iconPerLinkType}`"
    />
  </BasicLink>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'
import ArrowRight16 from '@carbon/icons-vue/lib/arrow--right/16'
import ArrowDown16 from '@carbon/icons-vue/lib/arrow--down/16'
import Delete16 from '@carbon/icons-vue/lib/delete/16'
import Launch16 from '@carbon/icons-vue/lib/launch/16'
import BasicLink from './BasicLink.vue'
import { isExternal, isIdAnchor } from '../../../ts/utilities'

class Props {
  kind = prop({ type: String, default: 'primary' })
  theme = prop({ type: String, default: 'light' })
  label = prop({ type: String, default: '' })
  icon = prop({ type: String, default: '' })
}

@Options({
  components: {
    BasicLink,
    ArrowRight16,
    ArrowDown16,
    Launch16,
    Delete16
  }
})

export default class AppCta extends Vue.with(Props) {
  get iconPerLinkType (): string {
    // @ts-ignore
    const url:string = this.$attrs.url

    if (isExternal(url)) {
      return 'launch-16'
    } else if (isIdAnchor(url)) {
      return 'arrow-down-16'
    } else if (this.icon !== '') {
      return this.icon
    } else  {
      return 'arrow-right-16'
    }
  }

  get isIdAnchor () {
    // @ts-ignore
    return BasicLink.isIdAnchor(this.$attrs.url)
  }
}
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/colors.scss';
@import '~/../scss/variables/settings.scss';
@import '~/../scss/variables/mq.scss';

@mixin bicolor-background($colorLeft, $colorRight) {
  background-image: linear-gradient(90deg, $colorLeft 0%, $colorLeft 50%, $colorRight 50%, $colorRight 100%);
}

.app-cta {
  @include type-style('body-long-01');
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  align-items: center;

  padding: $spacing-05;
  width: 4 * $column-size-large;
  max-width: 100%;

  @include mq($from: medium, $until: large) {
    width: 3 * $column-size-medium;
  }
  @include mq($until: medium) {
    width: 100%;
  }

  background-size: 200% 100%;
  background-position-x: 100%;
  transition: background-position-x 0.3s ease-out, color 0.3s ease-out;

  &:hover,
  &:focus,
  &:active {
    background-position-x: 0;
  }

  /*
    Per kind and theming styles
  */
  &,
  &_primary {
    @include bicolor-background($button-background-color-dark, $button-background-color);
    color: $button-text-color;
  }

  &_secondary {
    @include bicolor-background($button-background-color-secondary-dark, $button-background-color-secondary);
    color: $button-text-color-secondary;

    &:hover,
    &:focus,
    &:active {
      color: $button-active-text-color-secondary;
    }

    &_theme_dark {
      @include bicolor-background($button-background-color-tertiary-dark, $button-background-color-tertiary);
      color: $button-text-color-tertiary;
    }
  }

  &_ghost {
    padding-right: 0;
    padding-left: 0;
    justify-content: flex-start;
    align-items: flex-start;

    background-image: none;
    color: $link-color-tertiary;

    &:hover,
    &:focus,
    &:active {
      color: $link-hover-color-tertiary;
    }

    &_theme_dark {
      color: $link-color-quaternary;
      &:hover,
      &:focus,
      &:active {
        color: $link-hover-color-quaternary;
      }
    }
  }

  /*
    Icons Styles
  */
  $arrow-right_path: "_arrow-right-16 path:nth-child(1)";
  $arrow-down_path: "_arrow-down-16 path:nth-child(1)";
  $launch_path: "_launch-16 path:nth-child(2)";

  &_ghost &__icon {
    margin-top: $spacing-01;
  }

  &__icon {
    fill: currentColor;
    margin-left: $spacing-05;
    overflow: visible;

    &_arrow-right-16 {
      margin-right: $spacing-02;
    }

    &#{$arrow-right_path},
    &#{$arrow-down_path},
    &#{$launch_path} {
      transform: translate(0, 0);
      transition: transform 0.2s ease-in-out;
    }
  }

  &:hover &__icon,
  &:focus &__icon,
  &:active &__icon {
    &#{$arrow-right_path} {
      transform: translate(4px, 0px);
    }
    &#{$arrow-down_path} {
      transform: translate(0px, 4px);
    }
    &#{$launch_path} {
      transform: translate(2px, -2px);
    }
  }

  &_is-id-anchor {
    $arrow-path: "path:nth-child(1)";

    #{$arrow-path} {
      transform: translate(0, 0);
      transition: transform 0.3s ease-in-out;
    }

    &:hover,
    &:active {
      #{$arrow-path} {
        transform: translate(0, 2px);
      }
    }
  }
}
</style>
