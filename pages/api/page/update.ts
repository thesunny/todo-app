import { nextHandler } from "~/lib/next-handler"
import { prisma } from "~/lib/prisma"

export default nextHandler(async (req, res) => {
  const { id, body } = req.body
  const title = body.split("\n")[0] || "Untitled"
  console.log("save", { id, title, body })

  await prisma.page.update({ where: { id }, data: { title, body } })
  return { success: true }
})

export type Response = { pages: Array<{ id: number; title: string }> }
