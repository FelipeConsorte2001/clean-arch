import { Entity } from '../entities/entity'

export interface RepositoryInterface<E extends Entity> {
  insert(entities: E): Promise<void>
  findById(id: string): Promise<E>
  findAll(): Promise<E[]>
  update(entities: E): Promise<void>
  delete(id: string): Promise<void>
}
