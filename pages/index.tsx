import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import { Response } from "./api/nav"
import { Layout } from "~/lib/layout"
import { Client } from "~/lib/api/client"

export const getStaticProps: GetStaticProps<Response> = async () => {
  const props = await Client.call<Response>("nav")
  return { props }
}

export default function Page({
  pages,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <Layout pages={pages}>Page</Layout>
}
