import {
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
  SearchableRepositoryInterface,
} from '@/shared/doman/repositories/searchable-repository-contracts'
import { UserEntity } from '../entities/user.entity'

export class SearchParams extends DefaultSearchParams<Filter> {}
export class SearchResults extends DefaultSearchResult<UserEntity, Filter> {}
export type Filter = string
export interface UserRepository
  extends SearchableRepositoryInterface<
    UserEntity,
    Filter,
    SearchParams,
    SearchResults
  > {
  findByEmail(email: string): Promise<UserEntity>
  emailExist(email: string): Promise<void>
}
