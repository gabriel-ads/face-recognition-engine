import { DeveloperCases } from "src/use-cases/developer/developer-cases";
import { IDeveloperController, CustomFastifyDeveloperRequest } from "./interface-developer-controller";
import { FastifyReply } from "fastify";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export class DeveloperController implements IDeveloperController {
    constructor(private readonly developerCases: DeveloperCases) { }

    async create(request: CustomFastifyDeveloperRequest, reply: FastifyReply) {
        request.body.password = bcrypt.hashSync(request.body.password, 10);
        const { name, username, password } = request.body

        const developerObject = { name, username, password }

        const token = jwt.sign({ developerObject }, (process.env.SECRET_KEY as string), {
            expiresIn: '365d'
        })

        const developer = await this.developerCases.create({
            name, username, password, token
        })

        return reply.send(developer)
    }

    async read(reply: FastifyReply) {
        const developer = await this.developerCases.read()

        return reply.send(developer)
    }

    async update(request: CustomFastifyDeveloperRequest, reply: FastifyReply) {
        const { id, name, username, password } = request.body
        const { token } = request.developer

        const developer = await this.developerCases.update({
            id, name, username, password, token
        })

        return reply.send(developer)
    }

    async delete(request: CustomFastifyDeveloperRequest, reply: FastifyReply) {
        const id = parseInt(request.params.id)

        const developer = await this.developerCases.delete(id)

        return reply.send(developer)
    }
}