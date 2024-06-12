import { type Client } from '../../entities/client'

export type ICreate = Pick<Client, 'name' | 'clientUserId' | 'image' | 'categoryId' | 'developerId'>
export type IUpdate = Pick<Client, 'name' | 'clientUserId' | 'image' | 'categoryId' | 'developerId'>

export interface IClientCases {
    create: ({ name, clientUserId, image, categoryId, developerId }: ICreate) => Promise<Client>
    read: (developerId: number) => Promise<Client[]>
    update: ({ name, clientUserId, image, categoryId }: IUpdate) => Promise<Client | string>
    delete: (clientUserId: number, developerId: number) => Promise<string>
    checkExistence: (clientUserId: number, developerId: number) => Promise<Client | boolean>
    notification: (clientUserId: number, developerId: number) => Promise<Client | string>
}