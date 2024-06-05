import { DeveloperController } from "src/controllers/developer/developer-controller";
import { DeveloperRepository } from "src/repositories/developer/prisma/developer-repository";
import { DeveloperCases } from "src/use-cases/developer/developer-cases";

export const developerFactory = (): DeveloperController => {
    const developerRepository = new DeveloperRepository()
    const developerCases = new DeveloperCases(developerRepository)
    const developerController = new DeveloperController(developerCases)

    return developerController
}