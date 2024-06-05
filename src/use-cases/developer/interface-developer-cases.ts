import { type Developer } from '../../entities/developer'

export type ICreate = Pick<Developer, 'name' | 'token'>
export type IUpdate = Pick<Developer, 'id' | 'name' | "token">

export interface IDeveloperCases {
    create: ({ name, token }: ICreate) => Promise<Developer>
    read: () => Promise<Developer[]>
    update: ({ name, token }: IUpdate) => Promise<Developer>
    delete: (id: number) => Promise<string>
}