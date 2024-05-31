import fastify from 'fastify'

const server = fastify()

server.get('/ping', async (request, reply) => {

  reply.status(201).send('salve nico belic')
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})