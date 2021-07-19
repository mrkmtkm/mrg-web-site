import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetMusicInput
  extends Pick<Prisma.MusicFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetMusicInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: music,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.music.count({ where }),
      query: (paginateArgs) => db.music.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      music,
      nextPage,
      hasMore,
      count,
    }
  }
)
