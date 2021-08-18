let translations:{[x:string]: string} = {}

function translate (str: string, args: string[] = []): string {
  let translated = translations?.[str] || str

  for (const [i, a] of args.entries()) {
    translated = translated.replace('$' + i, a)
  }

  return translated
}

function install (app: any, options: any = {}) {
  translations = options?.translations || {}

  app.config.globalProperties.$translate = (str: string, args: string[] = []) => {
    return translate(str, args)
  }
}

export {
  install
}
