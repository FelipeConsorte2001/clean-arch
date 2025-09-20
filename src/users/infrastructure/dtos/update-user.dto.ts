import { UpdateUserInput } from '@/users/application/usecase/update-user.usecase'
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateUserDto implements Omit<UpdateUserInput, 'id'> {
  @IsString()
  @IsNotEmpty()
  name: string
}
