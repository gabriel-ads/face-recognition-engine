import { FastifyRequest } from 'fastify';
import { ICustomBodyType, ICustomFastifyReply, ICustomRouteParams } from 'src/controllers/client/interface-client-controller';
import { clientFactory } from 'src/factories/client/client-factory';

type RouteHandler = (request: FastifyRequest<{ Body: ICustomBodyType, Params: ICustomRouteParams }>, reply: ICustomFastifyReply) => Promise<void>;


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
    fastify.post('/create', createClients)
    fastify.get('/', readClients);
    fastify.update('/update', updateClients)
    fastify.update('/delete/:id', deleteClients)

    done();
}