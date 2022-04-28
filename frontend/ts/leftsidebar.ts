import { BXDropdown } from "carbon-web-components"

const hiddenPanelClass = 'c-textbook__sidebar--hidden'
const mobileBreakpoint = 1056
let parentContainer = null
let bxDropdown = null

const collapseMobileMenu = function () {
  parentContainer = document.getElementsByClassName('c-textbook')[0]
  if (parentContainer) {
    const w = document.documentElement.clientWidth
    const h = document.documentElement.clientHeight
    if (w < mobileBreakpoint) {
      parentContainer.classList.add(hiddenPanelClass)
    }
  }
}

const languageDropDown = (() => {
  let bxDropdown: BXDropdown | undefined

  return () => {
    if (!bxDropdown) {
      bxDropdown = document.getElementsByClassName('language-selector__dropdown')[0] as BXDropdown
    }
    return bxDropdown
  }
})()

const initLeftSidebar = function () {
  // toggle left-side menu
  const headerToggle = document.getElementById('app-panel-header-toggle')
  const footerToggle = document.getElementById('app-panel-footer-toggle')
  const menuToggles = [headerToggle, footerToggle]
  parentContainer = document.getElementsByClassName('c-textbook')[0]

  menuToggles.filter(item => !!item).forEach((item) => {
    item.addEventListener('click', () => {
      if (parentContainer.classList.contains(hiddenPanelClass)) {
        parentContainer.classList.remove(hiddenPanelClass)
      } else {
        languageDropDown().open = false
        parentContainer.classList.add(hiddenPanelClass)
      }
    })
  })

  // ensure mobile menus are collapsed
  const docClientWidth = document.documentElement.clientWidth

  if (docClientWidth < mobileBreakpoint) {
    parentContainer?.classList?.add(hiddenPanelClass)
  }

  // prevent mobile resizing
  let windowInnerWidth = window.innerWidth
  window.addEventListener('resize', () => {
    if (windowInnerWidth !== window.innerWidth) {
      windowInnerWidth = window.innerWidth
      collapseMobileMenu()
    }
  })
}

const toggleLanguagePicker = function () {
  const languageToggle = document.getElementById('app-panel-language-toggle')
  parentContainer = document.getElementsByClassName('c-textbook')[0]

  languageToggle?.addEventListener('click', () => {
    parentContainer.classList.remove(hiddenPanelClass)
    languageDropDown().open = true
  })
}

export {
  initLeftSidebar,
  toggleLanguagePicker
}
