<template>
  <a
    :class="{'basic-link_has-link': hasLink }"
    :href="url"
    :rel="isExternal ? 'noopener' : null"
    :target="isExternal ? '_blank' : null"
    @click="onClick"
    @mouseenter="$emit('mouseenter')"
  >
    <slot />
  </a>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";

export default defineComponent({
  name: "BasicLink",
  props: {
    isStatic: {
      type: Boolean,
      default: false,
      required: false,
    },
    segment: {
      type: Object,
      default: undefined,
      required: false,
    },
    url: {
      type: String,
      default: "#",
      required: false,
    },
  },
  computed: {
    hasLink(): boolean {
      return !!this.url;
    },
    isAnchor(): boolean {
      return this.isExternal || this.isMail || this.isIdAnchor || this.isStatic;
    },
    isExternal(): boolean {
      return !!this.url && this.url.startsWith("http");
    },
    isIdAnchor(): boolean {
      return !!this.url && this.url.startsWith("#");
    },
    isMail(): boolean {
      return !!this.url && this.url.startsWith("mailto");
    }
  },
  methods: {
    onClick(event: PointerEvent) {
      if (this.segment)
        this.$trackClickEvent(this.segment.cta, this.segment.location);
      if (this.url === '#')
        event.preventDefault()
    }
  }
});
</script>

<style lang="scss" scoped>
.basic-link {
  &_has-link {
    cursor: pointer;
  }
}
</style>
