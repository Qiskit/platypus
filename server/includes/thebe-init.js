
const initializeCodeCells = function () {
  thebelab.bootstrap()
  thebelab.on('status', function (evt, data) {
    console.log('Thebelab status changed:', data.status, data.message)
  })
  document
    .querySelectorAll('.thebelab-cell')
    .forEach((codeCell) => {
      codeCell.querySelector('.thebelab-restart-button').remove()
      codeCell.querySelector('.thebelab-restartall-button').remove()

      const codeCellRunButton = codeCell.querySelector('.thebelab-run-button')
      codeCellRunButton.setAttribute('data-test', 'code-cell-button-run')
      codeCellRunButton.textContent = 'Run'

      const codeCellBusyIndicator = codeCell.querySelector('.thebelab-busy')
      const busySpan = document.createElement('span')
      busySpan.classList.add('thebelab-busy-text')
      busySpan.textContent = 'Running'
      codeCellBusyIndicator.append(busySpan)
      codeCellRunButton.append(codeCellBusyIndicator)

      codeCell.setAttribute('data-test', 'code-cell')

      codeCell
        .querySelector('.thebelab-input')
        .setAttribute('data-test', 'code-cell-input')

      codeCell
        .querySelector('.jp-OutputArea')
        .setAttribute('data-test', 'code-cell-output')

      codeCell
        .querySelector('.CodeMirror-code')
        .setAttribute('data-test', 'code-cell-code')
    })

  /**
   * Copy to clipboard functionality.
   */
  document
    .querySelectorAll('.thebelab-cell')
    .forEach((thebelabCell, index) => {
      const codeCellId = `code-mirror-element-${index}`

      const clipboardCopyComponent = document.createElement(
        'q-code-mirror-clipboard-copy'
      )
      clipboardCopyComponent.setAttribute('target-id', codeCellId)
      thebelabCell.append(clipboardCopyComponent)

      const codeInput = document.createElement('input')
      codeInput.id = codeCellId
      thebelabCell.append(codeInput)

      /**
       * Create a copy of the CodeMirror cell's content adding line breaks.
       * The "copy to clipboard" functionality will copy the content from this
       * copy.
       */
      const codeElement = thebelabCell.querySelector('.CodeMirror-code')
      const codeLines = Array.from(
        codeElement.querySelectorAll('.CodeMirror-line')
      ).map(codeLine => codeLine.textContent)
      const formattedCode = codeLines.join('\n')
      codeInput.setAttribute('type', 'hidden')
      codeInput.setAttribute('value', formattedCode)
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
