import { ClientCases } from "src/use-cases/client/client-cases";
import { CustomFastifyClientRequest, IClientController, } from "./interface-client-controller";
import { FastifyReply } from "fastify";
import { HertaRepository } from "src/repositories/herta/external/herta-repository";

export class ClientController implements IClientController {
    hertaRepository = new HertaRepository()
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
                await this.hertaRepository.create({ name, clientUserId, image, categoryId })

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
            clientUserId, name, image, categoryId, developerId
        })
        if (client) {
            const { name, clientUserId, image, categoryId } = client

            await this.hertaRepository.update({ name, clientUserId, image, categoryId })

            return reply.send(client)
        }

    }

    async delete(request: CustomFastifyClientRequest, reply: FastifyReply) {
        const clientUserId = parseInt(request.params.clientUserId)
        const { id: developerId } = request.developer

        const client = await this.clientCases.delete(clientUserId, developerId)

        if (client) {
            await this.hertaRepository.delete(clientUserId)

            return reply.send(client)
        }

    }
}