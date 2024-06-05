import { Developer } from "src/entities/developer";
import { ICreate, IUpdate, IDeveloperCases } from "./interface-developer-cases";
import { IDeveloperRepository } from "src/repositories/developer/interface-developer-repository";

export class DeveloperCases implements IDeveloperCases {
    constructor(private readonly DeveloperRepository: IDeveloperRepository
    ) { }

    async create({ name }: ICreate): Promise<Developer> {
        const developer = new Developer({ name })

        const developerResponse = await this.DeveloperRepository.create(developer)

        return developerResponse
    }

    async read(): Promise<Developer[]> {
        const developerResponse = await this.DeveloperRepository.read()

        return developerResponse
    }

    async update({ name, token }: IUpdate): Promise<Developer> {
        const developer = new Developer({ name, token })

        const developerResponse = await this.DeveloperRepository.update(developer)

        return developerResponse
    }

    async delete(id: number): Promise<string> {
        const developerResponse = await this.DeveloperRepository.delete(id)

        return developerResponse
    }
}