import { type Client } from '../../entities/client'

export type ICreate = Pick<Client, 'name' | 'clientUserId' | 'image' | 'categoryId' | 'developerId'>
export type IUpdate = Pick<Client, 'clientUserId' | 'name' | 'image' | 'categoryId' | 'developerId'>

export interface IClientCases {
    create: ({ name, clientUserId, image, categoryId, developerId }: ICreate) => Promise<Client>
    read: (developerId: number) => Promise<Client[]>
    update: ({ clientUserId, name, image, categoryId }: IUpdate) => Promise<Client>
    delete: (clientUserId: number, developerId: number) => Promise<string>

    checkExistence: (clientUserId: number, developerId: number) => Promise<boolean>
}