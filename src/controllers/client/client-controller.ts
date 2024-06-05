import { ClientCases } from "src/use-cases/client/client-cases";
import { IClientController, ICustomBodyType, ICustomFastifyReply, ICustomRouteParams } from "./interface-client-controller";
import { FastifyRequest } from "fastify";

export class ClientController implements IClientController {
    constructor(private readonly clientCases: ClientCases) { }

    async create(request: FastifyRequest<{ Body: ICustomBodyType }>, reply: ICustomFastifyReply) {
        const { name, image, categoryId } = request.body
        const { id: developerId } = reply.developer

        const client = await this.clientCases.create({
            name, image, categoryId, developerId
        })

        return reply.send(client)
    }

    async read(reply: ICustomFastifyReply) {
        const client = await this.clientCases.read()

        return reply.send(client)
    }

    async update(request: FastifyRequest<{ Body: ICustomBodyType }>, reply: ICustomFastifyReply) {
        const { id, name, image, categoryId } = request.body

        const client = await this.clientCases.update({
            id, name, image, categoryId
        })

        return reply.send(client)
    }

    async delete(request: FastifyRequest<{ Body: ICustomBodyType, Params: ICustomRouteParams }>, reply: ICustomFastifyReply) {
        const id = parseInt(request.params.id)

        const client = await this.clientCases.delete(id)

        return reply.send(client)
    }
}