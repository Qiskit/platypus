declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'wc-wrapper';
declare module 'codemirror/lib/codemirror';
