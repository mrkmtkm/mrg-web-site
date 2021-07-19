import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateMusic = z.object({
  name: z.string(),
  artist: z.string(),
  url: z.string(),
})

export default resolver.pipe(resolver.zod(CreateMusic), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const music = await db.music.create({ data: input })

  return music
})
