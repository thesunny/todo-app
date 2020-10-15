import { nextHandler } from "~/lib/next-handler"
import { prisma } from "~/lib/prisma"

const handler = nextHandler(async (req, res) => {
  const id = req.body.id
  const page = await prisma.page.findOne({
    select: { id: true, title: true, body: true, createdAt: true },
    where: { id },
  })
  if (page == null) throw new Error("Page not found")
  return { page }
})

export default handler

export type Response = { pages: Array<{ id: number; title: string }> }
