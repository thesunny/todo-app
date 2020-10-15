import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import { Response } from "./api/nav"
import { Layout } from "~/lib/layout"
import { call } from "~/lib/api/call"

export const getStaticProps: GetStaticProps<Response> = async () => {
  const props = await call("nav")
  return { props }
}

export default function Page({
  pages,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <Layout pages={pages}>Page</Layout>
}
