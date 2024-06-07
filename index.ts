import fastify from 'fastify'
import 'dotenv/config'
import registerClientRoutes from 'src/routes/client/client'
import registerDeveloperRoutes from 'src/routes/developer/developer'

const server = fastify()

server.register(registerClientRoutes, { prefix: '/client' })
server.register(registerDeveloperRoutes, { prefix: '/developer' })

let port = process.env.PORT ?? 3000;

if (typeof port === 'string') {
  port = parseInt(port);
}

server.listen({ port })


