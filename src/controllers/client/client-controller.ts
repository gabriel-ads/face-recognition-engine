import { ClientCases } from "src/use-cases/client/client-cases";
import { CustomFastifyClientRequest, IClientController, } from "./interface-client-controller";
import { FastifyReply } from "fastify";
import { hertaFactory } from "src/factories/herta/herta-factory";
import { odooFactory } from "src/factories/odoo/odoo-factory"
import { Client } from "src/entities/client";
import { getCategoryValue } from "src/utils/categoryMaping";

export class ClientController implements IClientController {
    constructor(private readonly clientCases: ClientCases) { }

    async create(request: CustomFastifyClientRequest, reply: FastifyReply) {
        const { name, clientUserId, image, categoryId } = request.body
        const { id: developerId } = request.developer
        const alreadyExist = await this.clientCases.checkExistence(clientUserId, developerId)

        if (alreadyExist) {
            return reply.status(400).send('ClientUserId already exist for this developer.')
        } else {
            const client = await this.clientCases.create({
                name, clientUserId, image, categoryId, developerId
            })
            if (client) {
                const { name, clientUserId, image, categoryId } = client
                await hertaFactory().create({ name, clientUserId, image, categoryId })

                return reply.send(client)
            }
        }
    }

    async read(request: CustomFastifyClientRequest, reply: FastifyReply) {
        const { id: developerId } = request.developer

        const client = await this.clientCases.read(developerId)

        return reply.send(client)
    }

    async update(request: CustomFastifyClientRequest, reply: FastifyReply) {
        const clientUserId = parseInt(request.params.clientUserId)
        const { name, image, categoryId } = request.body
        const { id: developerId } = request.developer

        const client = await this.clientCases.update({
            name, image, categoryId, developerId
        })
        if (client) {
            const { name, clientUserId, image, categoryId } = client as Client

            await hertaFactory().update({ name, clientUserId, image, categoryId })

            return reply.send(client)
        }

    }

    async delete(request: CustomFastifyClientRequest, reply: FastifyReply) {
        const clientUserId = parseInt(request.params.clientUserId)
        const { id: developerId } = request.developer

        const client = await this.clientCases.delete(clientUserId, developerId)

        if (client) {
            await hertaFactory().delete(clientUserId)

            return reply.send(client)
        }

    }

    async notification(request: CustomFastifyClientRequest, reply: FastifyReply) {
        const { clientUserId } = request.body
        const { id: developerId } = request.developer
        const client = await this.clientCases.notification(clientUserId, developerId)

        if (typeof client !== "string") {
            const { name, clientUserId, image, categoryId } = client
            const odooResponse = await odooFactory().notify({
                name, clientUserId, image: image?.base64 as string, category: getCategoryValue(categoryId)
            })

            return odooResponse
        } else {
            return reply.send(client)
        }
    }
}