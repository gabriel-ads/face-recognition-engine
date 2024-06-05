import { ClientController } from "src/controllers/client/client-controller";
import { ClientRepository } from "src/repositories/client/prisma/client-repository";
import { ClientCases } from "src/use-cases/client/client-cases";

export const clientFactory = (): ClientController => {
    const clientRepository = new ClientRepository()
    const clientCases = new ClientCases(clientRepository)
    const clientController = new ClientController(clientCases)

    return clientController
}