import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { UserRepository } from '@/users/domain/repositories/user.repository'

export type DeleteUserUserInput = {
  id: string
}
export type Output = void
export class DeleteUserUseCase
  implements DefaultUseCase<DeleteUserUserInput, Promise<Output>>
{
  constructor(private userRepository: UserRepository) {}
  async execute(input: DeleteUserUserInput): Promise<Output> {
    await this.userRepository.delete(input.id)
  }
}
