<template>
  <div class="code-exercise">
    <div class="code-exercise__editor-block">
      <CodeEditor class="code-exercise__editor" :code="code" @codeChanged="codeChanged" />
      <ExerciseActionsBar class="code-exercise__actions-bar" @run="run" @grade="grade" />
    </div>
    <CodeOutput ref="output" class="code-exercise__output" />
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
      console.log('run from exercise')
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
      console.log('grade from exercise')
    },
    codeChanged (code: string) {
      console.log(`codeChanged from exercise ${code}`)
      this.code = code
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~/../scss/variables/colors.scss';

.code-exercise {
  border: 1px solid $border-color;
  &__editor-block {
    // border-bottom: 1px solid $border-color;
    background-color: $background-color-lighter;
  }
}
</style>
