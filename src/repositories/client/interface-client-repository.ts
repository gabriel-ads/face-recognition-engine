import { Client } from "src/entities/client"
import { ICreate, IUpdate } from "src/use-cases/client/interface-client-cases"

export interface IClientRepository {
    create: (client: ICreate) => Promise<Client>
    read: () => Promise<Client[]>
    update: (client: IUpdate) => Promise<Client>
    delete: (id: number) => Promise<string>
}