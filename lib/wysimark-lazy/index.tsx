import React, { useRef } from "react"

import { useExternalModule } from "~/lib/external-module"

type UseWysimarkReturnValue = {
  initialMarkdown: string
  getMarkdownRef: React.MutableRefObject<(() => string) | undefined>
  getMarkdown: () => string
}

export function useWysimark(initialMarkdown: string): UseWysimarkReturnValue {
  const getMarkdownRef = useRef<() => string>()

  function getMarkdown() {
    if (getMarkdownRef.current == null) {
      throw new Error("Expected getMarkdownRef.current to have a value")
    }
    return getMarkdownRef.current()
  }

  return { getMarkdownRef, getMarkdown, initialMarkdown }
}

export function Wysimark({
  wysimark,
  height = 240,
}: {
  wysimark: UseWysimarkReturnValue
  height?: number
}) {
  const external = useExternalModule<any>(
    "http://localhost:3000/build/wysimark.js",
    "__wysimark__"
  )
  if (external.ready) {
    const { Wysimark } = external.module
    return (
      <Wysimark
        getMarkdownRef={wysimark.getMarkdownRef}
        initialMarkdown={wysimark.initialMarkdown}
        height={height}
      />
    )
  } else {
    return <div style={{ ...style, height }} />
  }
}

const style = {
  border: "1px solid silver",
  borderRadius: 4,
  padding: 10,
  boxSizing: "border-box",
} as const
