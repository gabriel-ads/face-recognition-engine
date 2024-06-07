import { FastifyReply, FastifyRequest } from "fastify"

export interface ICustomBodyType {
    id: number
    name: string
    clientUserId: number
    image: {
        base64: string
        url: string
    }
    categoryId: number
}

export interface ICustomRouteParams {
    id: string
}

export interface CustomFastifyClientRequest extends FastifyRequest {
    developer: {
        id: number
        name: string
        password: string
        token: string
    }
    body: ICustomBodyType
    params: ICustomRouteParams
}

export interface IClientController {
    create: (request: CustomFastifyClientRequest, reply: FastifyReply) => object
    read: (request: CustomFastifyClientRequest, reply: FastifyReply) => object
    update: (request: CustomFastifyClientRequest, reply: FastifyReply) => object
    delete: (request: CustomFastifyClientRequest, reply: FastifyReply) => object
}
