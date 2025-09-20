import { UpdatePasswordInput } from '@/users/application/usecase/update-password.usecase'
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdatePasswordDto implements Omit<UpdatePasswordInput, 'id'> {
  @IsString()
  @IsNotEmpty()
  password: string
  @IsString()
  @IsNotEmpty()
  oldPassword: string
}
