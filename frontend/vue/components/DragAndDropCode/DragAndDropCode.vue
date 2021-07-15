<template>
  <div
    class="drag-and-drop-code"
    :ondragover="ev => allowDrop(ev)"
    :ondrop="ev => dropToCodePool(ev)"
  >
    <div class="drag-and-drop-code__code-pool-title">
      Drag from here
    </div>
    <div
      ref="codePoolRef"
      class="drag-and-drop-code__config-container"
    >
      <slot />
    </div>
    <div class="drag-and-drop-code__gaps-title">
      Drop blocks here
    </div>
    <div
      class="drag-and-drop-code__gaps-container"
      :class="{ 'drag-and-drop-code__gaps-container_show-hints' : showHints() }"
    >
      <div
        v-for="(line, idx) in codeLineGapList"
        :key="idx"
        :ondragover="ev => allowDrop(ev)"
        :ondrop="ev => drop(ev, idx)"
        :data-idx="idx"
        class="drag-and-drop-code__code-gap"
        :class="[
          `drag-and-drop-code__code-gap${classModifierPerTextLength(line.textLength)}`,
          {
            'drag-and-drop-code__code-gap_wrong': !gapIsCorrect(line)
          }
        ]"
        :style="`--indentation: ${line.indentation};`"
      />
    </div>
    <div class="drag-and-drop-code__result-info">
      <div class="drag-and-drop-code__result-info__text" v-html="resultInfo" />
      <SolutionStateIndicator class="drag-and-drop-code__result-info__state-indicator" :state="solutionState()" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, prop, Vue } from 'vue-class-component'
import { ref } from 'vue'
import SolutionStateIndicator, { SolutionState } from '../common/SolutionStateIndicator.vue'

type CodeLine = {
  htmlElement: HTMLElement
  indentation: number
  textLength: number
  textContent: string
  group: string
  id: number
}

type CodeLineGap = {
  indentation: number
  textLength: number
  validContents: string[]
  content: CodeLine | null
}

class Props {
  state = prop<Number>({ default: 0 })
  goal = prop<String>({ default: 'dnd-code-solved', required: true });
}
@Options({
  components: {
    SolutionStateIndicator
  }
})
export default class DragAndDropCode extends Vue.with(Props) {
  codePoolRef = ref<HTMLElement | null>(null)
  get codePool () { return (this.codePoolRef as unknown as HTMLElement) }
  codeLineList: CodeLine[] = []
  shuffledLinesList: CodeLine[] = []
  codeLineGapList: CodeLineGap[] = []
  resultInfo: string = ''
  codeLineLastId: number = 0

  mounted () {
    const resultInfoElement = this.codePool.querySelector('.result-info')
    if (resultInfoElement) {
      this.resultInfo = resultInfoElement.innerHTML
      this.codePool.removeChild(resultInfoElement)
    }
    const rootLines = this.codePool.querySelectorAll('.drag-and-drop-code__config-container > .line')
    rootLines.forEach(line => this.codePool.removeChild(line))

    this.codeLineList = this.processLines(Array.from(rootLines))
    this.prepareCodeLines()
    this.shuffledLinesList = this.shuffle(this.codeLineList)
    this.shuffledLinesList.forEach(line => this.codePool.appendChild(line.htmlElement))
    this.codeLineGapList = this.createLineGaps()
  }

  prepareCodeLines () {
    this.codeLineList.forEach((line) => {
      const attr = document.createAttribute('draggable')
      attr.value = 'true'
      line.htmlElement.attributes.setNamedItem(attr)
      line.htmlElement.ondragstart = ev => this.dragStart(ev, line)
    })
  }

  createLineGaps (): CodeLineGap[] {
    return this.codeLineList.map((line) => {
      const validContents = this.codeLineList.filter((line2) => {
        return (line2.group !== '' || line2 === line) && line2.group === line.group
      }).map(value => value.textContent)

      return {
        indentation: line.indentation,
        textLength: validContents.reduce((prev, curr) => prev.length > curr.length ? prev : curr).length,
        validContents,
        content: null
      }
    })
  }

  processLines (lines: Element[], indentation: number = 0) : Array<CodeLine> {
    let codeLines: CodeLine[] = []

    lines.forEach((line) => {
      const childLines = Array.from(line.children).filter(elem => elem.classList.contains('line'))
      childLines.forEach(child => line.removeChild(child))
      const lineGroup = line.attributes.getNamedItem('group')?.value || ''
      const textLength = line.textContent !== null ? line.textContent.length : 0
      const lineHTML = line as HTMLElement
      lineHTML.classList.add(`line${this.classModifierPerTextLength(textLength)}`)
      codeLines.push({
        htmlElement: lineHTML,
        indentation,
        textLength,
        textContent: line.textContent || '',
        group: lineGroup,
        id: this.codeLineLastId++
      })
      if (childLines.length > 0) {
        codeLines = codeLines.concat(this.processLines(childLines, indentation + 1))
      }
    })
    return codeLines
  }

  shuffle<T> (input: T[]) : T[] {
    const array = Array.from(input)

    for (let i = 0; i < array.length - 1; i++) {
      const randomChoiceIndex: number = this.random(i, array.length - 1);
      [array[i], array[randomChoiceIndex]] = [array[randomChoiceIndex], array[i]]
    }

    return array
  }

  random (min: number, max: number) : number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  dragStart (ev: DragEvent, line: CodeLine) {
    if (ev.dataTransfer === null) {
      return
    }
    ev.dataTransfer.setData('lineId', `${line.id}`)
  }

  allowDrop (ev: DragEvent) {
    ev.preventDefault()
  }

