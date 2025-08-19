import { BadRequestError } from '@/shared/application/erros/bad-request-error'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { UserRepository } from '@/users/domain/repositories/user.repository'
import { UserOutput, UserOutputMapper } from '../dtos/user-output'

export type UpdateUser = {
  id: string
  name: string
}
export type Output = UserOutput
export class UpdateUserUseCase
  implements DefaultUseCase<UpdateUser, Promise<Output>>
{
  constructor(private userRepository: UserRepository) {}
  async execute(input: UpdateUser): Promise<Output> {
    if (!input.name) throw new BadRequestError('Name not provided')
    const entity = await this.userRepository.findById(input.id)
    entity.update(input.name)
    await this.userRepository.update(entity)
    return UserOutputMapper.toOutput(entity)
  }
}
