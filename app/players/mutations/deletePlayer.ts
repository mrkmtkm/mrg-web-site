import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeletePlayer = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeletePlayer), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  await db.music.deleteMany({ where: { playerId: id } })
  const player = await db.player.deleteMany({ where: { id } })

  return player
})
