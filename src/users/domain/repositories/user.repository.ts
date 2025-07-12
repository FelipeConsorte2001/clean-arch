import { SearchableRepositoryInterface } from '@/shared/doman/repositories/searchable-repository-contracts'
import { UserEntity } from '../entities/user.entity'

export interface UserRepository
  extends SearchableRepositoryInterface<UserEntity, any, any> {
  findByEmail(email: string): Promise<UserEntity>

  emailExist(email: string): Promise<void>
}
