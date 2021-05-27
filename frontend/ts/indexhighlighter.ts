const threshold = 1
const windowTriggerMargins = '-50px 0px -66% 0px'

let activeSectionId = ''

const onActiveSectionChanged = function (prevSectionId: string, nextSectionId: string) {
  const prevSectionLink = document.querySelector('a.c-sidebar__entry.c-sidebar__entry--progress') as HTMLAnchorElement
  const nextSectionLink = document.querySelector(`a.c-sidebar__entry[href="#${nextSectionId}"]`) as HTMLAnchorElement
  const activeClass = ' c-sidebar__entry--active c-sidebar__entry--progress '

  if (nextSectionLink) {
    if (prevSectionLink) {
      prevSectionLink.className = (prevSectionLink.className.replace(activeClass, ''))
    }
    nextSectionLink.className += activeClass

    const linkOffset = nextSectionLink.offsetTop
    const sectionId = window.textbook?.course?.section
    const connection = document.querySelector(`[data-section-id="${sectionId}"] .connection--progress`) as HTMLDivElement
    if (connection) {
      connection.style.height = `${linkOffset}px`
    }
  }
}

const onSectionVisibility = function (entries: Array<IntersectionObserverEntry>) {
  let highestTopValue = Infinity

  entries.forEach((entry) => {
    const { target, boundingClientRect, rootBounds } = entry

    if (rootBounds) {
      const targetTop = boundingClientRect.top
      const triggerWindowBottom = rootBounds.bottom
      const onTop = targetTop >= 0 && targetTop <= triggerWindowBottom

      if (onTop && targetTop < highestTopValue) {
        if (target.id && activeSectionId !== target.id) {
          onActiveSectionChanged(activeSectionId, target.id)
          activeSectionId = target.id
        }
        highestTopValue = targetTop
      }
    }
  })
}

const initIndexHighlight = function () {
  const observer = new IntersectionObserver(
    onSectionVisibility,
    {
      root: null,
      rootMargin: windowTriggerMargins,
      threshold
    }
  )

  document.querySelectorAll(':is(h1, h2, h3, h4) > a[id]')
    .forEach((section) => {
      (observer as IntersectionObserver).observe(section)
    })
  
  window.addEventListener('beforeunload', function (e) {
    observer && observer.disconnect()
  })
}

export {
  initIndexHighlight
}
