import { BadRequestError } from '@/shared/application/erros/bad-request-error'
import { IvalidCredentialsError } from '@/shared/application/erros/invalid-credentials-error'
import { HashProvider } from '@/shared/application/providers/hash-provider'
import { NotFoundError } from '@/shared/doman/erros/not-found-error'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'
import { UserInMemoryRepository } from '@/users/infrastructure/database/in-memory/repositories/user-in-memory.repository'
import { bcryptjsHashProvider } from '@/users/infrastructure/providers/hash-provider/bcryptjs-hash.provider'
import { SigninUseCase } from '../../sign-in.usecase'

describe('Signin unit tests', () => {
  let sut: SigninUseCase
  let repository: UserInMemoryRepository
  let hashProvider: HashProvider

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    hashProvider = new bcryptjsHashProvider()
    sut = new SigninUseCase(repository, hashProvider)
  })

  it('Should authenticate a user', async () => {
    const spy = jest.spyOn(repository, 'findByEmail')
    const hashPassword = await hashProvider.generateHash('1234')
    const entity = new UserEntity(
      UserDataBuilder({ password: hashPassword, email: 'a@a.com' }),
    )
    repository.items = [entity]

    const result = await sut.execute({
      email: entity.email,
      password: '1234',
    })
    expect(result).toStrictEqual(entity.toJSON())
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('Should throws error when email not provided', async () => {
    const props = { email: null, password: '1234' }
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(
      BadRequestError,
    )
  })

  it('Should throws error when password not provider', async () => {
    const props = { password: null, email: '1234@a.com' }
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(
      BadRequestError,
    )
  })

  it('Should not be able to authenticate with wrong email', async () => {
    const props = { password: '1234', email: 'a@a.com' }
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(NotFoundError)
  })
  it('Should not be able to authenticate with wrong password', async () => {
    const hashPassword = await hashProvider.generateHash('1234')
    const entity = new UserEntity(
      UserDataBuilder({ password: hashPassword, email: 'a@a.com' }),
    )
    repository.items = [entity]
    const props = { password: 'fake', email: 'a@a.com' }
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(
      IvalidCredentialsError,
    )
  })
})
