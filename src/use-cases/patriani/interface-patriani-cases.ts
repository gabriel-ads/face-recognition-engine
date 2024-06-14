import { type Patriani } from '../../entities/patriani'

export type INotify = Pick<Patriani, 'id' | 'name' | 'date' | 'message'>

export interface IPatrianiCases {
    notify: ({ id, name, date, message }: INotify) => Promise<any>
}