import { useEffect, useState } from "react"
import React from "react"
import ReactDOM from "react-dom"

/**
 * Where the cached modules are stored
 */
declare global {
  interface Window {
    __externalModule_cache__?: { [key: string]: any }
    __externalModule_context__: {
      React: typeof React
      ReactDOM: typeof ReactDOM
    }
  }
}

/**
 * Loads a JavaScript file asynchronously.
 *
 * The file should be an IIFE that assigns a value to the `window` object.
 *
 * Our current practice is to use rollup config where `format: "iife"` and we
 * set `name: "THE_MODULE_KEY"` which is passed in as the second argument.
 *
 * From the library file, we also export a type named something like
 * `MyNameModule` which is passed in as the generic to this `loadModule`
 * method so we know what types we are getting.
 *
 * @param url URL to a .js file where the module is loaded from
 * @param moduleKey The `name` in the `window` namespace to grab the module from
 */
export function loadExternalModule<T>(
  url: string,
  moduleKey: string
): Promise<T> {
  /**
   * Make sure there is a cache object
   */
  if (typeof window.__externalModule_cache__ === "undefined") {
    window.__externalModule_context__ = { React, ReactDOM }
    window.__externalModule_cache__ = {}
  }
  /**
   * If the module is in the cache, return it right away
   */
  const maybeModule = window.__externalModule_cache__[url]
  if (maybeModule) {
    return Promise.resolve<T>(maybeModule)
  }
  const script = document.createElement("script")
  script.src = url
  script.id = "dynamic_hello"
  document.body.appendChild(script)
  return new Promise<T>((resolve, reject) => {
    script.onload = () => {
      console.log(1)
      const mod = (window as any)[moduleKey] as T
      if (mod == null) {
        console.error(
          `Loaded script ${JSON.stringify(
            url
          )} but it did not set window.${moduleKey}`
        )
        return
      }
      console.log(2)
      console.log(mod)
      console.log(window)
      resolve(mod)
    }
  })
}

/**
 * The return type of useExternalModule created as a discriminated union so
 * we know that when `ready` is `true` that `module` is defined.
 */
type UseExternalModuleReturnType<T> =
  | { ready: true; module: T }
  | { ready: false; module: undefined }

/**
 * Loads a module from a URL. The module will define a variable in the window
 * namespace.
 *
 * When the module has been loaded, we grab the variable from the window
 * namespace and return it.
 *
 * It also returns a `ready` state. If the module is ready, you know that
 * the `module` property is defined in the return value.
 *
 * @param url URL to a .js file where the module is loaded from
 * @param moduleKey The `name` in the `window` namespace to grab the module from
 */
export function useExternalModule<T>(
  url: string,
  moduleKey: string
): UseExternalModuleReturnType<T> {
  const [rt, setState] = useState<UseExternalModuleReturnType<T>>({
    ready: false,
    module: undefined,
  })
  useEffect(() => {
    loadExternalModule<T>(url, moduleKey).then(function (mod) {
      setState({ ready: true, module: mod })
    })
  }, [])
  return rt
}
