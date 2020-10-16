import { nextHandler } from "~/lib/next-handler"
import { prisma } from "~/lib/prisma"

export default nextHandler(async (req, res) => {
  const { id } = req.body
  await prisma.page.delete({ where: { id } })
  return { success: true }
})
