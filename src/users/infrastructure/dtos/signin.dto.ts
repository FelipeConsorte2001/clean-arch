import { SigninInput } from '@/users/application/usecase/sign-in.usecase'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class SinginDto implements SigninInput {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}
