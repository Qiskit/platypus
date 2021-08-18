let translations: object

export async function getTranslations (locale: string): Promise<object> {
  if (!translations) {
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
