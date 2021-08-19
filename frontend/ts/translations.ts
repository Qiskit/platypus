const fetchTranslations = function (locale: string): Promise<{[x:string]: string}> {
  return fetch(`/locales/${locale}`)
    .then(res => {
      return res?.json ? res.json() : {}
    })
}

const loadTranslations = function () {
  const elt = document.getElementById('translations')
  return elt?.textContent ? JSON.parse(elt.textContent) : {}
}

const translate = function (str: string, args: string[] = [], translations?: any): string {
  const translator = translations || window.textbook.translations
  let translated = translator?.[str] || str

  args.forEach((newValue, index) => {
    translated = translated.replace('$' + index, newValue)
  })

  return translated
}

export {
  fetchTranslations,
  loadTranslations,
  translate
}
