import { HertaResponse, ICreate, IUpdate } from "src/use-cases/herta/interface-herta-cases"

export interface IHertaRepository {
    create: (herta: ICreate) => Promise<HertaResponse>
    update: (herta: IUpdate) => Promise<HertaResponse>
    delete: (id: number) => Promise<HertaResponse>
}