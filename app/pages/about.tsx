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

const About: BlitzPage = () => {
  return (
    <Container>
      <h1 className="text-center py-5">このサイトについて</h1>
      <div className="pb-5 h5">
        このサイトは、男子新体操で使われている曲を紹介するサイトです。
        <br />
        また 、無料で誰でも記事を投稿できる様になっています。
        <br />
        情報取集が個人では限界があるため、よりたくさんの情報を集めるために皆さんのご協力が必要不可欠です。
        <br />
        お時間がありましたら、ぜひご協力のほど、よろしくお願いいたします。
        <br />
        <br />
        <div className="text-danger">※不適切な内容の投稿はしない様にお願いします</div>
        <br />
        質問やご意見やご要望などございましたらお気軽に下記のメールアドレス、またはTwitterのDMまでご連絡ください。
        <br />
        <br />
        メールアドレス：mrkmaui@gmail.com
        <br />
        Twitter：<a href="https://twitter.com/Ota_Rg_Blog">Ota＠アクロバット</a>
        <br />
        <br />
        会員登録後の投稿方法について↓
        <br />
        <br />
        <a href="/players/using">投稿方法について</a>
        <br />
        <br />
      </div>
    </Container>
  )
}

About.suppressFirstRenderFlicker = true
About.getLayout = (page) => <Layout title="About">{page}</Layout>

export default About
