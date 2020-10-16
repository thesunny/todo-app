import styled from "@emotion/styled"
import cx from "classnames"
import { NavPage } from "~/types"
import Link from "next/link"
import { call } from "../api/call"
import { useRouter } from "next/router"

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
  const router = useRouter()
  async function addPage() {
    const { id } = await call("add-page")
    router.push(`/page/${id}`)
  }
  return (
    <>
      <$Container>
        <$Left>
          <div className="mb-2 text-right">
            <button className="btn btn-primary" onClick={addPage}>
              <i className="fa fa-plus mr-2" />
              Add page
            </button>
          </div>
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
