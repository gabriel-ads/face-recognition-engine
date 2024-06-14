import { PatrianiRepository } from "src/repositories/patriani/external/patriani-repository";
import { PatrianiCases } from "src/use-cases/patriani/patriani-cases";

export const patrianiFactory = (): PatrianiCases => {
    const patrianiRepository = new PatrianiRepository()
    const patrianiCases = new PatrianiCases(patrianiRepository)

    return patrianiCases
}