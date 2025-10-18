import { SignupUpInput } from '@/users/application/usecase/sign-up.usecase'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class SingupDto implements SignupUpInput {
  @ApiProperty({ description: 'Username' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ description: 'User email' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty({ description: 'User password' })
  @IsString()
  @IsNotEmpty()
  password: string
}
