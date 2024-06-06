import { FastifyReply, FastifyRequest } from "fastify"

export interface ICustomBodyType {
    id: number
    name: string
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
        createdAt?: Date
        updatedAt?: Date
        name: string
        token: string
        clients?: Array<{
            id: number
            name: string
            imagem: {
                base64: string
                url: string
            }
            categoryId: number
            developerId: number
        }>
    }
    body: ICustomBodyType
    params: ICustomRouteParams
}

export interface IClientController {
    create: (request: CustomFastifyClientRequest, reply: FastifyReply) => object
    read: (reply: FastifyReply) => object
    update: (request: CustomFastifyClientRequest, reply: FastifyReply) => object
    delete: (request: CustomFastifyClientRequest, reply: FastifyReply) => object
}
