import { UserOutput } from '@/users/application/dtos/user-output'
import { Output } from '@/users/application/usecase/sign-up.usecase'
import { v4 } from 'uuid'
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
    const output: Output = props
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
})
