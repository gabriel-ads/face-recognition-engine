import { Client } from "src/entities/client";
import { IClientRepository } from "../interface-client-repository";
import { prisma } from "src/database";
import { ICreate, IUpdate } from "src/use-cases/client/interface-client-cases";

export class ClientRepository implements IClientRepository {

    async checkExistence(clientUserId: string, developerId?: number) {
        try {
            const client = await prisma.clients.findFirst({
                where: {
                    clientUserId,
                    AND: [
                        { developerId }
                    ]
                }
            })
            if (client) {
                return client as Client
            }
            else {
                return false
            }
        } catch (error) {
            console.log({ error })
            throw new Error(error as string)
        }
    }

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

    async update({ clientUserId, name, image, categoryId, developerId }: IUpdate): Promise<Client | string> {
        const client = await this.checkExistence(clientUserId, developerId as number)

        if (client) {
            const { id } = client
            try {
                const client = await prisma.clients.update({
                    where: {
                        id,
                        AND: [
                            { developerId },
                            { clientUserId }
                        ]
                    },
                    data: {
                        name, image, categoryId
                    }
                })

                return client as Client
            } catch (error) {
                console.log(error)
                throw new Error(error as string)
            }
        } else {
            return 'Usuário não encontrado'
        }
    }

    async delete(clientUserId: string, developerId: number): Promise<string> {
        const client = await this.checkExistence(clientUserId, developerId)
        if (client) {
            const { id } = client
            try {
                await prisma.clients.delete({
                    where: {
                        id,
                        AND: [
                            { clientUserId },
                            { developerId }
                        ]
                    }
                })

                return 'Usuário deletado com sucesso'
            } catch (error) {
                throw new Error(error as string)
            }
        } else {
            return 'Usuário não encontrado'
        }
    }
}