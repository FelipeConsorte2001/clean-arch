import { EntintyValidationError } from '@/shared/doman/erros/validation-error'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'
import { UserEntity, UserProps } from '../../user.entity'

describe('UserEntinty intregarion tests', () => {
  describe('Constructor method', () => {
    it('Should throw an error when creating a user with invalid name', () => {
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
    })
  })
})
