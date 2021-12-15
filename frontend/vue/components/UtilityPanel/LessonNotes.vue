<template>
  <div class="lesson-notes">
    <section v-if="glossaryTerms.length == 0 && notations.length == 0" class="lesson-notes__section">
      <EmptyPanel @handleRedirect="handleEmptyStateRedirect($event)" />
    </section>
    <section v-if="glossaryTerms.length > 0" class="lesson-notes__section">
      <p class="lesson-notes__section__title">
        {{ $translate('Vocabulary') }}
      </p>
      <div v-for="term in glossaryTerms" :key="term.index" class="lesson-notes__term">
        <span class="lesson-notes__term__title">{{ term.title }}</span>
        – <div class="lesson-notes__term__description" v-html="term.text" />
      </div>
    </section>
    <section v-if="notations.length > 0" class="lesson-notes__section">
      <p class="lesson-notes__section__title">
        {{ $translate('Math notations') }}
      </p>
      <bx-data-table :theme="white">
        <bx-table>
          <bx-table-head>
            <bx-table-header-row>
              <bx-table-header-cell>{{ $translate('Notation') }}</bx-table-header-cell>
              <bx-table-header-cell>{{ $translate('Description') }}</bx-table-header-cell>
            </bx-table-header-row>
          </bx-table-head>
          <bx-table-body>
            <bx-table-row v-for="item in notations" :key="item.index">
              <bx-table-cell class="lesson-notes__symbol" v-html="item.html" />
              <bx-table-cell v-html="item.meaning" />
            </bx-table-row>
          </bx-table-body>
        </bx-table>
      </bx-data-table>
    </section>
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
import EmptyPanel from './EmptyPanel.vue'

export interface Notation {
  html: string
  say?: string
  meaning: string
  type?: string
  sections: any[]
}

export interface Term {
  title: string
  text: string[]
  sections: any[]
}

class Props {
  notations = prop<Notation>({})
  glossaryTerms = prop<Term>({})
}

@Options({
  components: { EmptyPanel }
})

export default class LessonNotes extends Vue.with(Props) {
  showLessonNotations = false;

  handleEmptyStateRedirect (label:string) {
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
