import { UserRepository } from '@/users/domain/repositories/user.repository'
import { UserOutput } from '../dtos/user-output'

export type GetUserInput = {
  id: string
}
export type Output = UserOutput
export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute(input: GetUserInput): Promise<Output> {
    const entity = await this.userRepository.findById(input.id)
    return entity.toJSON()
  }
}
