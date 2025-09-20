import { SignupUpInput } from '@/users/application/usecase/sign-up.usecase'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class SingupDto implements SignupUpInput {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}
