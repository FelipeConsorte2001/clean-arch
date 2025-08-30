import { NotFoundError } from '@/shared/doman/erros/not-found-error'
import { DatabaseModule } from '@/shared/infrastructure/database/database.module'
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma/setup-prisma-tests'
import { UserEntity } from '@/users/domain/entities/user.entity'
import {
  SearchParams,
  SearchResults,
} from '@/users/domain/repositories/user.repository'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaClient } from '@prisma/client'
import { UserPrismaRepository } from '../../user-prisma.repository'

describe('UserPrismaRepository integration tests', () => {
  const prismaService = new PrismaClient()
  let sut: UserPrismaRepository
  let module: TestingModule

  beforeAll(async () => {
    setupPrismaTests()
    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTests(prismaService)],
    }).compile()
  })

  beforeEach(async () => {
    sut = new UserPrismaRepository(prismaService as any)
    await prismaService.user.deleteMany()
  })

  it('should throws error when entity not found', async () => {
    const fakeId = 'fakeId'
    await expect(() => sut.findById(fakeId)).rejects.toThrow(
      new NotFoundError(`UserModel not found using ID ${fakeId}`),
    )
  })
  it('should finds a entity by id', async () => {
    const entity = new UserEntity(UserDataBuilder({}))
    const newUser = await prismaService.user.create({ data: entity.toJSON() })
    const output = await sut.findById(newUser.id)
    expect(output.toJSON()).toStrictEqual(entity.toJSON())
  })

  it('should insert a new entity', async () => {
    const entity = new UserEntity(UserDataBuilder({}))
    await sut.insert(entity)
    const result = await prismaService.user.findUnique({
      where: {
        id: entity._id,
      },
    })

    expect(result).toStrictEqual(entity.toJSON())
  })

  it('should retuns all users', async () => {
    const entity = new UserEntity(UserDataBuilder({}))
    await prismaService.user.create({ data: entity.toJSON() })
    const entities = await sut.findAll()
    expect(entities).toHaveLength(1)
    expect(JSON.stringify(entities)).toBe(JSON.stringify([entity]))
    entities.map(item => expect(item.toJSON()).toStrictEqual(entity.toJSON()))
  })

  it('should throws error on update when a entity not found', async () => {
    const entity = new UserEntity(UserDataBuilder({}))
    await expect(() => sut.update(entity)).rejects.toThrow(
      new NotFoundError(`UserModel not found using ID ${entity._id}`),
    )
  })

  it('should update a entity', async () => {
    const entity = new UserEntity(UserDataBuilder({}))
    await prismaService.user.create({ data: entity.toJSON() })
    const newName = 'new name'
    entity.update(newName)
    await sut.update(entity)
    const output = await prismaService.user.findUnique({
      where: { id: entity._id },
    })

    expect(output.name).toBe(newName)
  })

  describe('search method test', () => {
    it('should apply only pagination when the other params are null', async () => {
      const createAt = new Date()
      const entities: UserEntity[] = []
      const arrage = Array(16).fill(UserDataBuilder({}))
      arrage.forEach((element, index) => {
        entities.push(
          new UserEntity({
            ...element,
            email: `test${index}@gmail.com`,
            createdAt: new Date(createAt.getTime() + index),
          }),
        )
      })
      await prismaService.user.createMany({
        data: entities.map(item => item.toJSON()),
      })

      const searchOutput = await sut.search(new SearchParams())
      const items = searchOutput.items

      expect(searchOutput).toBeInstanceOf(SearchResults)
      expect(searchOutput.total).toBe(16)
      expect(searchOutput.items.length).toBe(15)
      expect(
        searchOutput.items.forEach(item =>
          expect(item).toBeInstanceOf(UserEntity),
        ),
      )
      items.reverse().forEach((items, index) => {
        expect(`test${index + 1}@gmail.com`).toBe(items.email)
      })
    })
    it('should search using filter, sort and paginate', async () => {
      const createAt = new Date()
      const entities: UserEntity[] = []
      const arrage = ['test', 'a', 'TEST', 'b', 'TeSt']

      arrage.forEach((element, index) => {
        entities.push(
          new UserEntity({
            ...UserDataBuilder({ name: element }),
            createdAt: new Date(createAt.getTime() + index),
          }),
        )
      })
      await prismaService.user.createMany({
        data: entities.map(item => item.toJSON()),
      })

      const searchOutputPage1 = await sut.search(
        new SearchParams({
          page: 1,
          perPage: 2,
          sort: 'name',
          sortDir: 'asc',
          filter: 'TEST',
        }),
      )
      const searchOutputPage2 = await sut.search(
        new SearchParams({
          page: 2,
          perPage: 2,
          sort: 'name',
          sortDir: 'asc',
          filter: 'TEST',
        }),
      )

      expect(searchOutputPage1.items[0].toJSON()).toMatchObject(
        entities[0].toJSON(),
      )
      expect(searchOutputPage1.items[1].toJSON()).toMatchObject(
        entities[4].toJSON(),
      )
      expect(searchOutputPage2.items[0].toJSON()).toMatchObject(
        entities[2].toJSON(),
      )
    })
  })
})
