import { BadRequestError } from '@/shared/application/erros/bad-request-error'
import { NotFoundError } from '@/shared/doman/erros/not-found-error'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'
import { UserInMemoryRepository } from '@/users/infrastructure/database/in-memory/repositories/user-in-memory.repository'
import { UpdateUserUseCase } from '../../updateuser.usecase'

describe('UserUsercase unit tests', () => {
  let sut: UpdateUserUseCase
  let repository: UserInMemoryRepository

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    sut = new UpdateUserUseCase(repository)
  })

  it('Should throws error when entity not found', async () => {
    await expect(() =>
      sut.execute({ id: 'fake id', name: 'fake' }),
    ).rejects.toThrow(new NotFoundError(`Entity not found`))
  })
  it('Should throws error when name not found', async () => {
    await expect(() => sut.execute({ id: 'fake id' } as any)).rejects.toThrow(
      new BadRequestError(`Name not provided`),
    )
  })

  it('Should update a user', async () => {
    const spy = jest.spyOn(repository, 'findById')
    const items = [new UserEntity(UserDataBuilder({}))]
    repository.items = items
    const newName = 'new name'
    const result = await sut.execute({ id: items[0]._id, name: newName })
    expect(spy).toHaveBeenCalledTimes(1)
    expect(result).toMatchObject({
      id: items[0].id,
      name: newName,
      email: items[0].email,
      password: items[0].password,
      createdAt: items[0].createdAt,
    })
  })
})
