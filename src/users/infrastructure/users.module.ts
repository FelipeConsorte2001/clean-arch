import { HashProvider } from '@/shared/application/providers/hash-provider'
import { Module } from '@nestjs/common'
import { DeleteUserUseCase } from '../application/usecase/delete-user.usecase'
import { GetUserUseCase } from '../application/usecase/get-user.usecase'
import { ListUserUseCase } from '../application/usecase/list-users.usecase'
import { SigninUseCase } from '../application/usecase/sign-in.usecase'
import { SignupUseCase } from '../application/usecase/sign-up.usecase'
import { UpdatePasswordUseCase } from '../application/usecase/update-password.usecase'
import { UpdateUserUseCase } from '../application/usecase/update-user.usecase'
import { UserRepository } from '../domain/repositories/user.repository'
import { UserInMemoryRepository } from './database/in-memory/repositories/user-in-memory.repository'
import { bcryptjsHashProvider } from './providers/hash-provider/bcryptjs-hash.provider'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'UserRepository',
      useClass: UserInMemoryRepository,
    },
    {
      provide: 'HashProvider',
      useClass: bcryptjsHashProvider,
    },
    {
      provide: SignupUseCase,
      useFactory: (
        userRepository: UserRepository,
        hashProvider: HashProvider,
      ) => {
        return new SignupUseCase(userRepository, hashProvider)
      },
      inject: ['UserRepository', 'HashProvider'],
    },
    {
      provide: SigninUseCase,
      useFactory: (
        userRepository: UserRepository,
        hashProvider: HashProvider,
      ) => {
        return new SigninUseCase(userRepository, hashProvider)
      },
      inject: ['UserRepository', 'HashProvider'],
    },
    {
      provide: UpdatePasswordUseCase,
      useFactory: (
        userRepository: UserRepository,
        hashProvider: HashProvider,
      ) => {
        return new UpdatePasswordUseCase(userRepository, hashProvider)
      },
      inject: ['UserRepository', 'HashProvider'],
    },
    {
      provide: DeleteUserUseCase,
      useFactory: (userRepository: UserRepository) => {
        return new DeleteUserUseCase(userRepository)
      },
      inject: ['UserRepository'],
    },
    {
      provide: GetUserUseCase,
      useFactory: (userRepository: UserRepository) => {
        return new GetUserUseCase(userRepository)
      },
      inject: ['UserRepository'],
    },
    {
      provide: ListUserUseCase,
      useFactory: (userRepository: UserRepository) => {
        return new ListUserUseCase(userRepository)
      },
      inject: ['UserRepository'],
    },
    {
      provide: UpdateUserUseCase,
      useFactory: (userRepository: UserRepository) => {
        return new UpdateUserUseCase(userRepository)
      },
      inject: ['UserRepository'],
    },
  ],
})
export class UsersModule {}
