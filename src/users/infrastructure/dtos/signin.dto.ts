import { SigninInput } from '@/users/application/usecase/sign-in.usecase'

export class SinginDto implements SigninInput {
  email: string
  password: string
}
