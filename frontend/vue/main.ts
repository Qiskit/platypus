import { QiskitBanner } from '@qiskit-community/qiskit-vue'
import wrapper from './wc-wrapper/platypusWrapper'

import CodeMirrorClipboardCopy from './components/CodeMirrorClipboardCopy/CodeMirrorClipboardCopy.vue'
import TheMenu from './components/TheMenu/index.vue'
import MobileMenu from './components/TheMenu/MobileMenu.vue'
import WhatIsQuantumVolume from './components/WhatIsQuantumVolume/WhatIsQuantumVolume.vue'
import LayersCircuit from './components/WhatIsQuantumVolume/LayersCircuit.vue'
import DragAndDropCode from './components/DragAndDropCode/DragAndDropCode.vue'
import Carousel from './components/Carousel/Carousel.vue'
import MiniComposer from './components/MiniComposer/MiniComposer.vue'
import Quiz from './components/Quiz/Quiz.vue'
import AppCta from './components/common/AppCta.vue'
import ContentMenu from './components/common/ContentMenu.vue'
import UtilityPanel from './components/UtilityPanel/UtilityPanel.vue'
import UtilityPanelHeader from './components/UtilityPanel/UtilityPanelHeader.vue'
import UtilityPanelDropdown from './components/UtilityPanel/UtilityPanelDropdown.vue'
import UtilityPanelContent from './components/UtilityPanel/UtilityPanelContent.vue'
import LessonNotes from './components/UtilityPanel/LessonNotes.vue'
import UniversalGlossary from './components/UtilityPanel/UniversalGlossary.vue'
import EmptyPanel from './components/UtilityPanel/EmptyPanel.vue'

const kebabize = (str:string) => {
  return str.split('').map((letter:string, idx:number) => {
    return letter.toUpperCase() === letter
      ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
      : letter
  }).join('')
}

const components: any = {
  QiskitBanner,
  AppCta,
  CodeMirrorClipboardCopy,
  ContentMenu,
  TheMenu,
  MobileMenu,
  LayersCircuit,
  WhatIsQuantumVolume,
  DragAndDropCode,
  Carousel,
  Quiz,
  UtilityPanel,
  UtilityPanelDropdown,
  UtilityPanelContent,
  UtilityPanelHeader,
  LessonNotes,
  UniversalGlossary,
  EmptyPanel,
  MiniComposer
}

Object.keys(components).forEach((c) => {
  const CustomElement = wrapper(components[c])
  window.customElements.define(`q-${kebabize(c)}`, CustomElement)
})
