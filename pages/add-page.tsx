import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import { Response } from "./api/nav"
import { Layout } from "~/lib/layout"
import { useCallback, useMemo, useState } from "react"
import { useRouter } from "next/router"
import { call } from "~/lib/api/call"
import isHotkey from "is-hotkey"
import React from "react"

export const getStaticProps: GetStaticProps<Response> = async () => {
  const res = await fetch("http://localhost:4000/api/nav")
  const json = await res.json()
  return { props: json }
}

const isModEnter = isHotkey("mod+enter")

export default function Page({
  pages,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [value, setValue] = useState("")
  const router = useRouter()
  async function submit() {
    const { id } = await call("add-page", { body: value })
    router.push(`/page/${id}`)
  }
  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (isModEnter(e)) {
    }
    console.log(e)
  }
  return (
    <Layout pages={pages}>
      <div className="text-right">
        <button className="btn btn-primary" onClick={submit}>
          Add page
        </button>
      </div>
      <div className="mt-2">
        <textarea
          onKeyDown={onKeyDown}
          autoFocus
          className="form-control"
          placeholder="Enter notes here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ height: "24em" }}
        />
      </div>
    </Layout>
  )
}
