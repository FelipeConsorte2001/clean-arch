import { UpdatePasswordInput } from '@/users/application/usecase/update-password.usecase'

export class UpdatePasswordDto implements Omit<UpdatePasswordInput, 'id'> {
  password: string
  oldPassword: string
  name: string
}
