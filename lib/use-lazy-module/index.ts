import React, { useEffect, useState } from "react"

import ReactDOM from "react-dom"

declare global {
  interface Window {
    lazyModuleContext: object
    // React_123: typeof React
    // lazyLoadedComponent: React.ComponentType<any>
    preloadedModule: any
  }
}

async function getModule(url: string, context: object) {
  if (window.preloadedModule != null) {
    return window.preloadedModule
  }
  const response = await fetch(url)
  const code = await response.text()
  window.lazyModuleContext = context
  const lib = eval(code)
  window.preloadedModule = lib
  return lib
}

type LazyModuleState<T extends object> =
  | { ready: false; module: undefined }
  | { ready: true; module: T }

export function useLazyModule<T extends object>(url: string, context: object) {
  const [state, setState] = useState<LazyModuleState<T>>({
    ready: false,
    module: undefined,
  })
  useEffect(() => {
    getModule(url, { React, ReactDOM }).then((module) => {
      setState({ ready: true, module })
    })
  }, [url])
  return state
}
