<template>
  <section class="syllabus-form">
    <bx-tabs :value="defaultActiveTab">
      <bx-tab id="tab-write" class="syllabus-form__tab" target="panel-write" value="write">
        {{ $translate('Write') }}
      </bx-tab>
    </bx-tabs>
    <div id="panel-write" class="syllabus-form__tab-panel" role="tabpanel" aria-labelledby="tab-write">
      <SyllabusFormCourseInfo />
      <SyllabusFormModule v-for="module in modules" :key="module.id" :module-id="module.id" @removeModuleAction="removeContentBlock(module.id)" />
      <div class="syllabus-form__add-content">
        <BasicLink
          class="syllabus-form__add-content__link"
          v-bind="addContentLink"
          @click="addContentBlock"
        >
          {{ addContentLink.label }}
        </BasicLink>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import 'carbon-web-components/es/components/tabs/tabs.js'
import 'carbon-web-components/es/components/tabs/tab.js'
import BasicLink from '../common/BasicLink.vue'
import SyllabusFormCourseInfo from './SyllabusFormCourseInfo.vue'
import SyllabusFormModule from './SyllabusFormModule.vue'

export default defineComponent({
  name: 'SyllabusForm',
  components: {
    BasicLink,
    SyllabusFormCourseInfo,
    SyllabusFormModule
  },
  data () {
    return {
      defaultActiveTab: 'write',
      addContentLink: {
        label: 'Add content',
        url: '#'
      },
      modules: [{
        id: 'module-1'
      }],
      modulesCounter: 0
    }
  },
  methods: {
    addContentBlock () {
      this.modules.push({
        id: `module-${++this.modulesCounter}`
      })
    },
    removeContentBlock (id: string) {
      this.modules = this.modules.filter((item) => {
        return item.id !== id
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
    padding: $spacing-05;
    background-color: $cool-gray-10;
    &__link {
      color: $text-active-color;
      @include type-style('body-long-01');
    }
  }
}
</style>
