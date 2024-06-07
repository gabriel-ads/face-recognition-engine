import { Client } from "src/entities/client";
import { IClientRepository } from "../interface-client-repository";
import { prisma } from "src/database";
import { ICreate, IUpdate } from "src/use-cases/client/interface-client-cases";

export class ClientRepository implements IClientRepository {
    async create({ name, clientUserId, image, categoryId, developerId }: ICreate): Promise<Client> {
        try {
            const client = await prisma.client.create({ data: { name, clientUserId, image, categoryId, developerId } })

            return client as Client
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async read(developerId: number): Promise<Client[]> {
        try {
            const client = await prisma.client.findMany({
                where: { developerId }
            })

            return client as Client[]
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async update({ id, name, image, categoryId, developerId }: IUpdate): Promise<Client> {
        console.log(developerId)
        try {
            const client = await prisma.client.update({
                where: {
                    id,
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

    async delete(id: number, developerId: number): Promise<string> {
        try {
            await prisma.client.delete({
                where: {
                    id, AND: [
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