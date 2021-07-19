import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteMusic = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteMusic), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const music = await db.music.deleteMany({ where: { id } })

  return music
})
