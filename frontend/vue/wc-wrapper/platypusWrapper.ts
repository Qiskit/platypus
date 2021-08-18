import { createApp, h, Component, CreateAppFunction, App } from 'vue'

import { Step, StepComponent } from '@mathigon/studio'
import { HTMLBaseView } from '@mathigon/boost'
import * as i18nPlugin from '../../plugins/i18nStrings'
import * as segmentPlugin from '../../plugins/segmentAnalytics'
import wrapper from './index'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $step: Step;
    $trackClickEvent: (cta: string, location: string) => void;
    $trackPage: (title: string) => void;
    $translate: (str: string, args: string[]) => string
  }
}

interface ICustomElement extends HTMLElement {
  _wrapper: App;
}

let translations = {}

const createAppWithPlugins: CreateAppFunction<Element> = (rootComponent: Component, rootProps?: Record<string, unknown> | null) => {
  return createApp(rootComponent, rootProps)
    .use(segmentPlugin)
    .use(i18nPlugin, { translations })
}

class VueWidgetView extends HTMLBaseView<ICustomElement> implements StepComponent {
  setup ($step: Step /*, goal: string, initialData?: UserData | undefined */) {
    const app = this._el._wrapper
    app.config.globalProperties.$step = $step
  }
}

function connectedCallback (): void {
  // @ts-ignore "this" is the CustomElement from wrapper function.
  const self: ICustomElement = this

  // eslint-disable-next-line no-new
  new VueWidgetView(self)
}

export default function wrap (component: Component, options: any = {}) {
  translations = options?.translations || {}
  return wrapper(component, createAppWithPlugins, h, { connectedCallback })
}
