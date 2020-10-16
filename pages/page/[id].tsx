import {
  GetStaticProps,
  GetServerSideProps,
  InferGetStaticPropsType,
  InferGetServerSidePropsType,
  NextPage,
} from "next"
import { useEffect, useRef, useState } from "react"
import { Response as NavResponse } from "~/pages/api/nav"
import { PageViewResponse } from "~/pages/api/page/view"
import { Layout } from "~/lib/layout"
import { Client } from "~/lib/api/client"
import { useRouter } from "next/router"

export const getServerSideProps: GetServerSideProps<{
  pages: NavResponse["pages"]
  page: PageViewResponse["page"]
}> = async ({ params }) => {
  console.log(111)
  const { pages } = await Client.call<NavResponse>("nav")
  console.log(222)
  const id = parseInt((params as any).id)
  console.log(333, id)
  const { page } = await Client.call<PageViewResponse>("page/view", { id })
  console.log({ page, pages })
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
  useEffect(() => {
    return () => {
      if (savedValue.current !== currentValue.current) {
        Client.call("page/update", { id: page.id, body: currentValue.current })
      }
    }
  }, [])

  /**
   * Autosave timeout
   */
  useEffect(() => {
    if (savedValue.current === value) return
    currentValue.current = value
    const id = setTimeout(async () => {
      console.log("autosave after timeout")
      await Client.call("page/update", {
        id: page.id,
        body: currentValue.current,
      })
    }, 2000)
    return () => {
      clearTimeout(id)
    }
  }, [value])

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
      <textarea
        className="form-control"
        placeholder="Enter notes here..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ height: "24em" }}
      />
    </>
  )
}

export default function Page({
  page,
  pages,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout pages={pages} activePageId={page.id}>
      <PageView key={page.id} page={page} />
    </Layout>
  )
}
