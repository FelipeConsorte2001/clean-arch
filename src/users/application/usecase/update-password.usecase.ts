import { IvalidPasswordError } from '@/shared/application/erros/invalid-password-error'
import { HashProvider } from '@/shared/application/providers/hash-provider'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { UserRepository } from '@/users/domain/repositories/user.repository'
import { UserOutput, UserOutputMapper } from '../dtos/user-output'

export type UpdatePassword = {
  id: string
  password: string
  oldPassword: string
}
export type Output = UserOutput

export class UpdatePasswordUseCase
  implements DefaultUseCase<UpdatePassword, Promise<Output>>
{
  constructor(
    private userRepository: UserRepository,
    private hashProvider: HashProvider,
  ) {}
  async execute(input: UpdatePassword): Promise<Output> {
    const entity = await this.userRepository.findById(input.id)
    if (!input.password || !input.oldPassword)
      throw new IvalidPasswordError('Old password and new password is required')

    const checkOldPassword = await this.hashProvider.compareHash(
      input.oldPassword,
      entity.password,
    )

    if (!checkOldPassword)
      throw new IvalidPasswordError('Old password does not match')

    const hashPassword = await this.hashProvider.generateHash(input.password)
    entity.updatePassord(hashPassword)
    await this.userRepository.update(entity)
    return UserOutputMapper.toOutput(entity)
  }
}
