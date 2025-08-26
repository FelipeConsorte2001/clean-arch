import { SortDirection } from '@/shared/doman/repositories/searchable-repository-contracts'
import { ListUsersInput } from '@/users/application/usecase/list-users.usecase'

export class ListUsersDto implements ListUsersInput {
  page?: number
  perPage?: number
  sort?: string
  sortDir?: SortDirection
  filter?: string
}
