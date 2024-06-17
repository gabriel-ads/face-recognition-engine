import { Developer } from "src/entities/developer"
import { ICheckExistence, ICreate, IUpdate } from "src/use-cases/developer/interface-developer-cases"

export interface IDeveloperRepository {
    create: (developer: ICreate) => Promise<Developer>
    read: () => Promise<Developer[]>
    update: (developer: IUpdate) => Promise<Developer>
    delete: (id: number) => Promise<string>

    checkExistence: ({ id, username }: ICheckExistence) => Promise<Developer | boolean>
}