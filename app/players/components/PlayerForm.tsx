import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Player } from "db"
import { useState } from "react"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function PlayerForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Name" />
      <LabeledTextField name="school" label="school" placeholder="school" />
      <LabeledTextField name="origin" label="origin" placeholder="Name" />
      <LabeledTextField name="year" label="year" placeholder="Name" />
      <LabeledTextField name="category" label="category" placeholder="Name" />
      <LabeledTextField name="url" label="url" placeholder="Name" />
      <LabeledTextField name="musics.0.name" label="musics name" placeholder="Name" />
      <LabeledTextField name="musics.0.artist" label="musics artist" placeholder="Name" />
      <LabeledTextField name="musics.0.url" label="musics url" placeholder="Name" />
    </Form>
  )
}
