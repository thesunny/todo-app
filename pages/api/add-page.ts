import { nextHandler } from "~/lib/next-handler"
import { prisma } from "~/lib/prisma"

export default nextHandler(async (req, res) => {
  const { body } = req.body
  const title = body.split("\n")[0] || "Unknown"
  const { id } = await prisma.page.create({ data: { title, body } })
  return { id }
})

export type Response = { pages: Array<{ id: number; title: string }> }
