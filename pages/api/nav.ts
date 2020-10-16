import { prisma } from "~/lib/prisma"
import * as s from "superstruct"
import { Server } from "~/lib/api/server"

const Props = s.object({})

const handler = Server.method(Props, async () => {
  const pages = await prisma.page.findMany({
    select: { id: true, title: true },
    orderBy: { createdAt: "desc" },
  })
  return { pages }
})

export default handler

export type Response = Server.ResponseType<typeof handler>
