import { FastifyReply, FastifyRequest } from "fastify"

export interface ICustomBodyType {
    id: number
    name: string
    username: string
    password: string
}

export interface ICustomRouteParams {
    id: string
}

export interface CustomFastifyDeveloperRequest extends FastifyRequest {
    developer: {
        id: number
        name: string
        password: string
        token: string
    }
    body: ICustomBodyType
    params: ICustomRouteParams
}

export interface IDeveloperController {
    create: (request: CustomFastifyDeveloperRequest, reply: FastifyReply) => object
    read: (reply: FastifyReply) => object
    update: (request: CustomFastifyDeveloperRequest, reply: FastifyReply) => object
    delete: (request: CustomFastifyDeveloperRequest, reply: FastifyReply) => object
}
