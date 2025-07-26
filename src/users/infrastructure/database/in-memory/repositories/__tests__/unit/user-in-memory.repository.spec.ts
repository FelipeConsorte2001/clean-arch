import { ConflictError } from '@/shared/doman/erros/conflict-error'
import { NotFoundError } from '@/shared/doman/erros/not-found-error'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'
import { UserInMemoryRepository } from '../../user-in-memory.repository'

describe('UserInMemoryRepository unit tests', () => {
  let sut: UserInMemoryRepository
  beforeEach(() => {
    sut = new UserInMemoryRepository()
  })
  it('Should through erro when not found - findByEmail method', async () => {
    const email = 'a@a.com'
    await expect(sut.findByEmail(email)).rejects.toThrow(
      new NotFoundError(`Entity not found using ${email}`),
    )
  })

  it('Should find a entity by email - findByEmail method', async () => {
    const entity = new UserEntity(UserDataBuilder({}))
    await sut.insert(entity)
    const result = await sut.findByEmail(entity.email)
    expect(entity.toJSON()).toStrictEqual(result.toJSON())
  })

  it('Should through erro when not found - emailExists method', async () => {
    const entity = new UserEntity(UserDataBuilder({}))
    await sut.insert(entity)
    await expect(sut.emailExist(entity.email)).rejects.toThrow(
      new ConflictError(`Email address already used`),
    )
  })
  it('Should find a entity by email - emailExists method', async () => {
    expect.assertions(0)
    await sut.emailExist('a@a.com')
  })
})
