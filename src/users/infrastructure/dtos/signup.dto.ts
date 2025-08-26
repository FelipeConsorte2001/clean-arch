import { SignupUpInput } from '@/users/application/usecase/sign-up.usecase'

export class SingupDto implements SignupUpInput {
  name: string
  email: string
  password: string
}
