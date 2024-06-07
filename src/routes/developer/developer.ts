import { FastifyReply } from 'fastify';
import { CustomFastifyDeveloperRequest } from 'src/controllers/developer/interface-developer-controller';
import { developerFactory } from 'src/factories/developer/developer-factory';
import { auth } from 'src/middleware/auth';

type RouteHandler = (request: CustomFastifyDeveloperRequest, reply: FastifyReply) => Promise<void>;


const createDevelopers: RouteHandler = async (request, reply) => {
    await developerFactory().create(request, reply)
}

const readDevelopers: RouteHandler = async (_, reply) => {
    await developerFactory().read(reply)
}

const updateDevelopers: RouteHandler = async (request, reply) => {
    await developerFactory().update(request, reply)
}

const deleteDevelopers: RouteHandler = async (request, reply) => {
    await developerFactory().delete(request, reply)
}


export default function registerDeveloperRoutes(fastify: any, options: any, done: any) {
    fastify.post('/create', createDevelopers)
    fastify.get('/', { preHandler: auth }, readDevelopers);
    fastify.put('/update/:id', { preHandler: auth }, updateDevelopers)
    fastify.delete('/delete/:id', { preHandler: auth }, deleteDevelopers)

    done();
}