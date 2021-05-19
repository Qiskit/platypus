<template>
  <div class="universal-glossary">
    <p class="universal-glossary__title">Universal frequently used notation</p>
    <bx-data-table :theme="white">
      <bx-table>
        <bx-table-head>
          <bx-table-header-row>
            <bx-table-header-cell>Notation</bx-table-header-cell>
            <bx-table-header-cell>Description</bx-table-header-cell>
          </bx-table-header-row>
        </bx-table-head>
        <bx-table-body>
          <bx-table-row v-for="item in glossaryData" :key="item.index">
            <bx-table-cell class="universal-glossary__symbol" v-html="item.notation"></bx-table-cell>
            <bx-table-cell>{{item.description}}</bx-table-cell>
          </bx-table-row>
        </bx-table-body>
      </bx-table>
    </bx-data-table>
  </div>
</template>

<script lang="ts">
import { Vue, prop } from 'vue-class-component'
import 'carbon-web-components/es/components/data-table/table.js';
import 'carbon-web-components/es/components/data-table/table-body.js';
import 'carbon-web-components/es/components/data-table/table-head';
import 'carbon-web-components/es/components/data-table/table-cell.js';
import 'carbon-web-components/es/components/data-table/table-row.js';
import 'carbon-web-components/es/components/data-table/table-header-row';

class Props {
  glossaryData = prop<any>({})
}

export default class UniversalGlossary extends Vue.with(Props) {}
</script>

<style lang="scss">
@import '../../../scss/variables/colors.scss';
@import 'carbon-components/scss/globals/scss/typography';

.universal-glossary {
  background-color: $background-color-white;
  margin-bottom: $layout-05;

  &__title {
    @include type-style('productive-heading-03');
  }

  .universal-glossary__symbol {
    @include type-style('body-short-01');
  }
}
</style>

<style lang="scss">
@import '../../../scss/variables/colors.scss';
@import 'carbon-components/scss/globals/scss/typography';
// overrides
.universal-glossary {
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
