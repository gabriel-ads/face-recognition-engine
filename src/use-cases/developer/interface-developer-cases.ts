import { type Developer } from '../../entities/developer'

export type ICreate = Pick<Developer, 'name' | 'username' | 'password' | 'token'>
export type IUpdate = Pick<Developer, 'id' | 'name' | 'username' | 'password' | 'token'>

export interface IDeveloperCases {
    create: ({ name, username, password, token }: ICreate) => Promise<Developer>
    read: () => Promise<Developer[]>
    update: ({ id, name, username, password, token }: IUpdate) => Promise<Developer>
    delete: (id: number) => Promise<string>
    checkExistence: (username: string) => Promise<boolean>
}