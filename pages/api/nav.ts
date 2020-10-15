import { PrismaClient } from "@prisma/client"
import { nextHandler } from "~/lib/next-handler"

const prisma = new PrismaClient()

export default nextHandler(async (req, res) => {
  const pages = await prisma.page.findMany({
    select: { id: true, title: true },
  })
  return { pages }
})

export type Response = { pages: Array<{ id: number; title: string }> }