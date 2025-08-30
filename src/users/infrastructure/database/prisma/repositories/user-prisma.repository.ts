import { NotFoundError } from '@/shared/doman/erros/not-found-error'
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { UserEntity } from '@/users/domain/entities/user.entity'
import {
  SearchParams,
  SearchResults,
  UserRepository,
} from '@/users/domain/repositories/user.repository'
import { UserModelMapper } from '../models/user-model.mapper'

export class UserPrismaRepository implements UserRepository {
  constructor(private prismaService: PrismaService) {}
  sortableFields: string[]

  findByEmail(email: string): Promise<UserEntity> {
    throw new Error('Method not implemented.')
  }
  emailExist(email: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
  search(props: SearchParams): Promise<SearchResults> {
    throw new Error('Method not implemented.')
  }
  async insert(entities: UserEntity): Promise<void> {
    await this.prismaService.user.create({ data: entities.toJSON() })
  }
  findById(id: string): Promise<UserEntity> {
    return this._get(id)
  }
  findAll(): Promise<UserEntity[]> {
    throw new Error('Method not implemented.')
  }
  update(entities: UserEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
  protected async _get(id: string): Promise<UserEntity> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
      })
      return UserModelMapper.toEntity(user)
    } catch {
      throw new NotFoundError(`UserModel not found using ID ${id}`)
    }
  }
}
