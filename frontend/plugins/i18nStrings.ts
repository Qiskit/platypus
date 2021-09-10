import { translate } from '../ts/translations'

const install = function (app: any, options?: any) {
  app.config.globalProperties.$translate = (str: string, args?: string[]) => translate(str, args, options?.translations)
}

export {
  install
}
