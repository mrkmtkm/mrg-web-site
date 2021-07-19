import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateMusic = z
  .object({
    id: z.number(),
    name: z.string(),
    artist: z.string(),
    url: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateMusic),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const music = await db.music.update({ where: { id }, data })

    return music
  }
)
