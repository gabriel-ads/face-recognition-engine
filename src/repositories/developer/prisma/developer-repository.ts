import { Developer } from "src/entities/developer";
import { IDeveloperRepository } from "../interface-developer-repository";
import { prisma } from "src/database";
import { ICheckExistence, ICreate, IUpdate } from "src/use-cases/developer/interface-developer-cases";

export class DeveloperRepository implements IDeveloperRepository {

    async checkExistence({ id, username }: ICheckExistence) {
        try {
            const developer = await prisma.developers.findFirst({
                where: {
                    username,
                    OR: [
                        { id },
                    ]
                }
            })
            if (developer) {
                return developer as Developer
            }
            else {
                return false
            }
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async create({ name, username, password, token }: ICreate): Promise<Developer> {
        try {
            const developer = await prisma.developers.create({ data: { name, username, password, token } })

            return developer as Developer
        }
        catch (error) {
            throw new Error(error as string)
        }
    }

    async read(): Promise<Developer[]> {
        try {
            const developer = await prisma.developers.findMany()

            return developer as Developer[]
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async update({ id, name, username, password, token }: IUpdate): Promise<Developer> {
        try {
            const developer = await prisma.developers.update({
                where: { id },
                data: {
                    name, username, password, token
                }
            })

            return developer as Developer
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async delete(id: number): Promise<string> {
        try {
            await prisma.developers.delete({
                where: { id }
            })

            return `Usuário deletado com sucesso`
        } catch (error) {
            throw new Error(error as string)
        }
    }
}