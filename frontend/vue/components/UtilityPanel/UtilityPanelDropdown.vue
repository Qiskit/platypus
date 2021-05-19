<template>
  <bx-dropdown
    :value="selectedPanel"
    class="utility-panel-dropdown"
    v-model="selectedPanel"
    trigger-content="Select resource"
    @bx-dropdown-selected="switchPanel($event)"
  >
    <bx-dropdown-item
      class="utility-panel-dropdown__item"
      v-for="link in links"
      :key="link.label"
      :value="link.label"
    >
      {{ link.label }}
    </bx-dropdown-item>
  </bx-dropdown>
</template>

<script lang="ts">
import { Options, Vue, prop } from 'vue-class-component'
import BasicLink from '../common/BasicLink.vue'
// using Carbon web-component from https://github.com/carbon-design-system/carbon-web-components#basic-usage
import 'carbon-web-components/es/components/dropdown/dropdown.js';
import 'carbon-web-components/es/components/dropdown/dropdown-item.js'

class Props {
  selectedPanel = prop<String>({})
}

@Options({
  components: { BasicLink },
})

export default class UtilityPanelHeader extends Vue.with(Props) {
  selectedPanel: string = 'Lesson Notes'
  links = [
    {
      label: 'Lesson Notes',
    },
    {
      label: 'Glossary',
    }
  ]

  mounted() {
    this.$emit('updatedPanelSelection', this.selectedPanel)
  }

  switchPanel(event: any) {
    const selectionTitle = event.detail.item.value
    this.$emit('updatedPanelSelection', selectionTitle)
    this.selectedPanel = selectionTitle
  }
}
</script>


<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/colors.scss';

.utility-panel-dropdown {
  width: 12.5rem;

&__item {
    @include type-style('body-short-01');
    display: block;
    color: $link-color-secondary;
    text-decoration: none;
    background-color: $background-color-lighter;
  }

  // component overrides
  // selecting within the shadow
  &::part(trigger-button) {
    @include type-style('body-short-01');
    --cds-body-short-01-font-size: 1rem;
    background-color: $cool-gray-20;

    &:focus {
      outline: none;
    }
  }
}
</style>
