import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createPlayer from "app/players/mutations/createPlayer"
import { FORM_ERROR } from "app/players/components/PlayerForm"
import React, { useState } from "react"
import { Player } from "./[playerId]"
import { CreatePlayerForm } from "app/players/components/CreatePlayerForm"
import { PlayerForm, PlayerFormValidate } from "app/auth/validations"
import { Container } from "react-bootstrap"
import ReCAPTCHA from "react-google-recaptcha"
import axios from "axios"

const NewPlayerPage: BlitzPage = () => {
  const router = useRouter()
  const [createPlayerMutation] = useMutation(createPlayer)
  const [player, setPlayer] = useState<PlayerForm>({
    name: "",
    school: "",
    origin: "",
    year: 2000,
    category: "",
    url: "",
    tournament: "",
    musics: [{ name: "", artist: "", url: "" }],
  })
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!PlayerFormValidate(player)) {
      return alert("入力内容に不備に不備がございます")
    }
    try {
      await createPlayerMutation({
        name: player.name,
        school: player.school,
        origin: player.origin,
        year: player.year,
        category: player.category,
        url: player.url,
        tournament: player.tournament,
        musics: player.musics,
      })
      router.push(Routes.PlayersPage())
    } catch (error) {
      console.error(error)
      return {
        [FORM_ERROR]: error.toString(),
      }
    }
  }
  const onChange = async (value) => {
    console.log(value)
  }

  return (
    <Container>
      <h1 className="text-center py-5">選手/チーム作成</h1>

      <CreatePlayerForm state={player} onChangeState={setPlayer} onSubmit={onSubmit} />
      <ReCAPTCHA sitekey="6Lc_M6gbAAAAAEoXL14oaOrLgRjTfRPQTIlDGbqE" onChange={onChange} />

      <p className="mt-4 mb-3 h5 text-right">
        <Link href={Routes.PlayersPage()}>
          <a>一覧に戻る</a>
        </Link>
      </p>
    </Container>
  )
}

NewPlayerPage.authenticate = false
NewPlayerPage.getLayout = (page) => <Layout title={"Create New Player"}>{page}</Layout>

export default NewPlayerPage
