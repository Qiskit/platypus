<template>
  <section class="delete-section">
    <h4 class="delete-section__title">
      {{ $translate('Delete account') }}
    </h4>
    <p class="delete-section__description">
      {{ $translate('Click the button below to delete your user account.') }}
    </p>
    <AppCta
      class="delete-section__cta"
      :label="deleteUserDataCTA.label"
      :segment="deleteUserDataCTA.segment"
      :icon="deleteUserDataCTA.icon"
      @click="showConfirmationModal($event)"
    >
      {{ $translate('Delete account') }}
    </AppCta>
     <bx-modal
      class="delete-section__modal"
      :open="isModalVisible"
      :size="modalSize"
      @bx-modal-closed="closeModal"
    >
    <bx-modal-header class="delete_section__modal__header">
      <bx-modal-close-button></bx-modal-close-button>
      <bx-modal-heading>
        <h4>
          {{ $translate('Delete your account?') }}
        </h4>
      </bx-modal-heading>
    </bx-modal-header>
    <bx-modal-body class="delete_section__modal__body">
      <p>{{ $translate('Deleting your account is a permanent action that cannot be undone. Please type “delete” to continue.') }}</p>
      <bx-input
        :value="modalInputValue"
        color-scheme="light"
        type="text"
        name="confirmation-field"
        placeholder='Type “delete” here'
        @input="inputValueChange"
      />
    </bx-modal-body>
    <bx-modal-footer>
      <bx-btn kind="secondary" @click="closeModal">
        {{ $translate('Cancel') }}
      </bx-btn>
      <bx-btn kind="danger" :disabled="isButtonDisabled" href="/delete/account">
        {{ $translate('Delete account') }}
      </bx-btn>
    </bx-modal-footer>
  </bx-modal>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import AppCta from '../common/AppCta.vue'
import 'carbon-web-components/es/components/modal/modal.js'
import 'carbon-web-components/es/components/modal/modal-body.js'
import 'carbon-web-components/es/components/modal/modal-close-button';
import 'carbon-web-components/es/components/modal/modal-header.js'
import 'carbon-web-components/es/components/modal/modal-footer.js'
import 'carbon-web-components/es/components/button/button.js'
import 'carbon-web-components/es/components/input/input.js'

export default defineComponent({
  name: 'DeleteUserDataSection',
  data () {
    return {
      deleteUserDataCTA: {
        label: 'Delete account',
        icon: 'delete-16',
        segment: {
          cta: 'delete-account',
          location: 'user-account-admin'
        }
      },
      modalSize: 'sm',
      modalInputValue: '',
      isModalVisible: false,
      isButtonDisabled: true,
      inputValidationKey: 'delete',
      inputPlaceholder: 'Type “delete” here'
    }
  },
  components: {
    AppCta
  },
  methods: {
    showConfirmationModal(ev: any) {
      ev.preventDefault()
      this.modalInputValue = ''
      this.isButtonDisabled = true
      this.isModalVisible = true
    },
    closeModal () {
      this.modalInputValue = ''
      this.isModalVisible = false
    },
    inputValueChange(event: any) {
      const inputValue = event.target._value
      if( inputValue.toLowerCase() === this.inputValidationKey ) {
        this.modalInputValue = inputValue.toLowerCase()
        this.isButtonDisabled = false
      } else {
        this.isButtonDisabled = true
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/mq.scss';
@import '~/../scss/variables/colors.scss';
@import '~/../scss/mixins/mixins.scss';

.delete-section {
  @include contained();
  margin-left: 0;
  margin-bottom: $spacing-10;

  &__title {
    @include type-style('expressive-heading-04');
    padding: $spacing-05 0;
  }

  &__description {
    @include type-style('body-long-01');
    padding-bottom: $spacing-05;
  }

  &__cta {
    @include type-style('body-long-02');
  }

  &__modal {
    left: 0px;
  }

  bx-modal::part(dialog) {
    background-color: $cool-gray-10;
  }
}
</style>
