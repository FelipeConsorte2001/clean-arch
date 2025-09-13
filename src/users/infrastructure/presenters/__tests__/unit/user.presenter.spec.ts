import { PaginationPresenter } from '@/shared/infrastructure/presenters/pagination.presenter'
import { instanceToPlain } from 'class-transformer'
import { v4 } from 'uuid'
import { UserCollectionPresenter, UserPresenter } from '../../user.presenter'
describe('UsersPresenter unit tests', () => {
  const createdAt = new Date()
  let sut: UserPresenter
  const props = {
    id: v4(),
    name: 'test name',
    email: 'a@a.com',
    createdAt,
    password: 'fake',
  }

  beforeEach(() => {
    sut = new UserPresenter(props)
  })

  describe('constructor', () => {
    it('Should set values', () => {
      expect(sut.id).toEqual(props.id)
      expect(sut.name).toEqual(props.name)
      expect(sut.email).toEqual(props.email)
      expect(sut.createdAt).toEqual(props.createdAt)
    })
    it('Should create data', () => {
      const output = instanceToPlain(sut)
      expect(output).toStrictEqual({
        id: props.id,
        name: 'test name',
        email: 'a@a.com',
        createdAt: createdAt.toISOString(),
      })
    })
  })
})
describe('UsersCollection unit tests', () => {
  const createdAt = new Date()
  const props = {
    id: v4(),
    name: 'test name',
    email: 'a@a.com',
    createdAt,
    password: 'fake',
  }

  describe('constructor', () => {
    it('Should set values', () => {
      const sut = new UserCollectionPresenter({
        items: [props],
        currentPage: 1,
        perPage: 2,
        lastPage: 1,
        total: 1,
      })

      expect(sut.meta).toBeInstanceOf(PaginationPresenter)
      expect(sut.meta).toStrictEqual(
        new PaginationPresenter({
          currentPage: 1,
          perPage: 2,
          lastPage: 1,
          total: 1,
        }),
      )
      expect(sut.data).toStrictEqual([new UserPresenter(props)])
    })
    it('Should create data', () => {
      let sut = new UserCollectionPresenter({
        items: [props],
        currentPage: 1,
        perPage: 2,
        lastPage: 1,
        total: 1,
      })
      let output = instanceToPlain(sut)
      expect(output).toStrictEqual({
        data: [
          {
            id: props.id,
            name: 'test name',
            email: 'a@a.com',
            createdAt: createdAt.toISOString(),
          },
        ],
        meta: { currentPage: 1, perPage: 2, lastPage: 1, total: 1 },
      })

      sut = new UserCollectionPresenter({
        items: [props],
        currentPage: '1' as any,
        perPage: '2' as any,
        lastPage: '1' as any,
        total: '1' as any,
      })
      output = instanceToPlain(sut)
      expect(output).toStrictEqual({
        data: [
          {
            id: props.id,
            name: 'test name',
            email: 'a@a.com',
            createdAt: createdAt.toISOString(),
          },
        ],
        meta: { currentPage: 1, perPage: 2, lastPage: 1, total: 1 },
      })
    })
  })
})
