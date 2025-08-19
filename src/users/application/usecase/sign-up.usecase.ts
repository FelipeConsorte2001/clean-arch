import { HashProvider } from '@/shared/application/providers/hash-provider'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { UserRepository } from '@/users/domain/repositories/user.repository'
import { BadRequestError } from '../../../shared/application/erros/bad-request-error'
import { UserOutput, UserOutputMapper } from '../dtos/user-output'

export type SignupUpInput = {
  name: string
  email: string
  password: string
}
export type Output = UserOutput

export class SignupUseCase
  implements DefaultUseCase<SignupUpInput, Promise<Output>>
{
  constructor(
    private userRepository: UserRepository,
    private hashProviderProvider: HashProvider,
  ) {}
  async execute(input: SignupUpInput): Promise<Output> {
    const { name, email, password } = input

    if (!email || !name || !password)
      throw new BadRequestError('Input data not provided')

    await this.userRepository.emailExist(email)

    const hashPassword = await this.hashProviderProvider.generateHash(password)
    const entity = new UserEntity(
      Object.assign(input, { password: hashPassword }),
    )

    await this.userRepository.insert(entity)
    return UserOutputMapper.toOutput(entity)
  }
}
