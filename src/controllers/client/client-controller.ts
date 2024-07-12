import { ClientCases } from "src/use-cases/client/client-cases";
import { CustomFastifyClientRequest, IClientController, } from "./interface-client-controller";
import { FastifyReply } from "fastify";
import { hertaFactory } from "src/factories/herta/herta-factory";
import { odooFactory } from "src/factories/odoo/odoo-factory"
import { categoryIdValidation, getCategoryValue } from "src/utils/categoryMaping";
import { patrianiFactory } from "src/factories/patriani/patriani-factory";
import { DeveloperRepository } from "src/repositories/developer/prisma/developer-repository";
import { delayCheck } from "src/utils/delayCheck";

export class ClientController implements IClientController {
    constructor(private readonly clientCases: ClientCases) { }

    async create(request: CustomFastifyClientRequest, reply: FastifyReply) {
        request.body.categoryId = categoryIdValidation(request.body.categoryId)
        const { name, clientUserId, image, categoryId } = request.body
        const { id: developerId } = request.developer
        const alreadyExist = await this.clientCases.checkExistence(clientUserId.toString(), developerId)

        if (alreadyExist) {
            return reply.status(400).send('ClientUserId already exist for this developer.')
        } else {
            const client = await this.clientCases.create({
                name,
                clientUserId: clientUserId.toString(),
                image,
                categoryId,
                developerId
            })
            if (typeof client !== "string") {
                const { name, clientUserId, image, categoryId, developerId, createdAt, updatedAt } = client
                await hertaFactory().create({ name, clientUserId: clientUserId.toString(), image, categoryId, developerId: developerId as number })

                return reply.send(
                    {
                        clientUserId,
                        createdAt,
                        updatedAt,
                        name,
                        image,
                        categoryId
                    }
                )
            }
        }
    }

    async read(request: CustomFastifyClientRequest, reply: FastifyReply) {
        const { id: developerId } = request.developer

        const client = await this.clientCases.read(developerId)

        const clientObject = client.map(({ clientUserId, name, image, categoryId }) => {
            return {
                clientUserId,
                name,
                image,
                category: getCategoryValue(categoryId)
            }
        })

        return reply.send(clientObject)
    }

    async update(request: CustomFastifyClientRequest, reply: FastifyReply) {
        const clientUserId = request.params.clientUserId
        const { name, image, categoryId } = request.body
        const { id: developerId } = request.developer

        const client = await this.clientCases.checkExistence(clientUserId, developerId as number)

        if (client) {
            const updateClientResponse = await this.clientCases.update({
                id: client.id,
                name: name ? name : client.name,
                clientUserId,
                image: {
                    base64: image?.base64 ? image.base64 : client.image.base64,
                    url: image?.url ? image.url : client.image.url
                },
                categoryId: categoryId ? categoryId : client.categoryId,
                developerId: developerId ? developerId : client.developerId,
            })

            await hertaFactory().update({
                name: name ? name : client.name,
                clientUserId: clientUserId ? clientUserId : client.clientUserId,
                image: {
                    base64: image?.base64 ? image.base64 : client.image.base64,
                    url: image?.url ? image.url : client.image.url
                },
                categoryId: categoryId ? categoryId : client.categoryId,
                developerId: developerId ? developerId : client.developerId
            })

            return reply.send(
                {
                    clientUserId: updateClientResponse.clientUserId,
                    createdAt: updateClientResponse.createdAt,
                    updatedAt: updateClientResponse.updatedAt,
                    name: updateClientResponse.name,
                    image: updateClientResponse.image,
                    categoryId: updateClientResponse.categoryId
                }
            )
        } else {
            reply.send('Usuário não encontrado.')
        }


    }

    async delete(request: CustomFastifyClientRequest, reply: FastifyReply) {
        const clientUserId = request.params.clientUserId
        const { id: developerId } = request.developer

        const client = await this.clientCases.checkExistence(clientUserId, developerId)
        if (client) {
            const deleteClientResponse = await this.clientCases.delete(client.id, clientUserId, developerId)

            await hertaFactory().delete(clientUserId)

            return reply.send(deleteClientResponse)
        } else {
            return reply.send('Usuário não encontrado.')
        }
    }

    async notification(request: CustomFastifyClientRequest, reply: FastifyReply) {
        const { clientUserId, developerId } = request.body
        const developerRepository = new DeveloperRepository()
        const developer = await developerRepository.checkExistence({ id: developerId })

        const client = await this.clientCases.notification(clientUserId.toString(), developerId)

        if (typeof client !== "string" && developer) {
            const { id, name, clientUserId, image, categoryId, lastSeen } = client

            if (!lastSeen) {
                await this.clientCases.update({ id, name, clientUserId, image, categoryId, lastSeen: new Date().toISOString() })
                if (developer.name === 'Odoo') {
                    const odooResponse = await odooFactory().notify({
                        name,
                        clientUserId,
                        image: image?.base64 as string,
                        category: getCategoryValue(categoryId)
                    })

                    return odooResponse
                }

                if (developer.name === 'Patriani') {
                    const patrianiResponse = await patrianiFactory().notify({
                        id: clientUserId as string,
                        name: name,
                        date: new Date().toISOString(),
                        message: `Lead ${name}(${getCategoryValue(categoryId)}) chegou ao stand.`
                    })

                    return patrianiResponse
                }
            } else {
                if (delayCheck(lastSeen)) {
                    await this.clientCases.update({ id, name, clientUserId, image, categoryId, lastSeen: new Date().toISOString() })
                    if (developer.name === 'Odoo') {
                        const odooResponse = await odooFactory().notify({
                            name,
                            clientUserId,
                            image: image?.base64 as string,
                            category: getCategoryValue(categoryId)
                        })

                        return odooResponse
                    }

                    if (developer.name === 'Patriani') {
                        const patrianiResponse = await patrianiFactory().notify({
                            id: clientUserId as string,
                            name: name,
                            date: new Date().toISOString(),
                            message: `Lead ${name}(${getCategoryValue(categoryId)}) chegou ao stand.`
                        })

                        return patrianiResponse
                    }
                }
            }

        } else {
            return reply.status(400).send(client)
        }
    }
}