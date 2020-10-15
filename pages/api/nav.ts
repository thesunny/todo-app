import { NavPage } from "~/types"
import { nextHandler } from "~/lib/next-handler"
import { prisma } from "~/lib/prisma"

export default nextHandler(async (req, res) => {
  const pages = await prisma.page.findMany({
    select: { id: true, title: true },
    orderBy: { title: "asc" },
  })
  return { pages }
})

export type Response = { pages: NavPage[] }
