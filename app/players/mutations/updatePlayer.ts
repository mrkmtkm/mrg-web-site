import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdatePlayer = z.object({
  id: z.number(),
  name: z.string(),
  school: z.string(),
  origin: z.string(),
  year: z.number(),
  category: z.string(),
  url: z.string(),
  tournament: z.string(),
  musics: z.array(
    z
      .object({
        id: z.number().optional(),
        name: z.string(),
        artist: z.string(),
        url: z.string(),
      })
      .nonstrict()
  ),
})

export default resolver.pipe(
  resolver.zod(UpdatePlayer),

  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const player = await db.player.findFirst({ where: { id }, include: { musics: true } })
    const deleteMusicData = player?.musics
      .map((d) => {
        const findData = data.musics.find((dm) => {
          return d.id === dm.id
        })
        if (findData === undefined) {
          return d.id
        }
        return
      })
      .filter((v) => v)

    await deleteMusicData?.map(async (musicId) => {
      await db.music.delete({
        where: {
          id: musicId,
        },
      })
    })

    const updatePlayer = await db.player.update({
      where: { id },
      data: {
        ...data,
        musics: {
          upsert: data.musics.map((music) => ({
            where: { id: music.id || 0 },
            create: { name: music.name, artist: music.artist, url: music.url },
            update: { name: music.name, artist: music.artist, url: music.url },
          })),
        },
      },
      include: {
        musics: true,
      },
    })

    return updatePlayer
  }
)
