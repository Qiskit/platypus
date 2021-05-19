import { createApp, h, Component, CreateAppFunction, App } from 'vue'

import { Step, StepComponent } from '@mathigon/studio'
import { HTMLBaseView } from '@mathigon/boost'
import * as segmentPlugin from '../../plugins/segmentAnalytics'
import wrapper from './index'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $step: Step;
  }
}

interface ICustomElement extends HTMLElement {
  _wrapper: App;
}

const createAppWithPlugins: CreateAppFunction<Element> = (rootComponent: Component, rootProps?: Record<string, unknown> | null) => {
  return createApp(rootComponent, rootProps)
    .use(segmentPlugin)
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

export default function wrap (component: Component) {
  return wrapper(component, createAppWithPlugins, h, { connectedCallback })
}
