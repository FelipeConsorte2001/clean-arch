import { UserEntity } from '@/users/domain/entities/user.entity'
import { UserRepository } from '@/users/domain/repositories/user.repository'
import { BadRequestError } from '../erros/bad-request-error'

export type SignupUpInput = {
  name: string
  email: string
  password: string
}
export type SignupUpOutput = {
  id: string
  createdAt: Date
  name: string
  email: string
  password: string
}

export class SignupUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute(input: SignupUpInput): Promise<SignupUpOutput> {
    const { name, email, password } = input

    if (!email || !name || !password)
      throw new BadRequestError('Input data not provided')

    const entity = new UserEntity(input)
    await this.userRepository.emailExist(email)
    await this.userRepository.insert(entity)
    return entity.toJSON()
  }
}
