import { PrismaClient } from "@prisma/client"
import { nextHandler } from "~/lib/next-handler"

const prisma = new PrismaClient()

const handler = nextHandler(async (req, res) => {
  const id = req.query.id
  const pages = await prisma.page.findMany({
    select: { id: true, title: true },
  })
  return { pages }
})

export default handler

export type Response = { pages: Array<{ id: number; title: string }> }
