import { NotFoundError } from '@/shared/doman/erros/not-found-error'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'
import { UserInMemoryRepository } from '@/users/infrastructure/database/in-memory/repositories/user-in-memory.repository'
import { DeleteUserUseCase } from '../../delete-user.usecase'

describe('DeleteUserUsercase unit tests', () => {
  let sut: DeleteUserUseCase
  let repository: UserInMemoryRepository

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    sut = new DeleteUserUseCase(repository)
  })

  it('Should throws error when entity not found', async () => {
    await expect(() => sut.execute({ id: 'fake id' })).rejects.toThrow(
      new NotFoundError(`Entity not found`),
    )
  })

  it('Should be able to delete user profile', async () => {
    const spy = jest.spyOn(repository, 'delete')
    const items = [new UserEntity(UserDataBuilder({}))]
    repository.items = items
    expect(repository.items).toHaveLength(1)
    await sut.execute({ id: items[0]._id })
    expect(spy).toHaveBeenCalledTimes(1)
    expect(repository.items).toHaveLength(0)
  })
})
