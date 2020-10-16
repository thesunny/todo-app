import { nextHandler } from "~/lib/next-handler"
import { prisma } from "~/lib/prisma"
import { Server } from "~/lib/api/server"
import * as s from "superstruct"

// export default nextHandler(async (req, res) => {
//   const body = "# New Title"
//   const title = "New Title"
//   const { id } = await prisma.page.create({ data: { title, body } })
//   return { id }
// })

// export type PageAddResponse = { pages: Array<{ id: number; title: string }> }

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

export type PageAddResponse = Server.ResponseType<typeof handler>
