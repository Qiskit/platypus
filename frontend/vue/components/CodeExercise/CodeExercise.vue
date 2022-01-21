<template>
  <div class="code-exercise">
    <div class="code-exercise__editor-block">
      <CodeEditor
        class="code-exercise__editor-block__editor"
        :code="code"
        @codeChanged="codeChanged"
        @notebookCopyRequest="notebookCopyRequest"
      />
      <ExerciseActionsBar
        class="code-exercise__editor-block__actions-bar"
        @run="run"
        @grade="grade"
      />
    </div>
    <CodeOutput
      ref="output"
      class="code-exercise__output"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import CodeEditor from './CodeEditor.vue'
import ExerciseActionsBar from './ExerciseActionsBar.vue'
import CodeOutput from './CodeOutput.vue'

export default defineComponent({
  name: 'CodeExercise',
  components: {
    CodeEditor,
    ExerciseActionsBar,
    CodeOutput
  },
  props: {},
  data () {
    return {
      code: `p1 = 0.01
p3 = 3 * p1**2 * (1-p1) + p1**3 # probability of 2 or 3 errors
print('Probability of a single reply being garbled: {}'.format(p1))
print('Probability of a the majority of three replies being garbled: {:.4f}'.format(p3))`
    }
  },
  mounted () {
  },
  methods: {
    run () {
      const codeOutput: any = this.$refs.output
      codeOutput.requestExecute(this.code)
      /*
      getKernel();
      let code = cm.getValue();
      kernelPromise.then((kernel) => {
        try {
          $cell.find(".thebe-busy").css("visibility", "visible");
          outputArea.future = kernel.requestExecute({ code: code });
          outputArea.future.done.then(() => {
            $cell.find(".thebe-busy").css("visibility", "hidden");
          });
        } catch (error) {
          clearOnError(error);
        }
      });
      return false;
      */
    },
    grade () {
      /* TBD */
      console.log(`Grade request from exercise with code: ${this.code}`)
    },
    codeChanged (code: string) {
      this.code = code
    },
    notebookCopyRequest (code: string) {
      /* TBD */
      console.log(`Requested a notebook copy of code: ${code}`)
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'carbon-components/scss/globals/scss/typography';
@import '~/../scss/variables/colors.scss';

.code-exercise {
  border: 1px solid $border-color;
  &__editor-block {
    background-color: $background-color-lighter;
    position: relative;
    height: 13rem;

    &__editor {
      height: 100%;
    }
    &__actions-bar {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
}
</style>
