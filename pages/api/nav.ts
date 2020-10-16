import { prisma } from "~/lib/prisma"
import { Server } from "~/lib/api/server"

// const Props = Struct.object({ id: Struct.number(), body: Struct.string() })

const handler = Server.method(async (req, res) => {
  const pages = await prisma.page.findMany({
    select: { id: true, title: true },
    orderBy: { createdAt: "desc" },
  })
  return { pages }
})

export default handler

export type Response = Server.ResponseType<typeof handler>
