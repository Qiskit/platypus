const initLoader = function () {
  const page = document.querySelector('html')
  setTimeout(() => {
    page?.classList.remove('loading')
  }, 1500)
}

export {
  initLoader
}
