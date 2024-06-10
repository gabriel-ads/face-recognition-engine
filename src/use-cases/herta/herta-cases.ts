import { Herta } from "src/entities/herta";
import { ICreate, IUpdate, IHertaCases, HertaResponse } from "./interface-herta-cases";
import { IHertaRepository } from "src/repositories/herta/interface-herta-repository";

export class HertaCases implements IHertaCases {
    constructor(private readonly hertaRepository: IHertaRepository) { }

    async create({ name, clientUserId, image, categoryId }: ICreate): Promise<HertaResponse> {
        const herta = new Herta({ name, clientUserId, image, categoryId })

        const hertaResponse = await this.hertaRepository.create(herta)

        return hertaResponse
    }

    async update({ clientUserId, name, image, categoryId }: IUpdate): Promise<HertaResponse> {
        const herta = new Herta({ clientUserId, name, image, categoryId })

        const hertaResponse = await this.hertaRepository.update(herta)

        return hertaResponse
    }

    async delete(clientUserId: number): Promise<string> {
        const hertaResponse = await this.hertaRepository.delete(clientUserId)

        return hertaResponse
    }
}