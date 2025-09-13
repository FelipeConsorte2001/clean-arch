import { UserOutput } from '@/users/application/dtos/user-output'
import { Output as outputUser } from '@/users/application/usecase/get-user.usecase'
import { Output as outputListUsers } from '@/users/application/usecase/list-users.usecase'
import { Output as outputSignIn } from '@/users/application/usecase/sign-in.usecase'
import { Output as outputSignUp } from '@/users/application/usecase/sign-up.usecase'
import { Output as outputPassword } from '@/users/application/usecase/update-password.usecase'
import { Output as outputUpdate } from '@/users/application/usecase/update-user.usecase'
import { v4 } from 'uuid'
import { SinginDto } from '../../dtos/signin.dto'
import { SingupDto } from '../../dtos/signup.dto'
import { UpdatePasswordDto } from '../../dtos/update-password.dto'
import { UpdateUserDto } from '../../dtos/update-user.dto'
import {
  UserCollectionPresenter,
  UserPresenter,
} from '../../presenters/user.presenter'
import { UsersController } from '../../users.controller'
describe('Users Controller unit tests', () => {
  let sut: UsersController
  let id: string
  let props: UserOutput

  beforeEach(() => {
    sut = new UsersController()
    id = v4()
    props = {
      id,
      name: 'Jhon Doe',
      email: 'a@a.com',
      password: '1234',
      createdAt: new Date(),
    }
  })

  it('Should sut be defined', () => {
    expect(sut).toBeDefined()
  })
  it('Should create a user', async () => {
    const output: outputSignUp = props
    const mockSignupUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }
    sut['singupUseCase'] = mockSignupUseCase as any
    const input: SingupDto = {
      name: 'Jhon Doe',
      email: 'a@a.com',
      password: '1234',
    }
    const presenter = await sut.create(input)
    expect(presenter).toBeInstanceOf(UserPresenter)
    expect(presenter).toStrictEqual(new UserPresenter(output))
    expect(mockSignupUseCase.execute).toHaveBeenCalledWith(input)
  })
  it('Should authenticate a user', async () => {
    const output: outputSignIn = props
    const mockSigninUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }
    sut['singinUseCase'] = mockSigninUseCase as any
    const input: SinginDto = {
      email: 'a@a.com',
      password: '1234',
    }
    const presenter = await sut.login(input)
    expect(presenter).toBeInstanceOf(UserPresenter)
    expect(presenter).toStrictEqual(new UserPresenter(output))
    expect(mockSigninUseCase.execute).toHaveBeenCalledWith(input)
  })

  it('Should update a user', async () => {
    const output: outputUpdate = props
    const mockUpdateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }
    sut['updateUserUseCase'] = mockUpdateUseCase as any
    const input: UpdateUserDto = {
      name: 'some name',
    }
    const presenter = await sut.update(id, input)
    expect(presenter).toBeInstanceOf(UserPresenter)
    expect(presenter).toStrictEqual(new UserPresenter(output))
    expect(mockUpdateUseCase.execute).toHaveBeenCalledWith({ id, ...input })
  })

  it('Should update users password', async () => {
    const output: outputPassword = props
    const mockUpdatePasswordUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }
    sut['updatePasswordUseCase'] = mockUpdatePasswordUseCase as any
    const input: UpdatePasswordDto = {
      name: 'some name',
      password: '654321 new',
      oldPassword: '1234',
    }
    const presenter = await sut.updatePassword(id, input)
    expect(presenter).toBeInstanceOf(UserPresenter)
    expect(presenter).toStrictEqual(new UserPresenter(output))
    expect(mockUpdatePasswordUseCase.execute).toHaveBeenCalledWith({
      id,
      ...input,
    })
  })
  it('Should delete users', async () => {
    const output = undefined
    const mockDeleteUserUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }
    sut['deleteUserUseCase'] = mockDeleteUserUseCase as any
    const result = await sut.remove(id)
    expect(output).toStrictEqual(result)
    expect(mockDeleteUserUseCase.execute).toHaveBeenCalledWith({ id })
  })

  it('Should find one user', async () => {
    const output: outputUser = props
    const mockFindOneUserUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }
    sut['getUserUseCase'] = mockFindOneUserUseCase as any
    const presenter = await sut.findOne(id)
    expect(presenter).toBeInstanceOf(UserPresenter)
    expect(presenter).toStrictEqual(new UserPresenter(output))
    expect(mockFindOneUserUseCase.execute).toHaveBeenCalledWith({ id })
  })

  it('Should list users', async () => {
    const output: outputListUsers = {
      items: [props],
      currentPage: 1,
      lastPage: 1,
      perPage: 1,
      total: 1,
    }
    const mockListUsersUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }
    sut['listUsersUseCase'] = mockListUsersUseCase as any
    const searchParams = {
      page: 1,
      perPage: 1,
    }
    const presenter = await sut.search(searchParams)
    expect(presenter).toBeInstanceOf(UserCollectionPresenter)
    expect(presenter).toEqual(new UserCollectionPresenter(output))
    expect(mockListUsersUseCase.execute).toHaveBeenCalledWith(searchParams)
  })
})
