import { Entity } from '../entities/entity'
import { RepositoryInterface } from './repository-contracts'

export abstract class InMemoryRepository<E extends Entity>
  implements RepositoryInterface<E>
{
  items: E[] = []

  async insert(entities: E): Promise<void> {
    this.items.push(entities)
  }

  async findById(id: number): Promise<E> {
    const entity = this.items.find(item => item.id === String(id))
    if (!entity) throw new Error('Entity not found')
    return entity
  }

  async findAll(): Promise<E[]> {
    return this.items
  }

  update(entities: E): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
