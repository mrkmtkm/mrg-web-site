// import db from "./index"

import db from "db"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const seed = async () => {
  // for (let i = 0; i < 5; i++) {
  //   await db.project.create({ data: { name: "Project " + i } })
  // }

  const player1 = await db.player.create({
    data: {
      name: "山崎礼人",
      school: "大学",
      origin: "同志社大学",
      year: 2019,
      category: "スティック",
      url: "https://youtu.be/lJM8axstMlM",
      tournament: "全日本インカレ",
    },
  })
  const music1 = await db.music.create({
    data: {
      name: "Beauty and the Beast",
      artist: "kylelandry",
      url: "https://youtu.be/quukTS8GcII",
      Player: {
        connect: {
          id: player1.id,
        },
      },
    },
  })

  const player2 = await db.player.create({
    data: {
      name: "山崎礼人",
      school: "大学",
      origin: "同志社大学",
      year: 2019,
      category: "リング",
      url: "https://youtu.be/MKCaJIfIcuM",
      tournament: "全日本インカレ",
    },
  })
  await db.music.create({
    data: {
      name: "Breath and Life",
      artist: "Audiomachine",
      url: "https://youtu.be/-7zoS40lQ88",
      Player: {
        connect: {
          id: player2.id,
        },
      },
    },
  })

  const player3 = await db.player.create({
    data: {
      name: "山崎礼人",
      school: "大学",
      origin: "同志社大学",
      year: 2019,
      category: "ロープ",
      url: "https://youtu.be/PAp1dzGb_q8",
      tournament: "全日本インカレ",
    },
  })
  await db.music.create({
    data: {
      name: "Stampede",
      artist: "Alexander Jean · Lindsey Stirling",
      url: "https://youtu.be/anGVuSFJ2w8",
      Player: {
        connect: {
          id: player3.id,
        },
      },
    },
  })

  const player4 = await db.player.create({
    data: {
      name: "山崎礼人",
      school: "大学",
      origin: "同志社大学",
      year: 2019,
      category: "クラブ",
      url: "https://youtu.be/xcPKPXns6hc",
      tournament: "全日本インカレ",
    },
  })
  await db.music.create({
    data: {
      name: "Don't You Worry Child (feat. Shweta Subram)",
      artist: "The Piano Guys",
      url: "https://youtu.be/1gCulUDvALM",
      Player: {
        connect: {
          id: player4.id,
        },
      },
    },
  })
}

export default seed
