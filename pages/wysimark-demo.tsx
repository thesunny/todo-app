import { Node } from "slate"
import React from "react"
import ReactDOM from "react-dom"
import { WysimarkModule } from "~/wysimark"
import styled from "@emotion/styled"
import { useLazyModule } from "~/lib/use-lazy-module"

const $Div = styled.div`
  max-width: 640px;
`

const initialValue: Node[] = [
  {
    type: "heading",
    level: 1,
    children: [{ text: "Title" }],
  },
  {
    type: "p",
    children: [{ text: "Lorem ipsum dolar sit amet consecteteur." }],
  },
]

export default function () {
  const lazyModule = useLazyModule<WysimarkModule>(
    "http://localhost:3000/build/wysimark.js",
    {
      React,
      ReactDOM,
    }
  )

  if (!lazyModule.ready) {
    return (
      <>
        <$Div style={{ height: 320 }}></$Div>
        <button>Submit</button>
      </>
    )
  }
  const { Wysimark } = lazyModule.module
  return (
    <>
      <$Div>
        <Wysimark initialValue={initialValue} height={320} />
      </$Div>
      <button>Submit</button>
    </>
  )
}
