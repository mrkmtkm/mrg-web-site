import { z } from "zod"

const password = z.string()

export const Signup = z.object({
  email: z.string().email(),
  password,
})

export const Login = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const ForgotPassword = z.object({
  email: z.string().email(),
})

export const ResetPassword = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  })

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
})
export interface Music {
  name: string
  artist: string
  url: string
}

export interface PlayerForm {
  name: string
  school: string
  origin: string
  year: number
  category: string
  url: string
  tournament: string
  musics: Music[]
}

export const PlayerFormValidate = (form: PlayerForm) => {
  if (form.name === "") {
    return false
  }
  if (form.school === "") {
    return false
  }
  if (form.origin === "") {
    return false
  }
  if (form.category === "") {
    return false
  }
  if (form.url === "") {
    return false
  }
  if (form.tournament === "") {
    return false
  }
  if (form.musics.length === 0) {
    return false
  }

  return true
}
