<template>
  <div class="utility-panel-content" data-test="utility-panel-content">
    <LessonNotes
      v-if="showLessonNotes"
      :notations="notationsData"
      :glossary-terms="vocabularyData"
      @handleEmptyStateRedirect="emptyStateRedirect"
    />
    <UniversalGlossary v-if="showUniversalGlossary" :glossary-data="universalNotations" />
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'
import 'carbon-web-components/es/components/data-table/table.js'
import 'carbon-web-components/es/components/data-table/table-body.js'
import 'carbon-web-components/es/components/data-table/table-head'
import 'carbon-web-components/es/components/data-table/table-cell.js'
import 'carbon-web-components/es/components/data-table/table-row.js'
import 'carbon-web-components/es/components/data-table/table-header-row'
import LessonNotes from './LessonNotes.vue'
import UniversalGlossary from './UniversalGlossary.vue'

class Props {
  selection = prop<any>({})
  notationsData = prop<any>({})
  vocabularyData = prop<any>({})
}

@Options({
  components: { LessonNotes, UniversalGlossary },
  computed: {
    universalNotations: {
      get () {
        const data = document.getElementById('universal-notes')
        let universalNotes

        if (data) {
          universalNotes = JSON.parse(data.innerHTML)
        }
        return universalNotes
      }
    }
  }
})

export default class UtilityPanelContent extends Vue.with(Props) {
  showLessonNotes:boolean = false;
  showUniversalGlossary:boolean = false;
  fallbackPanelSelection = 'Glossary'

  chooseTitle (val: any) {
    this.showLessonNotes = val === 'Lesson Notes'
    this.showUniversalGlossary = val === 'Glossary'
  }

  emptyStateRedirect (label:string) {
    this.$emit('emptyStateRedirect', label)
  }

  mounted () {
    if (this.notationsData.length === 0 && this.vocabularyData.length === 0) {
      this.$emit('emptyStateRedirect', this.fallbackPanelSelection)
    }
  }
}
</script>

<style lang="scss">
@import 'carbon-components/scss/globals/scss/vendor/@carbon/elements/scss/themes/mixins';
@import '../../../scss/variables/colors.scss';
@import 'carbon-components/scss/globals/scss/typography';

.utility-panel-content {
  background-color: var(--qiskit--color-background-primary);
  padding: $spacing-06 $spacing-05;

  bx-table-header-cell {
    color: var(--table--header--text-color);
    background-color: var(--table--header--background-color);
  }

  bx-table-cell,
  bx-table-cell:hover {
    color: var(--qiskit--color-text-primary);
    background-color: var(--qiskit--color-background-primary);
    border-top: none;
    border-bottom: 1px solid $border-color;
  }
}
</style>
