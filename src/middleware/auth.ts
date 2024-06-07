import { FastifyReply, FastifyRequest } from "fastify"
import { prisma } from "src/database";
import jwt from "jsonwebtoken"

interface Developer {
    id: number
    createdAt?: Date
    updatedAt?: Date
    name: string
    token: string
}

export interface ICustomRouteParams {
    id: string
}

interface CustomFastifyRequest extends FastifyRequest {
    developer: Developer
    params: ICustomRouteParams
}

interface JwtPayload extends jwt.JwtPayload {
    developer: Developer
}

export const auth = async (request: CustomFastifyRequest, reply: FastifyReply, next: () => void) => {
    const token = request.headers.authorization
    const paramId = parseInt(request.params.id)

    if (token) {
        try {
            const developerReponse = await prisma.developer.findFirst({
                where: {
                    token,
                },
            });

            if (developerReponse) {
                try {
                    const { developer } = jwt.verify(token, (process.env.SECRET_KEY as string)) as JwtPayload
                    const { id: tokenId } = developer

                    if (!paramId || tokenId === paramId) {
                        developer.token = token
                        request.developer = developer
                        next()
                    } else {
                        return reply.status(401).send('Access Denied.')
                    }

                } catch (error) {
                    console.log(error)
                    return reply.status(400).send('Invalid Token.')
                }
            } else {
                return reply.status(401).send('Access Denied. Invalid token provided.')
            }
        } catch (error) {
            console.log(error)
            return reply.status(400).send(error)
        }
    }
    else {
        return reply.status(401).send('Access Denied. No token provided.')
    }
}