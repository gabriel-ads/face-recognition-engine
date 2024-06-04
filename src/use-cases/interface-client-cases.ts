import { type Client } from '../entities/client'

export type ICreate = Pick<Client, 'name' | 'image' | 'categoryId' | 'developerId'>
export type IUpdate = Pick<Client, 'id' | 'name' | 'image' | 'categoryId'>

export interface IClientCases {
    create: ({ name, image, categoryId, developerId }: ICreate) => Promise<Client>
    read: () => Promise<Client[]>
    update: ({ id, name, image, categoryId }: IUpdate) => Promise<Client>
    delete: (id: number) => Promise<string>
}