import { User } from "src/entities/user";
import { ICreate, IUserCases } from "./interface-user-cases";

export class UserCases implements IUserCases {
    constructor(private readonly userRepository: IUserRepository
    ) { }

    async create({ id, name, imagem, categoryId }: ICreate): Promise<string> {
        const user = new User({ id, name, imagem, categoryId })

        const userResponse = await this.userRepository.create(user)

        return userResponse
    }
}