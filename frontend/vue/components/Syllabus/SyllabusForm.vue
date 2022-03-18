<template>
  <section class="syllabus-form">
    <bx-tabs :value="defaultActiveTab">
      <bx-tab id="tab-write" class="syllabus-form__tab" target="panel-write" value="write">
        {{ $translate('Write') }}
      </bx-tab>
    </bx-tabs>
    <div id="panel-write" class="syllabus-form__tab-panel" role="tabpanel" aria-labelledby="tab-write">
      <SyllabusFormCourseInfo />
      <SyllabusFormModule
        v-for="module in modules"
        :key="module.id"
        :module-id="module.id"
        @removeModuleAction="removeContentBlock(module.id)"
      />
      <div class="syllabus-form__add-content">
        <BasicLink
          class="syllabus-form__add-content__link"
          v-bind="addContentLink"
          @click="addContentBlock"
        >
          {{ addContentLink.label }}
        </BasicLink>
      </div>
      <SyllabusInlineNotification
        v-if="showInlineNotification"
        @on-close-notification="closeNotification"
        @undo-deletion="undoDeleteAction(lastDeletedModuleId)"
      />
      <div class="syllabus-form__actions">
        <AppCta
          class="syllabus-form__actions__cancel"
          v-bind="cancelAction"
          target="_self"
          kind="ghost"
        />
        <AppCta
          :label="submitAction.label"
          :segment="submitAction.segment"
          target="_self"
          @click="submitForm($event)"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import 'carbon-web-components/es/components/tabs/tabs.js'
import 'carbon-web-components/es/components/tabs/tab.js'
import AppCta from '../common/AppCta.vue'
import BasicLink from '../common/BasicLink.vue'
import SyllabusFormCourseInfo from './SyllabusFormCourseInfo.vue'
import SyllabusFormModule from './SyllabusFormModule.vue'
import SyllabusInlineNotification from './SyllabusInlineNotification.vue'

export default defineComponent({
  name: 'SyllabusForm',
  components: {
    AppCta,
    BasicLink,
    SyllabusFormCourseInfo,
    SyllabusFormModule,
    SyllabusInlineNotification
  },
  data () {
    return {
      defaultActiveTab: 'write',
      showInlineNotification: false,
      lastDeletedModuleId: 0,
      addContentLink: {
        label: 'Add content',
        url: '#'
      },
      cancelAction: {
        url: '/account#Classroom',
        label: this.$translate('Cancel'),
        segment: {
          cta: 'cancel',
          location: 'create-syllabus'
        }
      },
      submitAction: {
        label: 'Publish syllabus',
        url: '#',
        segment: {
          cta: 'publish-syllabus',
          location: 'create-syllabus'
        }
      },
      modules: [{
        id: 1
      }],
      modulesCounter: 1
    }
  },
  methods: {
    addContentBlock () {
      this.modules.push({
        id: ++this.modulesCounter
      })
    },
    removeContentBlock (id: number) {
      this.showInlineNotification = true
      this.lastDeletedModuleId = id
      this.modules = this.modules.filter((item) => {
        return item.id !== id
      })
    },
    closeNotification () {
      this.showInlineNotification = false
    },
    submitForm () {
      // TODO: add logic for submitting form
    },
    undoDeleteAction (deletedModuleId: number) {
      // TODO: add logic for proper undo that persists w/ data
      this.modules.push({
        id: deletedModuleId
      })
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/mq.scss';
@import '~/../scss/mixins/mixins.scss';
@import '~/../scss/variables/colors.scss';

.syllabus-form {
  margin-top: $spacing-06;

  &__tab {
    --cds-interactive-01: #{$purple-70};
    max-width: 6rem;
  }

  &__add-content {
    display: flex;
    padding: $spacing-03 $spacing-05;
    background-color: $cool-gray-10;
    margin-bottom: $spacing-05;
    &__link {
      color: $text-active-color;
      @include type-style('body-long-01');
    }
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    padding-top: $spacing-05;

    &__cancel {
      display: flex;
      justify-content: space-between;
      padding: $spacing-05;
      background-color: $cool-gray-10;
      margin-right: $spacing-05;

      :deep() > .app-cta__icon {
        transform: rotate(180deg);
      }
    }

    &__container {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding: $spacing-07 0;
    }
  }
}
</style>
