import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreatePlayer = z
  .object({
    name: z.string(),
    school: z.string(),
    origin: z.string(),
    year: z.number(),
    category: z.string(),
    url: z.string(),
    tournament: z.string(),
    musics: z.array(z.object({ name: z.string(), artist: z.string(), url: z.string() })),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(CreatePlayer), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant

  const player = await db.player.create({
    data: {
      ...input,
      musics: { create: input.musics },
    },
  })
  return player
})
