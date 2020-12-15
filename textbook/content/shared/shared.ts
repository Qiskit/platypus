// =============================================================================
// Shared Qiskit Scripts
// =============================================================================


import {loadScript} from '@mathigon/boost';

declare global {
  interface Window {
    Juniper: any;
    textbook: any;
  }
}

const setUserProgress = function (step: any, progress: number) {
  const course = step.$course
  course.$progress.setProgress(progress)

  const data = JSON.parse(`{"${course.id}": {"steps": {"${step.id}": []}, "progress": {"${window.textbook.sectionId}": ${progress}}}}`)
  data[course.id].steps[step.id] = Array.from(step.scores)

  let active = course.$activeStep;
  try {
    active = course.$steps[course.$steps.indexOf(course.$activeStep) + 1]
  } catch(e) { }
  data[course.id].activeStep = {}
  data[course.id].activeStep[window.textbook.sectionId] = active.id
  // data.activeStep = active.id

  window.textbook.storeUserData(data)
}

export function qiskitScore (step: any, scoreArgs:[any]): void {
  step.score(...scoreArgs)
  const course = step.$course

  if (course.isReady) {
    const scoresCount = course.$steps.reduce((a:number, c:any) => a + c.scores.size, 0)
    const goalsCount = +course.data.goals
    const progress = (scoresCount / goalsCount) || 0

    setUserProgress(step, progress)
  }
}