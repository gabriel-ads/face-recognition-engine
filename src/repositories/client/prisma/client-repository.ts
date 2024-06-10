import { Client } from "src/entities/client";
import { IClientRepository } from "../interface-client-repository";
import { prisma } from "src/database";
import { ICreate, IUpdate } from "src/use-cases/client/interface-client-cases";

export class ClientRepository implements IClientRepository {
    async create({ name, clientUserId, image, categoryId, developerId }: ICreate): Promise<Client> {
        try {
            const client = await prisma.clients.create({ data: { name, clientUserId, image, categoryId, developerId } })

            return client as Client
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async read(developerId: number): Promise<Client[]> {
        try {
            const client = await prisma.clients.findMany({
                where: { developerId }
            })

            return client as Client[]
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async update({ clientUserId, name, image, categoryId, developerId }: IUpdate): Promise<Client> {
        try {
            const client = await prisma.clients.update({
                where: {
                    clientUserId,
                    AND: [
                        { developerId }
                    ]
                },
                data: {
                    name, image, categoryId
                }
            })

            return client as Client
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async delete(clientUserId: number, developerId: number): Promise<string> {
        try {
            await prisma.clients.delete({
                where: {
                    clientUserId,
                    AND: [
                        { developerId }
                    ]
                }
            })

            return `Usuário deletado com sucesso`
        } catch (error) {
            throw new Error(error as string)
        }
    }
}