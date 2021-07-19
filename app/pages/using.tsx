import React, { Suspense } from "react"
import { Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import { Container } from "react-bootstrap"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const Using: BlitzPage = () => {
  return (
    <Container>
      <h1 className="text-center py-5">このサイトの使い方</h1>
      <h4 className="text-danger mb-5">※不適切な内容の投稿はしない様にお願いします。</h4>
      <h4 className="font-weight-bold">投稿方法</h4>
      <div className="pb-5 h5">
        <br />
        1, <a href="/players/new">このリンク</a>もしくは、選手/チーム一覧ページより追加ボタンを押す
        <br />
        <div className="bg-white text-center mt-4">
          <img src="/addPage.png" alt="my image" width="90%" className="my-4" />
        </div>
        <div className="mt-4">2,投稿内容を入力し、登録ボタンを押す</div>
        <br />
        <div className="text-danger">※必ず音楽を１曲以上追加してください</div>
        <div className="text-danger">※全ての入力欄を入力しないと登録できません</div>
        <br />
        <h4 className="font-weight-bold mt-4">投稿の編集方法</h4>
        <br />
        1, 選手/チーム情報ページより編集ボタンを押す
        <br />
        <div className="bg-white text-center mt-4">
          <img src="/editPage.png" alt="my image" width="90%" className="my-4" />
        </div>
        <div className="mt-4">2,投稿内容を入力し、登録ボタンを押す</div>
        <br />
        <div className="text-danger">※必ず音楽を１曲以上追加してください</div>
        <div className="text-danger">※全ての入力欄を入力しないと登録できません</div>
      </div>
    </Container>
  )
}

Using.suppressFirstRenderFlicker = true
Using.getLayout = (page) => <Layout title="Using">{page}</Layout>

export default Using
