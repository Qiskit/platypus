const initLoader = () => {
  const stateCheck = setInterval(() => {
    if (document.readyState === 'complete') {
      clearInterval(stateCheck)
      const page = document.querySelector('html')
      page?.classList.remove('loading')
    }
  }, 100)
}

export {
  initLoader
}
