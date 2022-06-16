const initializeCodeCells = function () {
  document.querySelectorAll('.code-exercise').forEach((codeCell, index) => {
    const runButtonElement = codeCell.querySelector('.exercise-actions-bar__button_run')
    console.log(runButtonElement, "runButtonElement")
    setupCodeRunningTracking(runButtonElement, index)
  })
}

function setupCodeRunningTracking (runButtonElement, codeCellIndex) {
  const codeCellId = codeCellIndex + 1

  runButtonElement.addEventListener('click', () => {
    window.textbook.trackClickEvent('Run', `Code cell #${codeCellId}`)
  })
}

window.textbook.runAfterDOMLoaded(initializeCodeCells)
