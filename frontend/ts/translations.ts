let translations: {[x:string]: string} = {}

export async function fetchTranslations (locale: string): Promise<{[x:string]: string}> {
  if (!Object.keys(translations).length) {
    translations = await fetch(`/locales/${locale}`)
      .then(res => {
        if (res && res.json) {
          return res.json()
        } else {
          return {}
        }
      })
  }
  return translations
}

export function loadTranslations () {
  if (!Object.keys(translations).length) {
    const elt = document.getElementById('translations')
    if (elt && elt.textContent) {
      translations = JSON.parse(elt.textContent)
    }
  }

  return translations
}

export function translate (str: string, args: string[] = []): string {
  let translated = translations?.[str] || str

  for (const [i, a] of args.entries()) {
    translated = translated.replace('$' + i, a)
  }

  return translated
}
