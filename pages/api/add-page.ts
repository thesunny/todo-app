import { nextHandler } from "~/lib/next-handler"
import { prisma } from "~/lib/prisma"

export default nextHandler(async (req, res) => {
  const body = "# New Title"
  const title = "New Title"
  const { id } = await prisma.page.create({ data: { title, body } })
  return { id }
})

export type Response = { pages: Array<{ id: number; title: string }> }
