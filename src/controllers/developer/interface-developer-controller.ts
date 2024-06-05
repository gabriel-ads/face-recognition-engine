import { FastifyReply, FastifyRequest } from "fastify"

export interface ICustomBodyType {
    id: number
    name: string
    token: string
}

export interface ICustomFastifyReply extends FastifyReply {
    token: string
}

export interface ICustomRouteParams {
    id: string
}

export interface IDeveloperController {
    create: (request: FastifyRequest<{ Body: ICustomBodyType }>, reply: ICustomFastifyReply) => object
    read: (reply: ICustomFastifyReply) => object
    update: (request: FastifyRequest<{ Body: ICustomBodyType }>, reply: ICustomFastifyReply) => object
    delete: (request: FastifyRequest<{ Body: ICustomBodyType, Params: ICustomRouteParams }>, reply: ICustomFastifyReply) => object
}
