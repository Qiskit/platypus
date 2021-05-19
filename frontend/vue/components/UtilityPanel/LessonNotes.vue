<template>
  <div class="lesson-notes">
    <section class="lesson-notes__section" v-if="filteredVocabulary.length == 0 && filteredNotations.length == 0">
      <EmptyPanel @handleRedirect="handleEmptyStateRedirect($event)" />
    </section>
    <section class="lesson-notes__section" v-if="filteredVocabulary.length > 0">
      <p class="lesson-notes__section__title">{{ vocabSectionTitle }}</p>
      <div class="lesson-notes__term" v-for="term in filteredVocabulary" :key="term.index">
        <span class="lesson-notes__term__title">{{ term.title }}</span>
          – <div class="lesson-notes__term__description" v-html="term.text" />
      </div>
    </section>
    <section class="lesson-notes__section" v-if="filteredNotations.length > 0">
      <p class="lesson-notes__section__title">{{ notationsSectionTitle }}</p>
      <bx-data-table :theme="white">
        <bx-table>
          <bx-table-head>
            <bx-table-header-row>
              <bx-table-header-cell>Notation</bx-table-header-cell>
              <bx-table-header-cell>Description</bx-table-header-cell>
            </bx-table-header-row>
          </bx-table-head>
          <bx-table-body>
            <bx-table-row v-for="item in filteredNotations" :key="item.index">
              <bx-table-cell class="lesson-notes__symbol" v-html="item.html"/>
              <bx-table-cell v-html="item.meaning"/>
            </bx-table-row>
          </bx-table-body>
        </bx-table>
      </bx-data-table>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'
import 'carbon-web-components/es/components/data-table/table.js';
import 'carbon-web-components/es/components/data-table/table-body.js';
import 'carbon-web-components/es/components/data-table/table-head';
import 'carbon-web-components/es/components/data-table/table-cell.js';
import 'carbon-web-components/es/components/data-table/table-row.js';
import 'carbon-web-components/es/components/data-table/table-header-row';
import EmptyPanel from './EmptyPanel.vue'

type notation = {
  html: string;
  say?: string;
  meaning: string;
  type?: string;
  sections: any[];
}

type term = {
  title: string;
  text: string[];
  sections: any[];
}

class Props {
  notations = prop<any>({})
  glossaryTerms = prop<any>({})
}

@Options({
  components: { EmptyPanel },
  computed: {
    filteredNotations(): notation[] {
      const notationsData = this.notations
      const sectionNode = document.querySelector("x-course")
      const finalNotations: notation[] = []

      if(sectionNode) {
        const sectionTitle = sectionNode.getAttribute('data-section')
        notationsData.forEach((item: notation) => {
          if (item.sections.indexOf(sectionTitle) != -1) {
            this.showLessonNotations = true
            finalNotations.push(item)
          }
        })
      }
      return finalNotations
    },
    filteredVocabulary(): term[] {
      const glossaryTermsData = this.glossaryTerms
      const sectionNode = document.querySelector("x-course")
      const finalVocabulary: term[] = []

      if(sectionNode) {
        const sectionTitle = sectionNode.getAttribute('data-section')
        glossaryTermsData.forEach((item: term) => {
          if (item.sections.indexOf(sectionTitle) != -1) {
            this.showLessonNotations = true
            finalVocabulary.push(item)
          }
        })
      }
      return finalVocabulary
    }
  }
})

export default class LessonNotes extends Vue.with(Props) {
  showLessonNotations = false;
  notationsSectionTitle = 'Math notations'
  vocabSectionTitle = 'Vocabulary'

  handleEmptyStateRedirect(label:string) {
    this.$emit('handleEmptyStateRedirect', label)
  }
}
</script>

<style lang="scss">
@import 'carbon-components/scss/globals/scss/vendor/@carbon/elements/scss/themes/mixins';
@import '../../../scss/variables/colors.scss';
@import 'carbon-components/scss/globals/scss/typography';

.lesson-notes {
  &__section {
    margin-bottom: $layout-05;

    &__title {
      @include type-style('productive-heading-03');
    }
  }

  &__term {
    margin-bottom: $spacing-05;

    &__title {
      @include type-style('productive-heading-01');
    }

    &__description,
    &__description p {
      @include type-style('body-short-01');
      display: inline;
    }
  }

  &__symbol {
    @include type-style('body-short-01');
  }
}
</style>

<style lang="scss">
@import 'carbon-components/scss/globals/scss/vendor/@carbon/elements/scss/themes/mixins';
@import '../../../scss/variables/colors.scss';
@import 'carbon-components/scss/globals/scss/typography';
// overrides
.lesson-notes {
  a {
    color: $link-color-tertiary;
  }

  bx-table-header-cell {
    color: $text-color-black;
    background-color: $background-color-light;
  }

  bx-table-cell,
  bx-table-cell:hover {
    color: $text-color-light;
    background-color: $background-color-white;
    border-top: none;
    border-bottom: 1px solid $border-color;
  }
}
</style>
