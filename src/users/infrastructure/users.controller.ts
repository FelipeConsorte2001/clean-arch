import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common'

import { UserOutput } from '../application/dtos/user-output'
import { DeleteUserUseCase } from '../application/usecase/delete-user.usecase'
import { GetUserUseCase } from '../application/usecase/get-user.usecase'
import { ListUserUseCase } from '../application/usecase/list-users.usecase'
import { SigninUseCase } from '../application/usecase/sign-in.usecase'
import { SignupUseCase } from '../application/usecase/sign-up.usecase'
import { UpdatePasswordUseCase } from '../application/usecase/update-password.usecase'
import { UpdateUserUseCase } from '../application/usecase/update-user.usecase'
import { ListUsersDto } from './dtos/list-users.dto'
import { SinginDto } from './dtos/signin.dto'
import { SingupDto } from './dtos/signup.dto'
import { UpdatePasswordDto } from './dtos/update-password.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import { UserPresenter } from './presenters/user.presenter'

@Controller('users')
export class UsersController {
  @Inject(SignupUseCase)
  private singupUseCase: SignupUseCase

  @Inject(SigninUseCase)
  private singinUseCase: SigninUseCase

  @Inject(UpdateUserUseCase)
  private updateUserUseCase: UpdateUserUseCase

  @Inject(UpdatePasswordUseCase)
  private updatePasswordUseCase: UpdatePasswordUseCase

  @Inject(DeleteUserUseCase)
  private deleteUserUseCase: DeleteUserUseCase

  @Inject(GetUserUseCase)
  private getUserUseCase: GetUserUseCase

  @Inject(ListUserUseCase)
  private listUsersUseCase: ListUserUseCase

  static userToResponse(output: UserOutput) {
    return new UserPresenter(output)
  }

  @Post()
  async create(@Body() singupDto: SingupDto) {
    const output = await this.singupUseCase.execute(singupDto)
    return UsersController.userToResponse(output)
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() singinDto: SinginDto) {
    const output = await this.singinUseCase.execute(singinDto)
    return UsersController.userToResponse(output)
  }

  @Get()
  async search(@Query() searchParams: ListUsersDto) {
    return this.listUsersUseCase.execute(searchParams)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const output = await this.getUserUseCase.execute({ id })
    return UsersController.userToResponse(output)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const output = await this.updateUserUseCase.execute({
      id,
      ...updateUserDto,
    })
    return UsersController.userToResponse(output)
  }

  @Patch(':id')
  async updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const output = await this.updatePasswordUseCase.execute({
      id,
      ...updatePasswordDto,
    })
    return UsersController.userToResponse(output)
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteUserUseCase.execute({ id })
  }
}
