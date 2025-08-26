import { UpdateUserInput } from '@/users/application/usecase/update-user.usecase'

export class UpdateUserDto implements Omit<UpdateUserInput, 'id'> {
  name: string
}
