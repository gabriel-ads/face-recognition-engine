import { Developer } from "src/entities/developer";
import { ICreate, IUpdate, IDeveloperCases, ICheckExistence } from "./interface-developer-cases";
import { IDeveloperRepository } from "src/repositories/developer/interface-developer-repository";

export class DeveloperCases implements IDeveloperCases {
    constructor(private readonly DeveloperRepository: IDeveloperRepository
    ) { }

    async checkExistence({ id, username }: ICheckExistence) {
        const checkResponse = await this.DeveloperRepository.checkExistence({ id, username })

        return checkResponse
    }

    async create({ name, username, password }: ICreate): Promise<Developer> {
        const developer = new Developer({ name, username, password })

        const developerResponse = await this.DeveloperRepository.create(developer)

        return developerResponse
    }

    async read(): Promise<Developer[]> {
        const developerResponse = await this.DeveloperRepository.read()

        return developerResponse
    }

    async update({ id, name, username, password, token }: IUpdate): Promise<Developer> {
        const developer = new Developer({ id, name, username, password, token })

        const developerResponse = await this.DeveloperRepository.update(developer)

        return developerResponse
    }

    async delete(id: number): Promise<string> {
        const developerResponse = await this.DeveloperRepository.delete(id)

        return developerResponse
    }
}