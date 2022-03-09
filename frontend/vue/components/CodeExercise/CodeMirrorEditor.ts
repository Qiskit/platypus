import CodeMirror from 'codemirror/lib/codemirror'
import 'codemirror/lib/codemirror.css'

// HACK: The Vue component variables have a wrapper that cause CodeMirror to break.
const instances = new Map<any, any>()

export function createEditor (id: any, parentHTMLElment: HTMLElement) {
  const editor = CodeMirror(parentHTMLElment, {
    mode: 'python',
    lineNumbers: true,
    lineWrapping: false,
    autoRefresh: true
  })
  instances.set(id, editor)
  return editor
}

export function getEditor (id: any) {
  return instances.get(id)
}
