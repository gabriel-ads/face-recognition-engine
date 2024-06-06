import { ClientCases } from "src/use-cases/client/client-cases";
import { CustomFastifyClientRequest, IClientController, } from "./interface-client-controller";
import { FastifyReply } from "fastify";

export class ClientController implements IClientController {
    constructor(private readonly clientCases: ClientCases) { }

    async create(request: CustomFastifyClientRequest, reply: FastifyReply) {
        const { name, image, categoryId } = request.body
        const { id: developerId } = request.developer

        const client = await this.clientCases.create({
            name, image, categoryId, developerId
        })

        return reply.send(client)
    }

    async read(reply: FastifyReply) {
        const client = await this.clientCases.read()

        return reply.send(client)
    }

    async update(request: CustomFastifyClientRequest, reply: FastifyReply) {
        const { id, name, image, categoryId } = request.body

        const client = await this.clientCases.update({
            id, name, image, categoryId
        })

        return reply.send(client)
    }

    async delete(request: CustomFastifyClientRequest, reply: FastifyReply) {
        const id = parseInt(request.params.id)

        const client = await this.clientCases.delete(id)

        return reply.send(client)
    }
}