import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import { useEffect, useRef, useState } from "react"
import { Response } from "~/pages/api/nav"
import { Layout } from "~/lib/layout"
import { call } from "~/lib/api/call"
import { useRouter } from "next/router"

export const getServerSideProps: GetStaticProps<Response> = async ({
  params,
}) => {
  const { pages } = await call("nav")
  const id = parseInt((params as any).id)
  const { page } = await call("page", { id })
  return { props: { page, pages } }
}

function PageView({ page }: { page: any }) {
  const [value, setValue] = useState(page.body)
  const currentValue = useRef(page.body)
  const savedValue = useRef(page.body)
  const router = useRouter()

  /**
   * Autosave navigate away
   */
  // useEffect(() => {
  //   return () => {
  //     if (savedValue.current !== currentValue.current) {
  //       console.log("autosave navigate away")
  //       call("update-page", { id: page.id, body: currentValue.current })
  //     }
  //   }
  // }, [])

  useEffect(() => {
    console.log("set nav away")
    router.beforePopState((e) => {
      console.log(1, e)
      if (savedValue.current === currentValue.current) return true
      console.log(2)
      console.log("autosave navigate away")
      call("update-page", { id: page.id, body: currentValue.current })
      return false
    })
  }, [])

  /**
   * Autosave timeout
   */
  useEffect(() => {
    if (savedValue.current === value) return
    currentValue.current = value
    const id = setTimeout(async () => {
      console.log("autosave after timeout")
      await call("update-page", { id: page.id, body: currentValue.current })
    }, 2000)
    return () => {
      clearTimeout(id)
    }
  }, [value])

  return (
    <textarea
      className="form-control"
      placeholder="Enter notes here..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      style={{ height: "24em" }}
    />
  )
}

export default function Page({
  page,
  pages,
}: InferGetStaticPropsType<typeof getServerSideProps>) {
  return (
    <Layout pages={pages} activePageId={page.id}>
      <PageView key={page.id} page={page} />
    </Layout>
  )
}
