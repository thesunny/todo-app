import {
  GetStaticProps,
  GetServerSideProps,
  InferGetStaticPropsType,
  InferGetServerSidePropsType,
  NextPage,
} from "next"
import { useEffect, useRef, useState } from "react"
import { NavMethod } from "~/pages/api/nav"
import { PageViewResponse } from "~/pages/api/page/view"
import { Layout } from "~/lib/layout"
import { Client } from "~/lib/api/client"
import { useRouter } from "next/router"
import * as s from "superstruct"
import React from "react"
import ReactDOM from "react-dom"
// import { useLazyModule } from "~/lib/use-lazy-module"
import { useWysimark, Wysimark } from "~/lib/wysimark-lazy"

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { pages } = await Client.call<NavMethod>("nav", {})
//   const id = parseInt((params as any).id)
//   const { page } = await Client.call<PageViewResponse>("page/view", { id })
//   return { props: { page, pages } }
// }

// export default function Page({
//   page,
//   pages,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//   return (
//     <Layout pages={pages} activePageId={page.id}>
//       <PageView key={page.id} page={page} />
//     </Layout>
//   )
// }

export const getServerSideProps = Client.getServerSideProps(
  async ({ params }) => {
    const { pages } = await Client.call<NavMethod>("nav", {})
    // const id = parseInt((params as any).id)

    const id = s.coerce((params as any).id, StringToInt)
    const { page } = await Client.call<PageViewResponse>("page/view", { id })
    return { props: { page, pages } }
  }
)

const StringToInt = s.coercion(s.number(), (value) => {
  if (typeof value !== "string") throw new Error("value must be a string")
  return parseInt(value)
})

export default Client.Page<typeof getServerSideProps>(function Page({
  page,
  pages,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout pages={pages} activePageId={page.id}>
      <PageView key={page.id} page={page} />
    </Layout>
  )
})

function PageView({ page }: { page: any }) {
  const wysimark = useWysimark(page.body)
  const router = useRouter()

  /**
   * Autosave navigate away
   */
  useEffect(() => {
    return () => {
      const markdown = wysimark.getMarkdown()
      if (markdown !== page.body) {
        Client.call("page/update", { id: page.id, body: markdown })
      }
    }
  }, [])

  /**
   * Autosave timeout
   */
  // useEffect(() => {
  //   if (savedValue.current === value) return
  //   currentValue.current = value
  //   const id = setTimeout(async () => {
  //     console.log("autosave after timeout")
  //     await Client.call("page/update", {
  //       id: page.id,
  //       body: currentValue.current,
  //     })
  //   }, 2000)
  //   return () => {
  //     clearTimeout(id)
  //   }
  // }, [value])

  /**
   * Delete page
   */
  async function deletePage() {
    Client.call("page/delete", { id: page.id })
    router.push("/")
  }

  return (
    <>
      <div className="text-right mb-2">
        <button className="btn btn-outline-danger" onClick={deletePage}>
          <i className="fa fa-trash mr-2" />
          Delete
        </button>
      </div>
      <Wysimark wysimark={wysimark} />
    </>
  )
}
