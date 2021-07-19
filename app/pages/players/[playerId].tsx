import React, { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPlayer from "app/players/queries/getPlayer"
import deletePlayer from "app/players/mutations/deletePlayer"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Button, Card, Container, Table } from "react-bootstrap"

export const Player = () => {
  const router = useRouter()
  const playerId = useParam("playerId", "number")
  const [deletePlayerMutation] = useMutation(deletePlayer)
  const [player, { refetch }] = useQuery(getPlayer, { id: playerId })
  const currentUser = useCurrentUser()
  const youtube = (url) => {
    const aa = url.split("/").slice(-1)[0]
    return (
      <div className="youtube mt-3 mb-3">
        <iframe
          width="660"
          height="415"
          src={"https://www.youtube.com/embed/" + aa}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Player {player.id}</title>
      </Head>
      <Card className="text-center mb-5">
        <Card.Header>{youtube(player.url)}</Card.Header>
        <Card.Body>
          <Card.Title>
            <h3 className="font-weight-bold">{player.name}</h3>
          </Card.Title>
          <Card.Text>
            <Table responsive>
              <tbody>
                <tr>
                  <th>種目</th>
                  <td>{player.category}</td>
                </tr>
                <tr>
                  <th>チーム名</th>
                  <td>{player.origin}</td>
                </tr>
                <tr>
                  <th>年度</th>
                  <td>{player.year}</td>
                </tr>
                <tr className="border-bottom">
                  <th>大会名</th>
                  <td>{player.tournament}</td>
                </tr>
              </tbody>
            </Table>
            <Button
              className="text-right mt-3 mb-3 p-3 px-4"
              onClick={async () => {
                return router.push(`/players/${playerId}/edit`)
              }}
            >
              編集する
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
      <h3 className="text-center font-weight-bold mb-5">原曲</h3>
      {player.musics.map((music) => (
        <Card className="text-center" key={music.id}>
          <Card.Header>{youtube(music.url)}</Card.Header>
          <Card.Body>
            <Card.Title>
              <h3 className="font-weight-bold">
                {music.name}/{music.artist}
              </h3>
            </Card.Title>
            <Card.Text>
              <Table responsive>
                <tbody>
                  <tr>
                    <th>曲名</th>
                    <td>{music.name}</td>
                  </tr>
                  <tr className="border-bottom">
                    <th>アーティスト名</th>
                    <td>{music.artist}</td>
                  </tr>
                </tbody>
              </Table>
              <Button
                className="text-right mt-3 mb-3 p-3 px-4"
                onClick={async () => {
                  return router.push(`/players/${playerId}/edit`)
                }}
              >
                編集する
              </Button>
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
      <div className="mt-3 mb-3 h5 text-right">
        <Link href={`/players`}>
          <a>一覧に戻る</a>
        </Link>
      </div>

      <div>
        {currentUser && (
          <button
            type="button"
            onClick={async () => {
              if (window.confirm("This will be deleted")) {
                await deletePlayerMutation({ id: player.id })
                router.push(Routes.PlayersPage())
              }
            }}
            style={{ marginLeft: "0.5rem" }}
          >
            Delete
          </button>
        )}
      </div>
    </>
  )
}

const ShowPlayerPage: BlitzPage = () => {
  const playerId = useParam("playerId", "number")
  const [player, { refetch }] = useQuery(getPlayer, { id: playerId })
  return (
    <Container>
      <Head>
        <title>
          【男子新体操原曲サイト】{player.name}　{player.category}　{player.year}
        </title>
      </Head>
      <h1 className="text-center py-5">選手/チーム情報</h1>
      <div className="mt-3 mb-3 h5 text-left">
        <Link href={`/players`}>
          <a>←一覧に戻る</a>
        </Link>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <Player />
      </Suspense>
    </Container>
  )
}

ShowPlayerPage.authenticate = false
ShowPlayerPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowPlayerPage
