<template>
  <a
    :href="isAnchor && url"
    :style="hasLink && 'cursor:pointer'"
    :rel="isExternal && 'noopener'"
    :target="isExternal && '_blank'"
  >
    <slot />
  </a>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'

class Props {
  url = prop({
    type: String, default: ''
  })
  isStatic = prop({
    type: Boolean, default: false
  })
}

export default class AppLink extends Vue.with(Props) {
  // @Prop({ type: String, default: '' }) url!: string
  // @Prop({ type: Boolean, default: false }) isStatic!: boolean
  static isExternal (url: string): boolean {
    return url.startsWith('http')
  }
  static isMail (url: string): boolean {
    return url.startsWith('mailto')
  }
  static isIdAnchor (url: string): boolean {
    return url.startsWith('#')
  }
  get hasLink (): boolean {
    return !!this.url
  }
  get isAnchor (): boolean {
    const url = this.url
    return AppLink.isExternal(url) ||
      AppLink.isMail(url) ||
      AppLink.isIdAnchor(url) ||
      this.isStatic
  }
  get isExternal (): boolean {
    return AppLink.isExternal(this.url)
  }
  get isNuxtLink (): boolean {
    return !this.isAnchor
  }
}
</script>
