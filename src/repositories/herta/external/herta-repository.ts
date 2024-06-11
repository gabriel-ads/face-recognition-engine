import { IHertaRepository } from "../interface-herta-repository";
import { HertaResponse, ICreate, IUpdate } from "src/use-cases/herta/interface-herta-cases";
import 'dotenv/config'

import axios from "axios";
import { getCategoryValue } from "src/utils/categoryMaping";

export class HertaRepository implements IHertaRepository {

    async create({ name, clientUserId, image, categoryId }: ICreate): Promise<HertaResponse> {
        try {
            const hertaResponse = await axios({
                method: 'post',
                url: `${process.env.HERTA_URL}/insert/`,
                data: {
                    user_id: clientUserId,
                    user_fname: name,
                    user_group: getCategoryValue(categoryId),
                    subject_photo: image?.base64
                }
            });

            return hertaResponse.data as HertaResponse
        } catch (error) {
            console.log(error)
            throw new Error(error as string)
        }
    }

    async update({ clientUserId, name, image, categoryId }: IUpdate): Promise<HertaResponse> {
        try {
            const hertaResponse = await axios({
                method: 'put',
                url: `${process.env.HERTA_URL}/write/`,
                data: {
                    user_id: clientUserId,
                    user_fname: name,
                    user_group: getCategoryValue(categoryId),
                    subject_photo: image?.base64
                }
            });

            return hertaResponse.data as HertaResponse
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async delete(clientUserId: number): Promise<HertaResponse> {
        try {
            const hertaResponse = await axios({
                method: 'delete',
                url: `${process.env.HERTA_URL}/delete/`,
                data: {
                    user_id: clientUserId,
                }
            });

            return hertaResponse.data as HertaResponse
        } catch (error) {
            console.log(error)
            throw new Error(error as string)
        }
    }
}