import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next"
import { NavMethod } from "./api/nav"
import { Layout } from "~/lib/layout"
import { Client } from "~/lib/api/client"

const Test = {
  getServerSideProps<T>(
    fn: (context: Parameters<GetServerSideProps<T>>[0]) => Promise<{ props: T }>
  ) {
    const returnedFn: GetServerSideProps<T> = async function (context) {
      const response = await fn(context)
      return response
    }
    return returnedFn
  },

  Page<T>(fn: (props: InferGetServerSidePropsType<T>) => any) {
    return fn
  },
}

// namespace Test {
//   export function getServerSideProps<T>(
//     fn: (context: Parameters<GetServerSideProps<T>>[0]) => Promise<{ props: T }>
//   ) {
//     const returnedFn: GetServerSideProps<T> = async function (context) {
//       const response: T = (await fn(context)).props
//       return response
//     }
//     return returnedFn
//   }

//   export function Page<T>(fn: (props: InferGetServerSidePropsType<T>) => any) {
//     return fn
//   }
// }

export const getServerSideProps = Client.getServerSideProps(async () => {
  const props = await Client.call<NavMethod>("nav", {})
  return { props }
})

export default Client.Page<typeof getServerSideProps>(({ pages }) => {
  return <Layout pages={pages}>Page</Layout>
})

// export const getServerSideProps: GetServerSideProps = async () => {
//   const props = await Client.call<NavMethod>("nav", {})
//   return { props }
// }

// export default function Page({
//   pages,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//   return <Layout pages={pages}>Page</Layout>
// }
