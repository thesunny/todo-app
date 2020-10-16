import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import { Response } from "./api/nav"
import { call } from "~/lib/api/client"

export const getStaticProps: GetStaticProps<Response> = async () => {
  const response = await call("log", { reflect: true })
  return response
}

export default function Page(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  console.log(props)
  return <div>Hello</div>
}
