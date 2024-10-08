import { type Herta } from '../../entities/herta'

export type ICreate = Pick<Herta, 'name' | 'clientUserId' | 'image' | 'categoryId' | 'developerId'>
export type IUpdate = Pick<Herta, 'clientUserId' | 'name' | 'image' | 'categoryId' | 'developerId'>

export interface HertaResponse {
    status: string,
    data: Object
}

export interface IHertaCases {
    create: ({ name, clientUserId, image, categoryId }: ICreate) => Promise<HertaResponse>
    update: ({ clientUserId, name, image, categoryId }: IUpdate) => Promise<HertaResponse>
    delete: (hertaUserId: string) => Promise<HertaResponse>
}