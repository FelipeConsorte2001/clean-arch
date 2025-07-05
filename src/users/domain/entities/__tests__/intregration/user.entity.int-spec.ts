import { EntintyValidationError } from '@/shared/doman/erros/validation-error'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'
import { UserEntity, UserProps } from '../../user.entity'

describe('UserEntinty intregarion tests', () => {
  describe('Constructor method', () => {
    it('Should throw an error when creating a user with invalid email', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        name: null,
      }
      expect(() => new UserEntity(props)).toThrow(EntintyValidationError)
      props = {
        ...UserDataBuilder({}),
        name: '',
      }
      expect(() => new UserEntity(props)).toThrow(EntintyValidationError)
      props = {
        ...UserDataBuilder({}),
        name: 'aa'.repeat(256),
      }
      expect(() => new UserEntity(props)).toThrow(EntintyValidationError)
      props = {
        ...UserDataBuilder({}),
        name: 10 as any,
      }
      expect(() => new UserEntity(props)).toThrow(EntintyValidationError)
    })
    it('Should throw an error when creating a user with invalid email', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        email: null,
      }
      expect(() => new UserEntity(props)).toThrow(EntintyValidationError)
      props = {
        ...UserDataBuilder({}),
        email: '',
      }
      expect(() => new UserEntity(props)).toThrow(EntintyValidationError)
      props = {
        ...UserDataBuilder({}),
        email: 'aa'.repeat(256),
      }
      expect(() => new UserEntity(props)).toThrow(EntintyValidationError)
      props = {
        ...UserDataBuilder({}),
        email: 10 as any,
      }
      expect(() => new UserEntity(props)).toThrow(EntintyValidationError)
    })
    it('Should throw an error when creating a user with invalid password', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        password: null,
      }
      expect(() => new UserEntity(props)).toThrow(EntintyValidationError)
      props = {
        ...UserDataBuilder({}),
        password: '',
      }
      expect(() => new UserEntity(props)).toThrow(EntintyValidationError)
      props = {
        ...UserDataBuilder({}),
        password: 'aa'.repeat(101),
      }
      expect(() => new UserEntity(props)).toThrow(EntintyValidationError)
      props = {
        ...UserDataBuilder({}),
        password: 10 as any,
      }
      expect(() => new UserEntity(props)).toThrow(EntintyValidationError)
    })
  })
})
