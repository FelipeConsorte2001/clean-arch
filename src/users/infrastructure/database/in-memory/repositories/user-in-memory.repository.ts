import { ConflictError } from '@/shared/doman/erros/conflict-error'
import { NotFoundError } from '@/shared/doman/erros/not-found-error'
import { InMemorySearchableRepository } from '@/shared/doman/repositories/in-memory-searchable.repository'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { UserRepository } from '@/users/domain/repositories/user.repository'

export class UserInMemoryRepository
  extends InMemorySearchableRepository<UserEntity>
  implements UserRepository
{
  async findByEmail(email: string): Promise<UserEntity> {
    const entity = this.items.find(item => item.email === email)
    if (!entity) throw new NotFoundError(`Entity not found using ${email}`)
    return entity
  }

  async emailExist(email: string): Promise<void> {
    const entity = this.items.find(item => item.email === email)
    if (entity) throw new ConflictError(`Email address already used`)
  }
}
