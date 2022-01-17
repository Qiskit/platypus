import { Widget } from '@lumino/widgets'
import { MathJaxTypesetter } from '@jupyterlab/mathjax2'
import { OutputArea, OutputAreaModel } from '@jupyterlab/outputarea'
import {
  // eslint-disable-next-line import/named
  IRenderMime,
  RenderMimeRegistry,
  standardRendererFactories
} from '@jupyterlab/rendermime'
import { IShellFuture } from '@jupyterlab/services/lib/kernel/kernel'
import { KernelMessage } from '@jupyterlab/services'
import { serverOptions } from './KernelManager'

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
          console.log('MathJax unavailable')
          return false
        }
      } else {
        return true
      }
    })
  }
  return _renderers
}

function createOutputArea (parent : HTMLDivElement) {
  let latexTypesetter: MathJaxTypesetter | undefined
  if (serverOptions.mathjaxUrl) {
    latexTypesetter = new MathJaxTypesetter({
      url: serverOptions.mathjaxUrl,
      config: serverOptions.mathjaxConfig
    })
  }

  const renderers = {
    initialFactories: getRenderers(serverOptions),
    latexTypesetter
  }
  const rendermime = new RenderMimeRegistry(renderers)

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
