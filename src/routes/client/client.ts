import { FastifyReply } from 'fastify';
import { CustomFastifyClientRequest } from 'src/controllers/client/interface-client-controller';
import { clientFactory } from 'src/factories/client/client-factory';
import { auth } from 'src/middleware/auth';

type RouteHandler = (request: CustomFastifyClientRequest, reply: FastifyReply) => Promise<void>;


const createClients: RouteHandler = async (request, reply) => {
    await clientFactory().create(request, reply)
}

const readClients: RouteHandler = async (_, reply) => {
    await clientFactory().read(reply)
}

const updateClients: RouteHandler = async (request, reply) => {
    await clientFactory().update(request, reply)
}

const deleteClients: RouteHandler = async (request, reply) => {
    await clientFactory().delete(request, reply)
}


export default function registerClientRoutes(fastify: any, options: any, done: any) {
    fastify.post('/create', auth, createClients)
    fastify.get('/', auth, readClients);
    fastify.update('/update', auth, updateClients)
    fastify.update('/delete/:id', auth, deleteClients)

    done();
}