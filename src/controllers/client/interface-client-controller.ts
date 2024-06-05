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

export interface ICustomFastifyReply extends FastifyReply {
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
}

export interface ICustomRouteParams {
    id: string
}

export interface IClientController {
    create: (request: FastifyRequest<{ Body: ICustomBodyType }>, reply: ICustomFastifyReply) => object
    read: (reply: ICustomFastifyReply) => object
    update: (request: FastifyRequest<{ Body: ICustomBodyType }>, reply: ICustomFastifyReply) => object
    delete: (request: FastifyRequest<{ Body: ICustomBodyType, Params: ICustomRouteParams }>, reply: ICustomFastifyReply) => object
}
