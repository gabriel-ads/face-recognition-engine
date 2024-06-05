import { DeveloperCases } from "src/use-cases/developer/developer-cases";
import { IDeveloperController, ICustomBodyType, ICustomFastifyReply, ICustomRouteParams } from "./interface-developer-controller";
import { FastifyRequest } from "fastify";

export class DeveloperController implements IDeveloperController {
    constructor(private readonly developerCases: DeveloperCases) { }

    async create(request: FastifyRequest<{ Body: ICustomBodyType }>, reply: ICustomFastifyReply) {
        const { name } = request.body

        const developer = await this.developerCases.create({
            name,
        })

        return reply.send(developer)
    }

    async read(reply: ICustomFastifyReply) {
        const developer = await this.developerCases.read()

        return reply.send(developer)
    }

    async update(request: FastifyRequest<{ Body: ICustomBodyType }>, reply: ICustomFastifyReply) {
        const { id, name, token } = request.body

        const developer = await this.developerCases.update({
            id, name, token
        })

        return reply.send(developer)
    }

    async delete(request: FastifyRequest<{ Body: ICustomBodyType, Params: ICustomRouteParams }>, reply: ICustomFastifyReply) {
        const id = parseInt(request.params.id)

        const developer = await this.developerCases.delete(id)

        return reply.send(developer)
    }
}