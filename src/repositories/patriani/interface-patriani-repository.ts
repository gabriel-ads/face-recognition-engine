import { INotify } from "src/use-cases/patriani/interface-patriani-cases"

export interface IPatrianiRepository {
    notify: (patriani: INotify) => Promise<any>
}