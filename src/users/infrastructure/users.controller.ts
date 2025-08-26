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

  @Post()
  async create(@Body() singupDto: SingupDto) {
    return this.singupUseCase.execute(singupDto)
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() singinDto: SinginDto) {
    return this.singinUseCase.execute(singinDto)
  }

  @Get()
  async search(@Query() searchParams: ListUsersDto) {
    return this.listUsersUseCase.execute(searchParams)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.getUserUseCase.execute({ id })
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUserUseCase.execute({ id, ...updateUserDto })
  }

  @Patch(':id')
  async updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.updatePasswordUseCase.execute({ id, ...updatePasswordDto })
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteUserUseCase.execute({ id })
  }
}
