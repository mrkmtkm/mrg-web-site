import { FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Player } from "db"
import React, { FunctionComponent, useEffect, useState } from "react"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"
import { DateTime } from "luxon"
import { Button, Card, Form } from "react-bootstrap"
import { PlayerForm } from "app/auth/validations"

type Props = {
  state: PlayerForm
  onChangeState: (changedState: PlayerForm) => void
  onSubmit: (e: React.FormEvent) => void
}

export const CreatePlayerForm: FunctionComponent<Props> = (props) => {
  const { state, onChangeState, onSubmit } = props
  const [urlConfirm, setUrlConfirm] = useState<boolean>(false)
  const [musicUrlConfirm, setMusicUrlConfirm] = useState<Array<boolean>>([])
  const [sportsCategory, setSportsCategory] = useState<string>("alone")
  useEffect(() => {
    state.musics.forEach((d) => {
      setMusicUrlConfirm(musicUrlConfirm.concat([false]))
    })
    if (state.category === "team") {
      setSportsCategory("team")
    } else if (state.category === "party") {
      setSportsCategory("party")
    }
  }, [])
  const YearOptions = () => {
    const year = [...Array(DateTime.local().year - 1899)]
      .map((_, index) => index)
      .map((value) => DateTime.local().year - value)
      .reverse()

    return (
      <>
        {year.map((i) => (
          <option value={i} key={i}>
            {i}
          </option>
        ))}
      </>
    )
  }
  const youtubeConfirm = (url) => {
    const aa = url.split("/").slice(-1)[0]
    return (
      <div className="youtube mt-3">
        <iframe
          width="560"
          height="315"
          src={"https://www.youtube.com/embed/" + aa}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    )
  }
  return (
    <Form onSubmit={props.onSubmit}>
      <Form.Group>
        <Form.Label htmlFor="name" className="font-weight-bold">
          {sportsCategory === "alone" ? "?????????" : "????????????"}
        </Form.Label>
        <Form.Control
          type="text"
          name="name"
          onChange={(e) => onChangeState({ ...state, name: e.target.value })}
          value={state.name}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="category" className="font-weight-bold">
          ??????
        </Form.Label>
        <div>
          <Form.Check
            id="alone"
            type="radio"
            checked={sportsCategory === "alone"}
            onChange={(e) => {
              setSportsCategory("alone")
            }}
            label="??????"
            inline
          />
          <Form.Check
            id="team"
            type="radio"
            checked={sportsCategory === "team"}
            onChange={(e) => {
              setSportsCategory("team")
              onChangeState({ ...state, category: "??????" })
            }}
            label="??????"
            inline
          />
          <Form.Check
            id="party"
            type="radio"
            checked={sportsCategory === "party"}
            onChange={(e) => {
              setSportsCategory("party")
              onChangeState({ ...state, category: "?????????" })
            }}
            label="?????????"
            inline
          />
        </div>
      </Form.Group>
      {sportsCategory === "alone" && (
        <Form.Group>
          <Form.Label htmlFor="category" className="font-weight-bold">
            ????????????
          </Form.Label>
          <div>
            <Form.Check
              id="stick"
              type="radio"
              checked={state.category === "???????????????"}
              onChange={(e) => {
                onChangeState({ ...state, category: "???????????????" })
              }}
              label="???????????????"
              inline
            />
            <Form.Check
              id="ring"
              type="radio"
              checked={state.category === "?????????"}
              onChange={(e) => {
                onChangeState({ ...state, category: "?????????" })
              }}
              label="?????????"
              inline
            />
            <Form.Check
              id="rope"
              type="radio"
              checked={state.category === "?????????"}
              onChange={(e) => {
                onChangeState({ ...state, category: "?????????" })
              }}
              label="?????????"
              inline
            />
            <Form.Check
              id="club"
              type="radio"
              checked={state.category === "?????????"}
              onChange={(e) => {
                onChangeState({ ...state, category: "?????????" })
              }}
              label="?????????"
              inline
            />
          </div>
        </Form.Group>
      )}

      <Form.Group>
        <Form.Label htmlFor="school" className="font-weight-bold">
          ??????
        </Form.Label>
        <div>
          <Form.Check
            id="college"
            type="radio"
            checked={state.school === "??????"}
            onChange={(e) => {
              onChangeState({ ...state, school: e.target.value })
            }}
            value="??????"
            label="??????"
            inline
          />
          <Form.Check
            id="high"
            type="radio"
            checked={state.school === "??????"}
            onChange={(e) => {
              onChangeState({ ...state, school: e.target.value })
            }}
            value="??????"
            label="??????"
            inline
          />
          <Form.Check
            id="junior"
            type="radio"
            checked={state.school === "????????????"}
            onChange={(e) => {
              onChangeState({ ...state, school: e.target.value })
            }}
            value="????????????"
            label="????????????"
            inline
          />
          <Form.Check
            id="senior"
            type="radio"
            checked={state.school === "?????????"}
            onChange={(e) => {
              onChangeState({ ...state, school: e.target.value })
            }}
            value="?????????"
            label="?????????"
            inline
          />
        </div>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="origin" className="font-weight-bold">
          ????????????
        </Form.Label>
        <Form.Control
          required
          type="text"
          name="origin"
          onChange={(e) => onChangeState({ ...state, origin: e.target.value })}
          value={state.origin}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="origin" className="font-weight-bold">
          ?????????
        </Form.Label>
        <Form.Control
          required
          type="text"
          name="origin"
          onChange={(e) => onChangeState({ ...state, tournament: e.target.value })}
          value={state.tournament}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor="year" className="font-weight-bold">
          ??????
        </Form.Label>
        <Form.Control
          required
          as="select"
          value={state.year}
          onChange={(e) => onChangeState({ ...state, year: Number(e.target.value) })}
        >
          <YearOptions />
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor="url" className="font-weight-bold">
          url
        </Form.Label>
        <Form.Control
          required
          type="text"
          name="url"
          onChange={(e) => onChangeState({ ...state, url: e.target.value })}
          value={state.url}
        />
        <div className="mt-3">
          <Button
            type="button"
            onClick={() => {
              setUrlConfirm(!urlConfirm)
            }}
          >
            URL???????????????
          </Button>
        </div>

        {urlConfirm && youtubeConfirm(state.url)}
      </Form.Group>
      <div className="font-weight-bold h3 mt-5 mb-1">??????</div>
      <div className="text-danger mb-4">
        <small className="font-weight-bold">?????????????????????????????????????????????</small>
      </div>

      {state.musics &&
        state.musics.map((music, idx) => (
          <Card key={idx} className="mb-4">
            <Card.Body>
              <Form.Group className="mb-4">
                <Form.Label className="font-weight-bold">??????</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="??????????????????????????????????????????"
                  onChange={(e) => {
                    const newMusic = state.musics.concat()
                    // @ts-ignore
                    newMusic[idx].name = e.target.value
                    onChangeState({
                      ...state,
                      musics: newMusic,
                    })
                  }}
                  value={music.name}
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="font-weight-bold">??????</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="??????????????????????????????????????????"
                  onChange={(e) => {
                    const newMusic = state.musics.concat()
                    // @ts-ignore
                    newMusic[idx].artist = e.target.value
                    onChangeState({
                      ...state,
                      musics: newMusic,
                    })
                  }}
                  value={music.artist}
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="font-weight-bold">URL</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="??????????????????????????????????????????"
                  onChange={(e) => {
                    const newMusic = state.musics.concat()
                    // @ts-ignore
                    newMusic[idx].url = e.target.value
                    onChangeState({
                      ...state,
                      musics: newMusic,
                    })
                  }}
                  value={music.url}
                />
              </Form.Group>
              <Button
                onClick={() => {
                  const a = musicUrlConfirm.map((data, i) => {
                    if (i === idx) {
                      return !data
                    }
                    return data
                  })
                  setMusicUrlConfirm(a)
                }}
              >
                URL???????????????
              </Button>
              {musicUrlConfirm[idx] && youtubeConfirm(music.url)}
              <div className="mt-4">
                <Button
                  className="text-right"
                  onClick={() => {
                    onChangeState({
                      ...state,
                      musics: state.musics.filter((_fai, i) => i !== idx),
                    })
                    setMusicUrlConfirm(musicUrlConfirm.filter((_fai, i) => i !== idx))
                  }}
                >
                  ?????????????????????
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      <div>
        <Button
          onClick={() => {
            onChangeState({
              ...state,
              musics: state.musics.concat({
                name: "",
                artist: "",
                url: "",
              }),
            })
            setMusicUrlConfirm(musicUrlConfirm.concat([false]))
          }}
        >
          ?????????????????????
        </Button>
      </div>

      <div className="mt-4 text-center">
        <Button className="px-5 bg-success" size="lg" type="submit">
          ??????/????????????
        </Button>
      </div>
    </Form>
  )
}
