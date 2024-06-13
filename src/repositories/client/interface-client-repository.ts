import { Client } from "src/entities/client"
import { ICreate, IUpdate } from "src/use-cases/client/interface-client-cases"

export interface IClientRepository {
    create: (client: ICreate) => Promise<Client>
    read: (developerId: number) => Promise<Client[]>
    update: (client: IUpdate) => Promise<Client | string>
    delete: (clientUserId: string, developerId: number) => Promise<string>

    checkExistence: (clientUserId: string, developerId?: number) => Promise<Client | boolean>
}