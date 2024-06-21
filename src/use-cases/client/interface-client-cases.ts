import { type Client } from '../../entities/client'

export type ICreate = Pick<Client, 'name' | 'clientUserId' | 'image' | 'categoryId' | 'developerId'>
export type IUpdate = Pick<Client, 'id' | 'name' | 'clientUserId' | 'image' | 'categoryId' | 'developerId' | 'lastSeen'>

export interface IClientCases {
    create: ({ name, clientUserId, image, categoryId, developerId }: ICreate) => Promise<Client>
    read: (developerId: number) => Promise<Client[]>
    update: ({ id, name, clientUserId, image, categoryId }: IUpdate) => Promise<Client | string>
    delete: (id: number, clientUserId: string, developerId: number) => Promise<string>
    checkExistence: (clientUserId: string, developerId: number) => Promise<Client | boolean>
    notification: (clientUserId: string, developerId: number) => Promise<Client | string>
}