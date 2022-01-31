import { Widget } from '@lumino/widgets'
import { MathJaxTypesetter } from '@jupyterlab/mathjax2'
import { OutputArea, OutputAreaModel } from '@jupyterlab/outputarea'
import {
  // eslint-disable-next-line import/named
  IRenderMime,
  RenderMimeRegistry,
  standardRendererFactories
} from '@jupyterlab/rendermime'

import {
  WIDGET_MIMETYPE,
  WidgetRenderer
} from '@jupyter-widgets/html-manager/lib/output_renderers'
import { HTMLManager } from '@jupyter-widgets/html-manager'
import { IShellFuture, IKernelConnection } from '@jupyterlab/services/lib/kernel/kernel'
import { KernelMessage } from '@jupyterlab/services'
import { getWidgetsManager } from './KernelManager'

const outputOptions = {
  mathjaxUrl: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js',
  mathjaxConfig: 'TeX-AMS_CHTML-full,Safe'
}

interface IOutputShellFuture extends IShellFuture<KernelMessage.IExecuteRequestMsg, KernelMessage.IExecuteReplyMsg> { }

let _renderers: IRenderMime.IRendererFactory[]
function getRenderers (options: any) {
  if (!_renderers) {
    _renderers = standardRendererFactories.filter((f) => {
      // filter out latex renderer if mathjax is unavailable
      if (f.mimeTypes.includes('text/latex')) {
        if (options.mathjaxUrl) {
          return true
        } else {
          console.warn('MathJax unavailable')
          return false
        }
      } else {
        return true
      }
    })
  }
  return _renderers
}

function createOutputArea (parent: HTMLDivElement) {
  let latexTypesetter: MathJaxTypesetter | undefined
  if (outputOptions.mathjaxUrl) {
    latexTypesetter = new MathJaxTypesetter({
      url: outputOptions.mathjaxUrl,
      config: outputOptions.mathjaxConfig
    })
  }

  const renderers = {
    initialFactories: getRenderers(outputOptions),
    latexTypesetter
  }
  const rendermime = new RenderMimeRegistry(renderers)

  rendermime.addFactory(
    {
      safe: false,
      mimeTypes: [WIDGET_MIMETYPE],
      createRenderer: options => new WidgetRenderer(options, getWidgetsManager() as unknown as HTMLManager)
    },
    1
  )

  const model = new OutputAreaModel({ trusted: true })

  const outputArea = new OutputArea({ model, rendermime })

  Widget.attach(outputArea as OutputArea, parent)

  return outputArea
}

export {
  OutputArea,
  IOutputShellFuture,
  createOutputArea
}
