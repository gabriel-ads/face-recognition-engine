import { Client } from "src/entities/client";
import { IClientRepository } from "../interface-client-repository";
import { prisma } from "src/database";
import { ICreate, IUpdate } from "src/use-cases/client/interface-client-cases";

export class ClientRepository implements IClientRepository {
    async create({ name, image, categoryId, developerId }: ICreate): Promise<Client> {
        try {
            const client = await prisma.client.create({ data: { name, image, categoryId, developerId } })

            return client as Client
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async read(): Promise<Client[]> {
        try {
            const client = await prisma.client.findMany()

            return client as Client[]
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async update({ id, name, image, categoryId }: IUpdate): Promise<Client> {
        try {
            const client = await prisma.client.update({
                where: { id },
                data: {
                    name, image, categoryId
                }
            })

            return client as Client
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async delete(id: number): Promise<string> {
        try {
            await prisma.client.delete({
                where: { id }
            })

            return `Usuário deletado com sucesso.`
        } catch (error) {
            throw new Error(error as string)
        }
    }
}