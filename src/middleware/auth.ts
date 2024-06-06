import { FastifyReply, FastifyRequest } from "fastify"
import jwt from "jsonwebtoken"

interface Developer {
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


interface CustomFastifyRequest extends FastifyRequest {
    developer: Developer
}

interface JwtPayload extends jwt.JwtPayload {
    developer: Developer
}

export const auth = async (request: CustomFastifyRequest, reply: FastifyReply, next: () => void) => {
    const token = request.headers.authorization

    if (token) {
        try {
            const { developer } = jwt.verify(token, (process.env.SECRET_KEY as string)) as JwtPayload
            request.developer = developer
            next()
        } catch (error) {
            console.log(error)
            return reply.status(400).send('Invalid Token.')
        }
    }
}