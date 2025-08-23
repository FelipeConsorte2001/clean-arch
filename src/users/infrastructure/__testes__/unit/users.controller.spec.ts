import { UserOutput } from '@/users/application/dtos/user-output'
import { Output as outputSignIn } from '@/users/application/usecase/sign-in.usecase'
import { Output as outputSignUp } from '@/users/application/usecase/sign-up.usecase'
import { v4 } from 'uuid'
import { SinginDto } from '../../dtos/signin.dto'
import { SingupDto } from '../../dtos/signup.dto'
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
    const mockSignupUse = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }
    sut['singupUseCase'] = mockSignupUse as any
    const input: SingupDto = {
      name: 'Jhon Doe',
      email: 'a@a.com',
      password: '1234',
    }
    const result = await sut.create(input)
    expect(output).toMatchObject(result)
    expect(mockSignupUse.execute).toHaveBeenCalledWith(input)
  })
  it('Should authenticate a user', async () => {
    const output: outputSignIn = props
    const mockSigninUse = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }
    sut['singinUseCase'] = mockSigninUse as any
    const input: SinginDto = {
      email: 'a@a.com',
      password: '1234',
    }
    const result = await sut.login(input)
    expect(output).toMatchObject(result)
    expect(mockSigninUse.execute).toHaveBeenCalledWith(input)
  })
})
