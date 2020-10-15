import styled from "@emotion/styled"
// import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
// import { Response } from "./api/nav"
import { NavPage } from "~/types"

const $Container = styled.div`
  margin: 1em;
  display: flex;
  max-width: 920px;
`
const $Left = styled.div`
  flex: 0 0 240px;
`
const $Right = styled.div`
  flex: 1 0 auto;
`

// type Page = {
//   id: number
//   title: string
// }

// export const getStaticProps: GetStaticProps<Response> = async () => {
//   console.log(1)
//   const res = await fetch("http://localhost:4000/api/nav")
//   console.log(2)
//   const json = await res.json()
//   console.log(3)
//   return { props: json }
// }

export function Layout({
  children,
  pages,
}: {
  children: React.ReactNode
  pages: NavPage[]
}) {
  return (
    <$Container>
      <$Left>
        Navigation
        <ul className="list-group">
          {pages.map((page) => {
            return (
              <li
                key={page.id}
                className="list-group-item list-group-item-action"
              >
                {page.title}
              </li>
            )
          })}
        </ul>
      </$Left>
      <$Right className="ml-4">{children}</$Right>
    </$Container>
  )
}
