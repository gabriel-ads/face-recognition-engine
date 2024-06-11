import { HertaRepository } from "src/repositories/herta/external/herta-repository";
import { HertaCases } from "src/use-cases/herta/herta-cases";

export const hertaFactory = (): HertaCases => {
    const hertaRepository = new HertaRepository()
    const hertaCases = new HertaCases(hertaRepository)

    return hertaCases
}