/**
 * Prevents the automatic translation of a given element.
 *
 * @param {Element} element
 */
function preventTranslation (element) {
  element.setAttribute('translate', 'no')
}

/**
 * Setup up the indicator that shows the code cell is running.
 *
 * @param {Element} runButton
 * @param {Element} busyStateIndicator
 */
function setupCodeRunningIndicator (runButton, busyStateIndicator) {
  const busySpan = document.createElement('span')

  busySpan.classList.add('thebelab-busy-text')
  busySpan.textContent = 'Running'

  busyStateIndicator.append(busySpan)
  runButton.append(busyStateIndicator)
}

/**
 * Set up Segment tracking when the code in a code cell is modified for the
 * first time.
 *
 * @param {CodeMirror} codeMirrorInstance
 * @param {number} codeCellIndex
 */
function setupCodeModifiedTracking (codeMirrorInstance, codeCellIndex) {
  const codeCellId = codeCellIndex + 1

  codeMirrorInstance.on('beforeChange', () => {
    if (codeMirrorInstance.isClean()) {
      window.textbook.trackUpdatedObject(
        'Code cell',
        `Code cell #${codeCellId}`
      )
    }
  })
}

/**
 * Set up Segment tracking when running the code in a code cell.
 *
 * @param {Element} runButton
 * @param {number} codeCellIndex
 */
function setupCodeRunningTracking (runButton, codeCellIndex) {
  const codeCellId = codeCellIndex + 1

  runButton.addEventListener('click', () => {
    window.textbook.trackClickEvent('Run', `Code cell #${codeCellId}`)
  })
}

/**
 * Set up the "copy to clipboard" functionality for a code cell.
 *
 * @param {Element} codeCell
 * @param {number} codeCellIndex
 * @param {NodeListOf<Element>} cellCodeLines
 */
function setupCopyToClipboard (codeCell, codeCellIndex, cellCodeLines) {
  const codeCellId = `code-mirror-element-${codeCellIndex}`

  const clipboardCopyComponent = document.createElement(
    'q-code-mirror-clipboard-copy'
  )
  clipboardCopyComponent.setAttribute('target-id', codeCellId)
  codeCell.append(clipboardCopyComponent)

  const codeInput = document.createElement('input')
  codeInput.id = codeCellId
  codeCell.append(codeInput)

  /**
   * Create a copy of the CodeMirror cell's content adding line breaks.
   * The "copy to clipboard" functionality will copy the content from this
   * copy.
   */
  const codeLines = Array.from(cellCodeLines).map(
    codeLine => codeLine.textContent
  )
  const formattedCode = codeLines.join('\n')
  codeInput.setAttribute('type', 'hidden')
  codeInput.setAttribute('value', formattedCode)
}

const initializeCodeCells = function () {
  thebelab.bootstrap()

  const codeCellSelector = '.thebelab-cell'

  document
    .querySelectorAll(codeCellSelector)
    .forEach((codeCell, codeCellIndex) => {
      const busyStateIndicator = codeCell.querySelector('.thebelab-busy')
      const cellCode = codeCell.querySelector('.CodeMirror-code')
      const cellCodeLines = cellCode.querySelectorAll('.CodeMirror-line')
      const cellInput = codeCell.querySelector('.thebelab-input')
      const cellOutput = codeCell.querySelector('.jp-OutputArea')
      const codeMirrorInstance = codeCell.querySelector('.CodeMirror').CodeMirror
      const restartButton = codeCell.querySelector('.thebelab-restart-button')
      const restartAllButton = codeCell.querySelector('.thebelab-restartall-button')
      const runButton = codeCell.querySelector('.thebelab-run-button')

      restartButton.remove()
      restartAllButton.remove()

      runButton.textContent = 'Run'

      codeCell.setAttribute('data-test', 'code-cell')
      cellCode.setAttribute('data-test', 'code-cell-code')
      cellInput.setAttribute('data-test', 'code-cell-input')
      cellOutput.setAttribute('data-test', 'code-cell-output')
      runButton.setAttribute('data-test', 'code-cell-button-run')

      preventTranslation(codeCell)
      setupCodeRunningIndicator(runButton, busyStateIndicator)
      setupCodeModifiedTracking(codeMirrorInstance, codeCellIndex)
      setupCodeRunningTracking(runButton, codeCellIndex)
      setupCopyToClipboard(codeCell, codeCellIndex, cellCodeLines)
    })
}

// check if Thebelab needs to be loaded
if (document.querySelector('[data-executable]')) {
  /**
   * Thebelab loads "reset CSS" after the theme styles load and so,
   * it invalidates part of the theme rules. To make the theme CSS to take
   * the correct precedence, we listen for Thebelab to finish loading, then
   * relocate the theme CSS and start Thebelab.
   */
  const thebelabScript = document.createElement('script')
  thebelabScript.src = 'https://unpkg.com/thebe@latest/lib/index.js'
  thebelabScript.async = true
  thebelabScript.onload = () => {
    setTimeout(() => {
      document.head.append(
        ...document.querySelectorAll('[data-style]')
      )
    })

    window.textbook.runAfterDOMLoaded(initializeCodeCells)
  }
  document.head.append(thebelabScript)
}

// Fix cursor positioning bug:
// wait until CSS fully loaded, then refresh codemirror
window.addEventListener("load", function(){
document.querySelectorAll('.CodeMirror').forEach((codeCell, codeCellIndex) =>
    codeCell.CodeMirror.refresh()
)});
