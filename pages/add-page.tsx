import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import { Response } from "./api/nav"
import { Layout } from "~/lib/layout"
import { useState } from "react"

export const getStaticProps: GetStaticProps<Response> = async () => {
  const res = await fetch("http://localhost:4000/api/nav")
  const json = await res.json()
  return { props: json }
}

export default function Page({
  pages,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [value, setValue] = useState("")
  return (
    <Layout pages={pages}>
      <textarea
        className="form-control"
        placeholder="Enter notes here..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </Layout>
  )
}