  dropToCodePool (ev: DragEvent) {
    if (ev.dataTransfer === null) {
      return
    }
    ev.preventDefault()

    const lineId = parseInt(ev.dataTransfer.getData('lineId'))
    const droppedLine = this.codeLineList[lineId]
    const droppedLineParent = droppedLine.htmlElement.parentElement
    let droppedLineCurrentGap: CodeLineGap | null = null
    if (droppedLineParent && droppedLineParent.classList.contains('drag-and-drop-code__code-gap')) {
      const droppedLineParentIdx = parseInt(droppedLineParent.attributes.getNamedItem('data-idx')?.value || '0')
      droppedLineCurrentGap = this.codeLineGapList[droppedLineParentIdx]
      droppedLineCurrentGap.content = null
    }

    this.codePool.appendChild(droppedLine.htmlElement)
  }

  drop (ev: DragEvent, idx: number) {
    if (ev.dataTransfer === null) {
      return
    }
    ev.preventDefault()
    ev.cancelBubble = true

    let gap = (ev.target as HTMLElement)
    if (!gap.classList.contains('drag-and-drop-code__code-gap')) {
      gap = gap.closest('.drag-and-drop-code__code-gap') as HTMLElement
      if (!gap) {
        return
      }
    }

    const lineId = parseInt(ev.dataTransfer.getData('lineId'))
    const droppedLine = this.codeLineList[lineId]
    const droppedLineParent = droppedLine.htmlElement.parentElement
    let droppedLineCurrentGap: CodeLineGap | null = null
    if (droppedLineParent && droppedLineParent.classList.contains('drag-and-drop-code__code-gap')) {
      const droppedLineParentIdx = parseInt(droppedLineParent.attributes.getNamedItem('data-idx')?.value || '0')
      droppedLineCurrentGap = this.codeLineGapList[droppedLineParentIdx]
      droppedLineCurrentGap.content = null
    }

    if (gap.children.length > 0) {
      if (droppedLineCurrentGap) {
        const droppedCodeLine = this.codeLineList.find(line => line.htmlElement === gap.children[0])
        droppedLineCurrentGap.content = droppedCodeLine || null
        droppedLineParent?.appendChild(gap.children[0])
      } else {
        this.codePool.appendChild(gap.children[0])
      }
    }

    gap.appendChild(droppedLine.htmlElement)
    this.codeLineGapList[idx].content = droppedLine
  }

  solutionState (): SolutionState {
    if (this.codeLineGapList.some(gap => !gap.content)) {
      return SolutionState.NOT_FINISHED
    }

    if (this.codeLineGapList.every(this.gapIsCorrect)) {
      this.$step?.score(this.goal as string)
      return SolutionState.CORRECT
    }

    return SolutionState.WRONG
  }

  gapIsCorrect (gap: CodeLineGap) {
    return gap.validContents.some(content => content === gap.content?.textContent)
  }

  showHints () {
    return this.solutionState() === SolutionState.WRONG
  }

  classModifierPerTextLength (textLength: number) {
    return textLength <= 15
      ? '_xs'
      : textLength <= 30
        ? '_s'
        : textLength <= 45
          ? '_m'
          : textLength <= 60
            ? '_l'
            : '_xl'
  }

  uid = Math.random().toString().replace('.', '')
}
</script>
<style scoped lang="scss">
@import '~/../scss/variables/colors.scss';
@import '~/../scss/variables/fonts.scss';

$XS_WIDTH: 160px;

.drag-and-drop-code {
  display: flex;
  flex-flow: column;

  &__code-pool-title,
  &__gaps-title {
    font-family: $plex-sans;
    font-weight: 600;
    margin: 15px 0;
  }
  &__config-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    min-height: 40px;
    margin-bottom: 10px;
  }
  :deep() .line {
    display: flex;
    align-items: center;

    min-height: 30px;
    padding: 0 15px;
    margin: 4px 8px 4px 0;

    font-family: $plex-mono;

    background-color: $background-color-white;
    border: 1px solid $border-color;

    &_xs { min-width: $XS_WIDTH; }
    &_s { min-width: $XS_WIDTH * 2; }
    &_m { min-width: $XS_WIDTH * 3; }
    &_l { min-width: $XS_WIDTH * 4; }
    &_xl { min-width: $XS_WIDTH * 5; }
  }
  &__gaps-container {
    padding: 20px 15px;
    background: $background-color-white;
    border: 1px solid $border-color;
  }
  &__code-gap {
    background: $background-color-lighter;
    border: 1px solid $border-color;
    margin: 5px 0 5px calc(var(--indentation, 0) * 30px);
    min-height: 32px;

    $extra-width: 2;

    &_xs { max-width: $XS_WIDTH + $extra-width; }
    &_s { max-width: $XS_WIDTH * 2 + $extra-width; }
    &_m { max-width: $XS_WIDTH * 3 + $extra-width; }
    &_l { max-width: $XS_WIDTH * 4 + $extra-width; }
    &_xl { max-width: $XS_WIDTH * 5 + $extra-width; }

    :deep() .line {
      margin: 0px;
      border: 0px;
      min-width: initial;
    }
  }
  &__gaps-container_show-hints &__code-gap_wrong {
    transition: border-color 1s cubic-bezier(0.5, 3, 0.5, -2) 1s;
    border-color: $status-color-wrong;
  }
  &__result-info {
    display: flex;
    align-items: center;
    justify-content: space-between;

    background: $background-color-white;
    border: 1px solid $border-color;

    &__text {
      display: flex;
      align-items: center;
      flex: 1;
      padding-left: 15px;
    }
    &__state-indicator {
      flex: 0 1 auto;
    }
  }
}
</style>
