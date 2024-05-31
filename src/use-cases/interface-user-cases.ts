import { type User } from '../entities/user'

export type ICreate = Pick<User, 'id' | 'name' | 'imagem' | 'categoryId'>

export interface IUserCases {
    create: (user: ICreate) => Promise<string>
}