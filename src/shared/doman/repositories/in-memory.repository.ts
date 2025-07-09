import { Entity } from '../entities/entity'
import { NotFoundError } from '../erros/not-found-error'
import { RepositoryInterface } from './repository-contracts'

export abstract class InMemoryRepository<E extends Entity>
  implements RepositoryInterface<E>
{
  items: E[] = []

  async insert(entities: E): Promise<void> {
    this.items.push(entities)
  }

  async findById(id: string): Promise<E> {
    return await this._get(id)
  }

  async findAll(): Promise<E[]> {
    return this.items
  }

  async update(entities: E): Promise<void> {
    await this._get(entities.id)
    const index = this.items.findIndex(item => item.id === entities.id)
    this.items[index] = entities
  }

  async delete(id: string): Promise<void> {
    await this._get(id)
    const index = this.items.findIndex(item => item.id === id)
    this.items.slice(index, 1)
  }

  protected async _get(id: string): Promise<E> {
    const entity = this.items.find(item => item.id === id)
    if (!entity) throw new NotFoundError('Entity not found')
    return entity
  }
}
