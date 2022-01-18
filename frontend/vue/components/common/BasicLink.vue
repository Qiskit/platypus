<template>
  <component
    :is="isNuxtLink ? 'nuxt-link' : 'a'"
    :href="isAnchor && url"
    :to="isNuxtLink && url"
    :style="hasLink && 'cursor:pointer'"
    :rel="isExternal && 'noopener'"
    :target="isExternal && '_blank'"
    @click="segment && $trackClickEvent(segment.cta, segment.location)"
    @mouseenter="$emit('mouseenter')"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { Vue, prop } from 'vue-class-component'
import { CtaClickedEventProp } from '../../../constants/segment'
import { isExternal, isMail, isIdAnchor } from '../../../ts/utilities'

class Props {
  url = prop({ type: String, default: '' })
  segment = prop<CtaClickedEventProp>({ type: Object, default: undefined })
  isStatic = prop({ type: Boolean, default: false })
}

export default class BasicLink extends Vue.with(Props) {
  get hasLink (): boolean {
    return !!this.url
  }

  get isAnchor (): boolean {
    const url = this.url
    return isExternal(url) ||
      isMail(url) ||
      isIdAnchor(url) ||
      this.isStatic
  }

  get isExternal (): boolean {
    return isExternal(this.url)
  }

  get isNuxtLink (): boolean {
    return false
  }
}
</script>
