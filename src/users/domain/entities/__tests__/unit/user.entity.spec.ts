import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'
import { UserEntity, UserProps } from '../../user.entity'

describe('userEntity unit tests', () => {
  let props: UserProps
  let sut: UserEntity
  beforeEach(() => {
    UserEntity.validate = jest.fn()
    props = UserDataBuilder({})
    sut = new UserEntity(props)
  })
  it('constructor method', () => {
    expect(UserEntity.validate).toHaveBeenCalled()
    expect(sut.props.name).toEqual(props.name)
    expect(sut.props.password).toEqual(props.password)
    expect(sut.props.email).toEqual(props.email)
    expect(sut.props.createdAt).toBeInstanceOf(Date)
  })
  it('getter of name field', () => {
    expect(sut.name).toBeDefined()
    expect(sut.name).toEqual(props.name)
    expect(typeof sut.props.name).toEqual('string')
  })
  it('setter of name field', () => {
    sut['name'] = 'other name'
    expect(sut.props.name).toEqual('other name')
    expect(typeof sut.props.name).toEqual('string')
  })
  it('getter of passwors field', () => {
    expect(sut.password).toBeDefined()
    expect(sut.password).toEqual(props.password)
    expect(typeof sut.props.password).toEqual('string')
  })
  it('setter of passoword field', () => {
    sut['password'] = 'other password'
    expect(sut.props.password).toEqual('other password')
    expect(typeof sut.props.password).toEqual('string')
  })
  it('getter of email field', () => {
    expect(UserEntity.validate).toHaveBeenCalled()
    expect(sut.email).toBeDefined()
    expect(sut.email).toEqual(props.email)
    expect(typeof sut.props.email).toEqual('string')
  })

  it('getter of createAt field', () => {
    expect(sut.createdAt).toBeDefined()
    expect(sut.createdAt).toBeInstanceOf(Date)
  })

  it('shoulder update a user', () => {
    sut.update('other name')
    expect(sut.props.name).toEqual('other name')
  })
  it('shoulder update the password user', () => {
    expect(UserEntity.validate).toHaveBeenCalled()
    sut.updatePassord('other password')
    expect(sut.props.password).toEqual('other password')
  })
})
