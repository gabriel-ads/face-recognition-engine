import fastify from 'fastify'
import 'dotenv/config'

const server = fastify()

server.get('/ping', async (request, reply) => {

  reply.status(201).send('salve nico belic')
})

let port = process.env.PORT ?? 3000;

if (typeof port === 'string') {
  port = parseInt(port);
}

server.listen({ port })


