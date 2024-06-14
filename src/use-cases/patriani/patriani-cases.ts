import { Patriani } from "src/entities/patriani"
import { IPatrianiCases, INotify } from "./interface-patriani-cases";
import { IPatrianiRepository } from "src/repositories/patriani/interface-patriani-repository";

export class PatrianiCases implements IPatrianiCases {
    constructor(private readonly patrianiRepository: IPatrianiRepository) { }

    async notify({ id, name, date, message }: INotify) {
        const patriani = new Patriani({ id, name, date, message })

        const patrianiResponse = await this.patrianiRepository.notify(patriani)

        return patrianiResponse
    }
}