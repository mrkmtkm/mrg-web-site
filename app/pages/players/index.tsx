import React, { Suspense } from "react"
import { Head, usePaginatedQuery, useRouter, BlitzPage, Routes, Router } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPlayers from "app/players/queries/getPlayers"
import { Badge, Button, Card, CardGroup, Col, Container, ProgressBar, Row } from "react-bootstrap"
import Link from "next/link"

const ITEMS_PER_PAGE = 100

export const PlayersList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ players, hasMore }] = usePaginatedQuery(getPlayers, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <Row>
      {players.map((player) => (
        <Col md={4} key={player.id} className="mb-4">
          <Link href="players/[id]" as={`/players/${player.id}`}>
            <Card>
              <Card.Img
                variant="top"
                src={`http://img.youtube.com/vi/${
                  player.url.split("/").slice(-1)[0]
                }/hqdefault.jpg`}
              />
              <Card.Body>
                <Card.Title className="font-weight-bold">
                  {player.name}　{player.category}　{player.year}
                </Card.Title>
                <Card.Text>
                  <Row className="mb-3">
                    <Col sm={6}>
                      <p className=" m-0">チーム名</p>
                    </Col>
                    <Col sm={6} className=" h5 m-0">
                      {player.origin}
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={6}>
                      <p className=" m-0">大会</p>
                    </Col>
                    <Col sm={6} className=" h5 m-0">
                      {player.tournament}
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={6}>
                      <p className=" m-0">曲名</p>
                    </Col>
                    <Col sm={6} className=" h5 m-0">
                      {player.musics[0]?.name}
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={6}>
                      <p className=" m-0">アーティスト名</p>
                    </Col>
                    <Col sm={6} className=" h5 m-0">
                      {player.musics[0]?.artist}
                    </Col>
                  </Row>
                </Card.Text>

                <Link href={`/players/${player.id}`}>詳細を見る</Link>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  )
}

const PlayersPage: BlitzPage = () => {
  const router = useRouter()
  return (
    <Container>
      <Head>
        <title>【男子新体操原曲サイト】一覧ページ</title>
      </Head>
      <h1 className="text-center py-5 ">選手/チーム一覧</h1>
      <div className="text-right">
        <Button
          className="mt-3 mb-3 h5 text-right p-3 px-4"
          onClick={async () => {
            return router.push(`/players/new`)
          }}
        >
          追加する
        </Button>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <PlayersList />
      </Suspense>
    </Container>
  )
}

PlayersPage.authenticate = false
PlayersPage.getLayout = (page) => <Layout>{page}</Layout>

export default PlayersPage
