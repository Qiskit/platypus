
let notations = {}

const injectTooltip = function (eq, target) {
  if (eq) {
    target.classList.add('q-math-notation')

    // create Tooltip structure
    const tooltip = document.createElement('div')
    const tooltipContent = document.createElement('div')
    tooltip.appendChild(tooltipContent);
    tooltip.className += 'qv-tooltip'
    tooltipContent.className += 'qv-tooltip__content'

    // add tooltip data
    tooltipContent.innerHTML = ''
    if (eq.say) {
      tooltipContent.innerHTML += `
        <h3 class="qv-tooltip__title">How to read this:</h3>
        <p>${eq.say}</p>
      `
    }
    if (eq.meaning) {
      tooltipContent.innerHTML += `
        <h3 class="qv-tooltip__title">What it means:</h3><p>
          ${eq.meaning}</p>
        `
    }
    if (eq.type) {
      tooltipContent.innerHTML += `
        <h3 class="qv-tooltip__title">Type:</h3><p>
          ${eq.type}</p>
        `
    }

    target.appendChild(tooltip)
  }
}

const loadNotations = function () {
  if (!Object.keys(notations).length) {
    const elt = document.getElementById('notations')
    if (elt && elt.textContent) {
      notations = JSON.parse(elt.textContent)
    }
  }

  return notations
}

const initNotations = function () {
  loadNotations()
  for (const key in notations) {
    const target = document.getElementById(key)
    if (target) {
      injectTooltip(notations[key], target)
    } else {
      const targets = document.querySelectorAll(`mjx-container .${key}`)
      for (let t of targets) {
        injectTooltip(notations[key], t)
      }
    }
  }
}

export {
  loadNotations,
  initNotations
}
