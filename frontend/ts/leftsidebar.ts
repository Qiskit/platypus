const hiddenPanelClass = 'qv-layout__panel--hidden'
const mobileBreakpoint = 672;
let parentContainer = null

const collapseMobileMenu = function () {
  if (parentContainer) {
    const w = document.documentElement.clientWidth
    const h = document.documentElement.clientHeight
    if (w < mobileBreakpoint) {
      parentContainer.classList.add(hiddenPanelClass)
    }
  }
}

const initLeftSidebar = function () {
  // toggle left-side menu
  const headerToggle = document.getElementById('app-panel-header-toggle')
  const footerToggle = document.getElementById('app-panel-footer-toggle')
  const menuToggles = [headerToggle, footerToggle]
  parentContainer = document.getElementsByClassName('qv-layout')[0]

  menuToggles.filter(item => !!item).forEach(item => {
    item.addEventListener('click', () => {

      if(parentContainer.classList.contains(hiddenPanelClass)) {
        parentContainer.classList.remove(hiddenPanelClass)
      } else {
        parentContainer.classList.add(hiddenPanelClass)
      }
    })
  })

  // ensure mobile menus are collapsed
  const docClientWidth = document.documentElement.clientWidth
  
  if(docClientWidth < mobileBreakpoint) {
    parentContainer.classList.add(hiddenPanelClass)
  }

  window.addEventListener('resize', collapseMobileMenu)
}

export {
  initLeftSidebar
}
