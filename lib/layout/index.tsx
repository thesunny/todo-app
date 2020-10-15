import styled from "@emotion/styled"
import cx from "classnames"
import { NavPage } from "~/types"
import Link from "next/link"

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

export function Layout({
  children,
  activePageId,
  pages,
}: {
  children: React.ReactNode
  activePageId?: number
  pages: NavPage[]
}) {
  return (
    <>
      <div className="navbar navbar-expand-sm">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link href="/">
              <a className="nav-link">Home</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/add-page">
              <a className="nav-link">Add page</a>
            </Link>
          </li>
        </ul>
      </div>
      <$Container>
        <$Left>
          <div className="list-group">
            {pages.map((page) => {
              const className = cx("list-group-item list-group-item-action", {
                active: activePageId === page.id,
              })
              return (
                <Link key={page.id} href={`/page/${page.id}`}>
                  <a className={className}>{page.title}</a>
                </Link>
              )
            })}
          </div>
        </$Left>
        <$Right className="ml-4">{children}</$Right>
      </$Container>
    </>
  )
}
