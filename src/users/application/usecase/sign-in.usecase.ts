import { IvalidCredentialsError } from '@/shared/application/erros/invalid-credentials-error'
import { HashProvider } from '@/shared/application/providers/hash-provider'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { UserRepository } from '@/users/domain/repositories/user.repository'
import { BadRequestError } from '../../../shared/application/erros/bad-request-error'
import { UserOutput, UserOutputMapper } from '../dtos/user-output'

export type SignupUpInput = {
  email: string
  password: string
}
export type Output = UserOutput

export class SigninUseCase
  implements DefaultUseCase<SignupUpInput, Promise<Output>>
{
  constructor(
    private userRepository: UserRepository,
    private hashProviderProvider: HashProvider,
  ) {}
  async execute(input: SignupUpInput): Promise<Output> {
    const { email, password } = input

    if (!email || !password)
      throw new BadRequestError('Input data not provided')

    const entity = await this.userRepository.findByEmail(email)

    const hashPasswordMatches = await this.hashProviderProvider.compareHash(
      password,
      entity.password,
    )
    if (!hashPasswordMatches)
      throw new IvalidCredentialsError('Invalid data not provided')

    return UserOutputMapper.toOutput(entity)
  }
}
