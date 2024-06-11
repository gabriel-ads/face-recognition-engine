import { type Odoo } from '../../entities/odoo'

export type INotify = Pick<Odoo, 'name' | 'clientUserId' | 'image' | 'category'>

export interface IOdooCases {
    notify: ({ name, clientUserId, image, category }: INotify) => Promise<any>
}