import { SortDirection } from '@/shared/doman/repositories/searchable-repository-contracts'
import { ListUsersInput } from '@/users/application/usecase/list-users.usecase'
import { IsOptional } from 'class-validator'

export class ListUsersDto implements ListUsersInput {
  @IsOptional()
  page?: number

  @IsOptional()
  perPage?: number

  @IsOptional()
  sort?: string

  @IsOptional()
  sortDir?: SortDirection

  @IsOptional()
  filter?: string
}
