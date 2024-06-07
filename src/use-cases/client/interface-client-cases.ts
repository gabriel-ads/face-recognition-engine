import { type Client } from '../../entities/client'

export type ICreate = Pick<Client, 'name' | 'clientUserId' | 'image' | 'categoryId' | 'developerId'>
export type IUpdate = Pick<Client, 'id' | 'name' | 'image' | 'categoryId' | 'developerId'>

export interface IClientCases {
    create: ({ name, clientUserId, image, categoryId, developerId }: ICreate) => Promise<Client>
    read: (developerId: number) => Promise<Client[]>
    update: ({ id, name, image, categoryId }: IUpdate) => Promise<Client>
    delete: (id: number, developerId: number) => Promise<string>
}