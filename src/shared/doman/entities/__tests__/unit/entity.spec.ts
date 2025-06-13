import { v4, validate } from 'uuid'
import { Entity } from '../../entity'

type StubProps = {
  prop1: string
  prop2: number
}
class StubEntity extends Entity<StubProps> {}

describe('Entity unit tests', () => {
  it('should set props props and id', () => {
    const props = { prop1: 'valeu1', prop2: 15 }
    const entity = new StubEntity(props)
    expect(entity.props).toStrictEqual(props)
    expect(entity.id).not.toBeNull()
    expect(validate(entity._id)).toBeTruthy()
  })

  it('should accept a valid uuid', () => {
    const props = { prop1: 'valeu1', prop2: 15 }
    const id = v4()
    const entity = new StubEntity(props, id)

    expect(validate(entity._id)).toBeTruthy()
    expect(entity._id).toBe(id)
  })

  it('should converrt a entity to a json', () => {
    const props = { prop1: 'valeu1', prop2: 15 }
    const id = v4()
    const entity = new StubEntity(props, id)

    expect(entity.toJSON()).toStrictEqual({ id, ...props })
  })
})
