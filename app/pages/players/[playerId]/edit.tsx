import React, { Suspense, useEffect, useState } from "react"
import {
  Head,
  Link,
  useRouter,
  useQuery,
  useMutation,
  useParam,
  BlitzPage,
  Routes,
  Router,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import getPlayer from "app/players/queries/getPlayer"
import updatePlayer from "app/players/mutations/updatePlayer"
import { FORM_ERROR } from "app/players/components/PlayerForm"
import { PlayerForm, PlayerFormValidate } from "app/auth/validations"
import { CreatePlayerForm } from "app/players/components/CreatePlayerForm"
import { Container } from "react-bootstrap"

export const EditPlayer = () => {
  const router = useRouter()
  const playerId = useParam("playerId", "number")
  const [player, { setQueryData }] = useQuery(
    getPlayer,
    { id: playerId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [playerEditForm, setPlayerEditForm] = useState<PlayerForm>({
    name: player.name,
    school: player.school,
    origin: player.origin,
    year: player.year,
    category: player.category,
    url: player.url,
    tournament: player.tournament,
    musics: player.musics,
  })
  useEffect(() => {
    setPlayerEditForm({
      name: player.name,
      school: player.school,
      origin: player.origin,
      year: player.year,
      category: player.category,
      url: player.url,
      tournament: player.tournament,
      musics: player.musics,
    })
  }, [])

  const [updatePlayerMutation] = useMutation(updatePlayer)
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!PlayerFormValidate(player)) {
      return alert("入力内容に不備に不備がございます")
    }
    try {
      const updated = await updatePlayerMutation({
        id: player.id,
        name: playerEditForm.name,
        school: playerEditForm.school,
        origin: playerEditForm.origin,
        year: playerEditForm.year,
        category: playerEditForm.category,
        url: playerEditForm.url,
        tournament: playerEditForm.tournament,
        musics: playerEditForm.musics,
      })
      await setQueryData(updated)
      console.log(111)
      return Router.push("/players")
    } catch (error) {
      console.error(error)
      return {
        [FORM_ERROR]: error.toString(),
      }
    }
  }

  return (
    <>
      <div>
        <h1 className="text-center py-5">選手/チーム情報編集</h1>

        <CreatePlayerForm
          state={playerEditForm}
          onChangeState={setPlayerEditForm}
          onSubmit={onSubmit}
        />
      </div>
    </>
  )
}

const EditPlayerPage: BlitzPage = () => {
  return (
    <Container>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPlayer />
      </Suspense>

      <div className="mt-4 mb-3 h5 text-right">
        <Link href={Routes.PlayersPage()}>
          <a>一覧に戻る</a>
        </Link>
      </div>
    </Container>
  )
}

EditPlayerPage.authenticate = false
EditPlayerPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditPlayerPage
