<template>
  <div class="code-editor">
    <CodeEditorTools
      class="code-editor__tools"
      :copy-text="internalCode"
      :copy-enabled="copyEnabled"
      :reset-enabled="resetEnabled"
      :notebook-enabled="notebookEnabled"
      @reset="resetRequest"
      @notebook="notebook"
    />
    <!-- textarea v-model="internalCode" class="code-editor__text-area" @input="textChanged" /-->
    <CodeArea class="code-editor__text-area" :code="internalCode" @codeChanged="codeChanged" />
    <div
      v-if="resetNotificationOpen"
      class="code-editor__reset-notification__wrapper"
    >
      <bx-toast-notification
        class="code-editor__reset-notification"
        title="Reset code block?"
        icon-description="Cancel"
        subtitle="This will reset the code to de textbook default. Any custom edits will be removed."
        :timeout="null"
        :open="resetNotificationOpen"
        :kind="'warning'"
        :theme="'dark'"
        @bx-notification-closed="resetCancel"
      >
        <a class="code-editor__reset-notification__confirm-button" @click="resetConfirm">Reset code</a>
      </bx-toast-notification>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import CodeEditorTools from './CodeEditorTools.vue'
import CodeArea from './CodeArea.vue'
import 'carbon-web-components/es/components/notification/toast-notification'

export default defineComponent({
  name: 'CodeExercise',
  components: {
    CodeEditorTools,
    CodeArea
  },
  props: {
    code: {
      type: String,
      required: false,
      default: ''
    },
    copyEnabled: {
      type: Boolean,
      required: false,
      default: true
    },
    resetEnabled: {
      type: Boolean,
      required: false,
      default: true
    },
    notebookEnabled: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data () {
    return {
      initialCode: '',
      internalCode: '',
      resetNotificationOpen: false
    }
  },
  watch: {
    code (newVal) {
      this.internalCode = newVal
    }
  },
  mounted () {
    this.internalCode = this.code
    this.initialCode = this.code
  },
  methods: {
    resetRequest () {
      this.resetNotificationOpen = true
    },
    resetCancel () {
      this.resetNotificationOpen = false
    },
    resetConfirm () {
      this.resetNotificationOpen = false
      this.internalCode = this.initialCode
      this.$emit('codeChanged', this.internalCode)
    },
    codeChanged (code: string) {
      this.internalCode = code
      this.$emit('codeChanged', this.internalCode)
    },
    notebook () {
      this.$emit('notebookCopyRequest', this.internalCode)
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/colors.scss';

.code-editor {
  &__text-area {
    width: 100%;
    height: 100%;
    padding: $spacing-05 $spacing-05 $spacing-08 $spacing-05;
  }
  &__tools {
    position: absolute;
    right: 0;
  }
  &__reset-notification {
    --cds-inverse-01: #{$text-color-dark};
    --cds-inverse-02: #{$background-color-white};
    width: 22rem;

    &__wrapper {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: $disabled-background-color;
      display: flex;
      justify-content: center;
      z-index: 1;
    }

    &__confirm-button {
      display: block;
      margin-bottom: $spacing-05;
    }
  }
}
</style>
