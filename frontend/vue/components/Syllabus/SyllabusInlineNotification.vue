<template>
  <section class="syllabus-inline-notification">
    <div class="syllabus-inline-notification__content">
      <p class="syllabus-inline-notification__content__title">
        Section deleted from syllabus |
      </p>
      <BasicLink class="syllabus-inline-notification__content__action" @click="undoAction()">
        Undo delete
      </BasicLink>
    </div>
    <div>
      <bx-btn
        class="syllabus-inline-notification__delete"
        kind="ghost"
        size="sm"
        @click="closeNotification()"
      >
        <Close16 class="syllabus-inline-notification__delete-icon" />
      </bx-btn>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import Close16 from '@carbon/icons-vue/es/close/16'
import BasicLink from '../common/BasicLink.vue'
import 'carbon-web-components/es/components/button/button.js'

export default defineComponent({
  name: 'SyllabusInlineNotification',
  components: {
    BasicLink,
    Close16
  },
  data () {
    return {
      showInlineNotification: true
    }
  },
  methods: {
    closeNotification () {
      this.$emit('onCloseNotification')
    },
    undoAction () {
      this.$emit('undoDeletion')
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/mq.scss';
@import '~/../scss/mixins/mixins.scss';
@import '~/../scss/variables/colors.scss';

.syllabus-inline-notification {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-03 $spacing-05;
  background-color: $background-color-lighter;
  border-left: 4px solid $border-color-secondary;

  &__content {
    display: flex;
    &__title {
      @include type-style('body-short-01');
    }

    &__action {
      @include type-style('body-short-01');
      padding-left: $spacing-03;
      color: $text-active-color;
    }
  }

  &__delete {
    &::part(button) {
      padding: $spacing-03;
      margin-left: $spacing-05;
    }

    &-icon {
      fill: $text-color-dark;
    }
  }
}
</style>
