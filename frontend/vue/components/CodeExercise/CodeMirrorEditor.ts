
import CodeMirror from 'codemirror/lib/codemirror'
import 'codemirror/lib/codemirror.css'

/**
 * Vue component variables has a wrapper. That wrapper causes
 * CodeMirror to break. This is a quick solution.
 * */
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
