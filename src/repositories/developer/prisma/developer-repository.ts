import { Developer } from "src/entities/developer";
import { IDeveloperRepository } from "../interface-developer-repository";
import { prisma } from "src/database";
import { ICreate, IUpdate } from "src/use-cases/developer/interface-developer-cases";

export class DeveloperRepository implements IDeveloperRepository {

    async checkExistence(username: string) {
        try {
            const developer = await prisma.developer.findFirst({
                where: {
                    username
                }
            })
            if (developer) {
                return true
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
            const developer = await prisma.developer.create({ data: { name, username, password, token } })

            return developer as Developer
        }
        catch (error) {
            throw new Error(error as string)
        }
    }

    async read(): Promise<Developer[]> {
        try {
            const developer = await prisma.developer.findMany()

            return developer as Developer[]
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async update({ id, name, username, password, token }: IUpdate): Promise<Developer> {
        try {
            const developer = await prisma.developer.update({
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
            await prisma.developer.delete({
                where: { id }
            })

            return `Usuário deletado com sucesso.`
        } catch (error) {
            throw new Error(error as string)
        }
    }
}