<template>
  <section class="syllabus-view">
    <h1>PHYS 332: Quantum Mechanics II (Spring, 2022)</h1>
    <div class="syllabus-view__general-information">
    </div>
    <div class="syllabus-view__course-information">
    </div>
    <div class="syllabus-view__work-package">
      <div class="syllabus-view__work-package__title">
      </div>
      <div class="syllabus-view__work-package__chapter-list">
        <div class="syllabus-view__work-package__chapter-list__chapter">
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import UserAccountSectionHeader from '../UserAccount/UserAccountSectionHeader.vue'

export default defineComponent({
  name: 'SyllabusView',
  components: {
    UserAccountSectionHeader
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/mq.scss';
@import '~/../scss/mixins/mixins.scss';

.syllabus {
  @include contained();
  padding-top: $spacing-07;
  padding-bottom: $spacing-07;

  &__content {
    padding: $spacing-07 0;
  }
}
</style>
