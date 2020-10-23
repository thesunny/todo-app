import { prisma } from "~/lib/prisma"
import { Server } from "~/lib/api/server"
import * as s from "superstruct"

export const PageViewProps = s.object({ id: s.number() })

const handler = Server.method(PageViewProps, async ({ id }) => {
  const page = await prisma.page.findOne({
    select: { id: true, title: true, body: true },
    where: { id },
  })
  if (page == null) throw new Error("Page not found")
  return { page }
})

export default handler

export type PageViewResponse = Server.MethodType<typeof handler>
