import { Client } from "src/entities/client";
import { ICreate, IUpdate, IClientCases } from "./interface-client-cases";
import { IClientRepository } from "src/repositories/client/interface-client-repository";

export class ClientCases implements IClientCases {
    constructor(private readonly clientRepository: IClientRepository
    ) { }

    async create({ name, image, categoryId, developerId }: ICreate): Promise<Client> {
        const client = new Client({ name, image, categoryId, developerId })

        const clientResponse = await this.clientRepository.create(client)

        return clientResponse
    }

    async read(): Promise<Client[]> {
        const clientResponse = await this.clientRepository.read()

        return clientResponse
    }

    async update({ id, name, image, categoryId }: IUpdate): Promise<Client> {
        const client = new Client({ id, name, image, categoryId })

        const clientResponse = await this.clientRepository.update(client)

        return clientResponse
    }

    async delete(id: number): Promise<string> {
        const clientResponse = await this.clientRepository.delete(id)

        return clientResponse
    }
}