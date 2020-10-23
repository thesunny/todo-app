import { prisma } from "~/lib/prisma"
import { Server } from "~/lib/api/server"
import * as s from "superstruct"

const Props = s.object({})

const handler = Server.method(Props, async () => {
  const body = "# New Title"
  const title = "New Title"
  const page = await prisma.page.create({
    select: { id: true },
    data: { title, body },
  })
  return page
})

export default handler

export type PageAddResponse = Server.MethodType<typeof handler>
