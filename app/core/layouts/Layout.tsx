import React, { ReactNode } from "react"
import { Head } from "blitz"
import { Navbar, Nav, NavDropdown, Container, Col, Row } from "react-bootstrap"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
      <Head>
        <title>{title || "男子新体操原曲サイト"}</title>
        <link rel="icon" href="/icon.JPG" />
      </Head>
      <Navbar
        style={{ backgroundColor: "#212529", paddingBottom: "2.0rem" }}
        expand="lg"
        className="pt-5"
      >
        <Container>
          <Navbar.Brand
            href="/players"
            className="font-weight-bold pb-3"
            style={{ color: "#61dafb" }}
          >
            <h2>男子新体操原曲サイト</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/players" className="ml-4" style={{ color: "hsla(0,0%,100%,.55)" }}>
                <h5>選手/チーム一覧</h5>
              </Nav.Link>
              <Nav.Link href="/about" className="ml-4" style={{ color: "hsla(0,0%,100%,.55)" }}>
                <h5>このサイトについて</h5>
              </Nav.Link>
              <Nav.Link href="/using" className="ml-4" style={{ color: "hsla(0,0%,100%,.55)" }}>
                <h5>このサイトの使い方</h5>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main className="bg-light pb-5">{children}</main>

      <footer>
        <section className=" text-white py-5" style={{ backgroundColor: "#212529" }}>
          <Container as="section">
            <Row className="">
              <Col md={5}>
                <h3 style={{ color: "#61dafb" }}>男子新体操原曲サイト</h3>
              </Col>

              <Col className="pt-2">
                <a href="/players">選手/チーム一覧</a>
              </Col>
              <Col className="pt-2">
                <a href="/about">このサイトについて</a>
              </Col>
              <Col className="pt-2">
                <a href="/using">このサイトの使い方</a>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col md={3}>
                <h4 className="text-center" style={{ color: "#61dafb" }}>
                  SNS
                </h4>
              </Col>
            </Row>
            <Row>
              <Col md={3} />
              <Col md={3} className="text-center">
                <h5>Twitter</h5>
                <a href="https://twitter.com/Ota_Rg_Blog">
                  <img src="/twitter.png" alt="my image" width="15%" className="mt-3" />
                </a>
              </Col>
              <Col md={3} className="text-center">
                <h5>youtube</h5>
                <a href="https://www.youtube.com/channel/UCT57-FhsGeOTQ9-BZ6W8eRQ">
                  <img src="/youtube.png" alt="my image" width="18%" className="mt-2" />
                </a>
              </Col>
              <Col md={3} className="text-center">
                <h5>ブログ</h5>
                <a href="https://www.ota-rg-blog.com/">
                  <img src="/icon.JPG" alt="my image" width="30%" className="mt-2" />
                </a>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="py-3">
          <Container as="section">
            <small>© 2021 男子新体操原曲サイト</small>
          </Container>
        </section>
      </footer>
    </>
  )
}

export default Layout
