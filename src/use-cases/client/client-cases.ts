import { Client } from "src/entities/client";
import { ICreate, IUpdate, IClientCases } from "./interface-client-cases";
import { IClientRepository } from "src/repositories/client/interface-client-repository";

export class ClientCases implements IClientCases {
    constructor(private readonly clientRepository: IClientRepository
    ) { }

    async create({ name, clientUserId, image, categoryId, developerId }: ICreate): Promise<Client> {
        const client = new Client({ name, clientUserId, image, categoryId, developerId })

        const clientResponse = await this.clientRepository.create(client)

        return clientResponse
    }

    async read(developerId: number): Promise<Client[]> {
        const clientResponse = await this.clientRepository.read(developerId)

        return clientResponse
    }

    async update({ clientUserId, name, image, categoryId, developerId }: IUpdate): Promise<Client> {
        const client = new Client({ clientUserId, name, image, categoryId, developerId })

        const clientResponse = await this.clientRepository.update(client)

        return clientResponse
    }

    async delete(clientUserId: number, developerId: number): Promise<string> {
        const clientResponse = await this.clientRepository.delete(clientUserId, developerId)

        return clientResponse
    }
}