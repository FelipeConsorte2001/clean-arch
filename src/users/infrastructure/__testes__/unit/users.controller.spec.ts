import { UserOutput } from '@/users/application/dtos/user-output'
import { Output as outputSignIn } from '@/users/application/usecase/sign-in.usecase'
import { Output as outputSignUp } from '@/users/application/usecase/sign-up.usecase'
import { Output as outputUpdate } from '@/users/application/usecase/update-user.usecase'
import { v4 } from 'uuid'
import { SinginDto } from '../../dtos/signin.dto'
import { SingupDto } from '../../dtos/signup.dto'
import { UpdateUserDto } from '../../dtos/update-user.dto'
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

  it('Should create a user', () => {
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
    const result = await sut.create(input)
    expect(output).toMatchObject(result)
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
    const result = await sut.login(input)
    expect(output).toMatchObject(result)
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
    const result = await sut.update(id, input)
    expect(output).toMatchObject(result)
    expect(mockUpdateUseCase.execute).toHaveBeenCalledWith({ id, ...input })
  })
})
