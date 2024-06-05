import { FastifyRequest } from 'fastify';
import { ICustomBodyType, ICustomFastifyReply, ICustomRouteParams } from 'src/controllers/developer/interface-developer-controller';
import { developerFactory } from 'src/factories/developer/developer-factory';

type RouteHandler = (request: FastifyRequest<{ Body: ICustomBodyType, Params: ICustomRouteParams }>, reply: ICustomFastifyReply) => Promise<void>;


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
    fastify.get('/', readDevelopers);
    fastify.update('/update', updateDevelopers)
    fastify.update('/delete/:id', deleteDevelopers)

    done();
}