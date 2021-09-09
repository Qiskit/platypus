<template>
  <div class="utility-panel-content" data-test="utility-panel-content">
    <LessonNotes
      v-if="showLessonNotes"
      :notations="notationsData"
      :glossary-terms="vocabulary"
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
import LessonNotes, { Notation } from './LessonNotes.vue'
import UniversalGlossary from './UniversalGlossary.vue'

interface NotationsJson {
  [key: string] : Notation
}

class Props {
  selection = prop<any>({})
}

@Options({
  components: { LessonNotes, UniversalGlossary },
  computed: {
    notationsData: {
      get () {
        const data = document.getElementById('notations')
        let localDefinitions: Notation[] = []
        if (data) {
          const notationsParsed = JSON.parse(data.innerHTML) as NotationsJson
          const notationsKeys = Object.keys(notationsParsed).filter(key => !key.startsWith('_'))
          const notationsArr = notationsKeys.map(key => notationsParsed[key])
          localDefinitions = notationsArr
        }
        return localDefinitions
      }
    },
    vocabulary: {
      get () {
        const data = document.getElementById('glossary')
        let localVocablulary

        if (data) {
          const vocabularyParsed = JSON.parse(data.innerHTML)
          const vocabularyArr = Object.values(vocabularyParsed)

          localVocablulary = vocabularyArr
        }

        return localVocablulary
      }
    },
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

  chooseTitle (val: any) {
    this.showLessonNotes = val === 'Lesson Notes'
    this.showUniversalGlossary = val === 'Glossary'
  }

  emptyStateRedirect (label:string) {
    this.$emit('emptyStateRedirect', label)
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
