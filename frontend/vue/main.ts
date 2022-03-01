import { QiskitBanner } from '@qiskit-community/qiskit-vue'
import wrapper from './wc-wrapper/platypusWrapper'

import CodeMirrorClipboardCopy from './components/CodeMirrorClipboardCopy/CodeMirrorClipboardCopy.vue'
import TheMenu from './components/TheMenu/index.vue'
import MobileMenu from './components/TheMenu/MobileMenu.vue'
import WhatIsQuantumVolume from './components/WhatIsQuantumVolume/WhatIsQuantumVolume.vue'
import LayersCircuit from './components/WhatIsQuantumVolume/LayersCircuit.vue'
import DragAndDropCode from './components/DragAndDropCode/DragAndDropCode.vue'
import EndUserLicenseAgreementLayout from './components/UserAccount/EndUserLicenseAgreementLayout.vue'
import Carousel from './components/Carousel/Carousel.vue'
import MiniComposer from './components/MiniComposer/MiniComposer.vue'
import Quiz from './components/Quiz/Quiz.vue'
import AppCta from './components/common/AppCta.vue'
import ContentMenu from './components/common/ContentMenu.vue'
import LanguageSelector from './components/common/LanguageSelector.vue'
import UtilityPanel from './components/UtilityPanel/UtilityPanel.vue'
import UtilityPanelHeader from './components/UtilityPanel/UtilityPanelHeader.vue'
import UtilityPanelDropdown from './components/UtilityPanel/UtilityPanelDropdown.vue'
import UtilityPanelContent from './components/UtilityPanel/UtilityPanelContent.vue'
import LessonNotes from './components/UtilityPanel/LessonNotes.vue'
import UniversalGlossary from './components/UtilityPanel/UniversalGlossary.vue'
import EmptyPanel from './components/UtilityPanel/EmptyPanel.vue'
import Binary from './components/Binary/Binary.vue'
import BinaryTile from './components/Binary/BinaryTile.vue'
import SignIn from './components/SignIn/SignIn.vue'
import UserAccountLayout from './components/UserAccount/UserAccountLayout.vue'
import AmplitudeDisk from './components/AmplitudeDisk/AmplitudeDisk.vue'
import AmplitudeDiskWithValues from './components/AmplitudeDisk/AmplitudeDiskWithValues.vue'
import AmplitudeAdditionDisk from './components/AmplitudeDisk/AmplitudeAdditionDisk.vue'
import AmplitudeAdditionDiskWithValues from './components/AmplitudeDisk/AmplitudeAdditionDiskWithValues.vue'
import AmplitudeAdditionWidget from './components/AmplitudeDisk/AmplitudeAdditionWidget.vue'
import StatevectorAmplitudeEncoding from './components/Statevector/StatevectorAmplitudeEncoding.vue'
import StatevectorBinaryEncoding from './components/Statevector/StatevectorBinaryEncoding.vue'
import CodeExercise from './components/CodeExercise/CodeExercise.vue'
import EigenvectorWidget from './components/Eigenvector/EigenvectorWidget.vue'
import SyllabusLayout from './components/UserAccount/SyllabusLayout.vue'
import SyllabusCreateLayout from './components/UserAccount/SyllabusCreateLayout.vue'

declare global {
  interface Window {
    textbook: any
  }
}

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
  LanguageSelector,
  TheMenu,
  MobileMenu,
  LayersCircuit,
  WhatIsQuantumVolume,
  DragAndDropCode,
  EndUserLicenseAgreementLayout,
  Carousel,
  Quiz,
  UtilityPanel,
  UtilityPanelDropdown,
  UtilityPanelContent,
  UtilityPanelHeader,
  LessonNotes,
  UniversalGlossary,
  EmptyPanel,
  MiniComposer,
  Binary,
  BinaryTile,
  SignIn,
  UserAccountLayout,
  AmplitudeDisk,
  AmplitudeDiskWithValues,
  AmplitudeAdditionDisk,
  AmplitudeAdditionDiskWithValues,
  AmplitudeAdditionWidget,
  StatevectorAmplitudeEncoding,
  StatevectorBinaryEncoding,
  SyllabusLayout,
  SyllabusCreateLayout,
  CodeExercise,
  EigenvectorWidget
}

Object.keys(components).forEach((c) => {
  const CustomElement = wrapper(components[c])
  window.customElements.define(`q-${kebabize(c)}`, CustomElement)
})
