/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable require-await */
import * as pWidget from '@lumino/widgets'

import {
  RenderMimeRegistry,
  standardRendererFactories
} from '@jupyterlab/rendermime'
import { IKernelConnection } from '@jupyterlab/services/lib/kernel/kernel'
import { DocumentRegistry } from '@jupyterlab/docregistry'
import { INotebookModel } from '@jupyterlab/notebook'

import {
  WidgetManager as JupyterLabManager,
  WidgetRenderer,
  output
} from '@jupyter-widgets/jupyterlab-manager'

import * as base from '@jupyter-widgets/base'
import * as controls from '@jupyter-widgets/controls'
import { requireLoader } from '@jupyter-widgets/html-manager'

const WIDGET_MIMETYPE = 'application/vnd.jupyter.widget-view+json'

export class WidgetsManager extends JupyterLabManager {
  loader
  renderMime

  constructor (kernel: IKernelConnection) {
    const context = createContext(kernel)
    const rendermime = new RenderMimeRegistry({
      initialFactories: standardRendererFactories
    })
    const settings = {
      saveState: false
    }
    super(context, rendermime, settings)
    rendermime.addFactory(
      {
        safe: false,
        mimeTypes: [WIDGET_MIMETYPE],
        createRenderer: options => new WidgetRenderer(options, this)
      },
      1
    )

    this.renderMime = rendermime
    this._registerWidgets()
    this.loader = requireLoader
  }

  _registerWidgets () {
    this.register({
      name: '@jupyter-widgets/base',
      version: base.JUPYTER_WIDGETS_VERSION,
      exports: base as unknown as base.ExportData
    })
    this.register({
      name: '@jupyter-widgets/controls',
      version: controls.JUPYTER_CONTROLS_VERSION,
      exports: controls as unknown as base.ExportData
    })
    this.register({
      name: '@jupyter-widgets/output',
      version: output.OUTPUT_WIDGET_VERSION,
      exports: output as unknown as base.ExportData
    })
  }

  public async loadClass (className: string, moduleName: string, moduleVersion: string) {
    if (
      moduleName === '@jupyter-widgets/base' ||
      moduleName === '@jupyter-widgets/controls' ||
      moduleName === '@jupyter-widgets/output'
    ) {
      return super.loadClass(className, moduleName, moduleVersion)
    } else {
      // TODO: code duplicate from HTMLWidgetManager, consider a refactor
      return this.loader(moduleName, moduleVersion).then((module: { [x: string]: any }) => {
        if (module[className]) {
          return module[className]
        } else {
          return Promise.reject(
            'Class ' +
              className +
              ' not found in module ' +
              moduleName +
              '@' +
              moduleVersion
          )
        }
      })
    }
  }

  // eslint-disable-next-line camelcase
  async display_view (msg: any, view: any, options: { el: any }) {
    const el = options.el
    if (el) {
      pWidget.Widget.attach(view.pWidget, el)
    }
    return view.pWidget
  }
}

function createContext (kernel: IKernelConnection): DocumentRegistry.IContext<INotebookModel> {
  return {
    sessionContext: {
      session: {
        kernel,
        kernelChanged: {
          connect: () => {}
        }
      },
      kernelChanged: {
        connect: () => {}
      },
      statusChanged: {
        connect: () => {}
      },
      connectionStatusChanged: {
        connect: () => {}
      }
    },
    saveState: {
      connect: () => {}
    },
    model: {
      metadata: {
        get: () => {}
      }
    }
  } as unknown as DocumentRegistry.IContext<INotebookModel>
}
