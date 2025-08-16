import { IvalidPasswordError } from '@/shared/application/erros/invalid-password-error'
import { HashProvider } from '@/shared/application/providers/hash-provider'
import { NotFoundError } from '@/shared/doman/erros/not-found-error'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'
import { UserInMemoryRepository } from '@/users/infrastructure/database/in-memory/repositories/user-in-memory.repository'
import { bcryptjsHashProvider } from '@/users/infrastructure/providers/hash-provider/bcryptjs-hash.provider'
import { UpdatePasswordUseCase } from '../../updatepassword.usecase'

describe('UserPasswordcase unit tests', () => {
  let sut: UpdatePasswordUseCase
  let repository: UserInMemoryRepository
  let hashProvider: HashProvider

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    hashProvider = new bcryptjsHashProvider()
    sut = new UpdatePasswordUseCase(repository, hashProvider)
  })

  it('Should throws error when entity not found', async () => {
    await expect(() =>
      sut.execute({
        id: 'fake id',
        password: 'password',
        oldPassword: 'oldpassowrd',
      }),
    ).rejects.toThrow(new NotFoundError(`Entity not found`))
  })
  it('Should throws error when oldpassword is not provided', async () => {
    const entity = new UserEntity(UserDataBuilder({}))
    repository.items = [entity]

    await expect(() =>
      sut.execute({
        id: entity._id,
        password: 'password',
        oldPassword: '',
      }),
    ).rejects.toThrow(
      new IvalidPasswordError(`Old password and new password is required`),
    )
  })
  it('Should throws error when new password is not proveided', async () => {
    const entity = new UserEntity(UserDataBuilder({ password: '12521' }))
    repository.items = [entity]

    await expect(() =>
      sut.execute({
        id: entity._id,
        password: '',
        oldPassword: '12521',
      }),
    ).rejects.toThrow(
      new IvalidPasswordError(`Old password and new password is required`),
    )
  })

  it('Should throws error when old passwors does not match', async () => {
    const hashPassowrod = await hashProvider.generateHash('1234')
    const entity = new UserEntity(UserDataBuilder({ password: hashPassowrod }))
    repository.items = [entity]

    await expect(() =>
      sut.execute({
        id: entity._id,
        password: '12sss',
        oldPassword: '1234555',
      }),
    ).rejects.toThrow(new IvalidPasswordError(`Old password does not match`))
  })

  it('Should update a password', async () => {
    const spy = jest.spyOn(repository, 'update')
    const hashPassowrod = await hashProvider.generateHash('1234')
    const newPassoword = '4567'
    const items = [new UserEntity(UserDataBuilder({ password: hashPassowrod }))]
    repository.items = items
    const result = await sut.execute({
      id: items[0]._id,
      password: newPassoword,
      oldPassword: '1234',
    })
    const checkNewPassword = await hashProvider.compareHash(
      newPassoword,
      result.password,
    )
    expect(spy).toHaveBeenCalledTimes(1)
    expect(checkNewPassword).toBeTruthy()
  })
})
